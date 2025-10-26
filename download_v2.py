from urllib.parse import urljoin, urlparse
from urllib.request import urlretrieve
import os, shutil, re, time, threading
from queue import Queue, Empty
import logging
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
import requests

def init_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    file_handler = logging.FileHandler('log.log', mode='w', encoding='UTF-8')
    file_handler.setLevel(logging.NOTSET)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    return logger

logger = init_logger()


class Manager:
    def __init__(self, home_url):
        home_dir = '{0}-site/{1}'.format(home_url.split('.')[1], home_url.split('/')[2])
        
        if os.path.exists(home_dir):
            shutil.rmtree(os.path.dirname(home_dir))
        os.makedirs(home_dir)

        parsed_url = urlparse(home_url)
        scheme = parsed_url.scheme
        top_domain = '.'.join(parsed_url.netloc.split('.')[1:])
        max_tries = 3

        self.link_queue = Queue()
        self.link_queue.put(home_url)
        self.links = set([home_url])
        self.spiders = []
        
        # Reduced to 4 threads since browsers are more resource-intensive
        for i in range(4):
            self.spiders.append(Spider(home_dir, home_url, self.link_queue, scheme, top_domain, max_tries))

    def start(self):
        for spider in self.spiders:
            spider.start()
        
        last_new_time = time.time()
        
        while True:
            for spider in self.spiders:
                new_links = spider.get_links()
                if new_links:
                    last_new_time = time.time()
                for link in new_links:
                    if not link in self.links and len(link) < 250:
                        sharp_index = link.find('#')
                        if sharp_index > 0:
                            link = link[0:sharp_index]
                        self.links.add(link)
                        self.link_queue.put(link, True)
            if time.time() - last_new_time >= 60:
                break
        
        # Cleanup
        for spider in self.spiders:
            spider.cleanup()
        
        for i in range(10):
            print('\a')
            time.sleep(0.5)


class Spider(threading.Thread):
    def __init__(self, home_dir, home_url, link_queue, scheme, top_domain, max_tries):
        threading.Thread.__init__(self)
        self.home_dir = home_dir
        self.home_url = home_url
        self.link_queue = link_queue
        self.scheme = scheme
        self.top_domain = top_domain
        self.max_tries = max_tries
        self.other_suffixes = set([
            'js', 'jpg', 'png', 'gif', 'svg', 'json', 'xml', 'ico', 'jpeg', 'ttf', 'mp3', 'mp4', 'wav',
            'doc', 'xls', 'pdf', 'docx', 'xlsx', 'eot', 'woff', 'woff2', 'csv', 'swf', 'tar', 'gz', 'zip', 'rar', 'txt',
            'exe', 'ppt', 'pptx', 'm3u8', 'avi', 'wsf', 'webp'
        ])
        self.media_suffixes = set(['mp3', 'mp4', 'pdf', 'gz', 'tar', 'zip', 'rar', 'wav', 'm3u8', 'avi'])
        self.domain_names = set(['com', 'cn', 'net', 'org', 'gov', 'io'])
        self.html_pat = re.compile(r'(href|src)=(\"|\')([^\"\']*)')
        self.css_pat = re.compile(r'url\((\"|\')([^\"\']*)')
        self.links = set()
        self.driver = None
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })

    def init_driver(self):
        """Initialize Selenium WebDriver"""
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.set_page_load_timeout(30)
        except Exception as e:
            logger.error(f'Failed to initialize Chrome driver: {e}')
            raise

    def cleanup(self):
        """Cleanup resources"""
        if self.driver:
            try:
                self.driver.quit()
            except:
                pass

    def run(self):
        logger.info('{0} start.'.format(threading.current_thread().name))
        
        try:
            self.init_driver()
        except Exception as e:
            logger.error(f'Cannot start spider without driver: {e}')
            return

        while True:
            try:
                link = self.link_queue.get(timeout=60)
                self.spide(link)
            except Empty:
                break
        
        self.cleanup()
        logger.info('{0} end.'.format(threading.current_thread().name))

    def spide(self, link):
        try:
            suffix = link.split('.')[-1].lower().split('?')[0]
            if suffix == 'css':
                self.handle_css(link)
            elif suffix in self.other_suffixes:
                self.download(link)
            else:
                self.handle_html(link)
        except Exception as e:
            logger.error('[Unknown Error]\t{0}\t{1}'.format(link, str(e)))

    def handle_html(self, link):
        html = self.get_res_selenium(link)
        if html is None:
            return
        
        html_raw_links = set([ele[2] for ele in self.html_pat.findall(html)])
        html_raw_links = html_raw_links.union([ele[1] for ele in self.css_pat.findall(html)])
        
        if html_raw_links:
            valid_links = list(filter(self.is_valid_link, html_raw_links))
            handled_links = list(map(self.handle_valid_link, valid_links))
            self.links = self.links.union([urljoin(link, t_link) for t_link in handled_links])
            html = self.replace_links(html, valid_links, self.normalize_link(link))
        
        filepath = self.make_filepath(self.normalize_link(link))
        with open(filepath, 'w', encoding='utf-8') as f_w:
            f_w.write(html)
        logger.info('Handled\t{0}'.format(link))

    def handle_css(self, link):
        text = self.get_res_requests(link)
        if text is None:
            return
        
        css_raw_links = set([ele[1] for ele in self.css_pat.findall(text)])
        if css_raw_links:
            css_raw_links = list(filter(self.is_valid_link, css_raw_links))
            self.links = self.links.union([urljoin(link, t_link) for t_link in css_raw_links])
            text = self.replace_links(text, css_raw_links, self.normalize_link(link))
        
        filepath = self.make_filepath(self.normalize_link(link))
        with open(filepath, 'w', encoding='utf-8') as f_w:
            f_w.write(text)
        logger.info('Handled\t{0}'.format(link))

    def get_res_selenium(self, link):
        """Fetch HTML using Selenium to render JavaScript"""
        num_tries = 0
        
        while num_tries < self.max_tries:
            try:
                self.driver.get(link)
                # Wait for page to load
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.TAG_NAME, "body"))
                )
                # Additional wait for dynamic content
                time.sleep(2)
                
                html = self.driver.page_source
                return html
            except TimeoutException:
                logger.error('[TimeoutException]\t{0}'.format(link))
                num_tries += 1
            except WebDriverException as e:
                logger.error('[WebDriverException]\t{0}\t{1}'.format(link, str(e)))
                num_tries += 1
            except Exception as e:
                logger.error('[Exception]\t{0}\t{1}'.format(link, str(e)))
                return None
        
        if num_tries >= self.max_tries:
            logger.warning('[failed get]\t{0}'.format(link))
        return None

    def get_res_requests(self, link):
        """Fetch non-HTML content using requests"""
        num_tries = 0
        
        while num_tries < self.max_tries:
            try:
                response = self.session.get(link, timeout=20)
                response.raise_for_status()
                return response.text
            except requests.exceptions.RequestException as e:
                logger.error('[RequestException]\t{0}\t{1}'.format(link, str(e)))
                num_tries += 1
        
        if num_tries >= self.max_tries:
            logger.warning('[failed get]\t{0}'.format(link))
        return None

    def download(self, link):
        """Download binary files"""
        timeout = 600 if link.split('.')[-1].lower() in self.media_suffixes else 20
        num_tries = 0
        
        while num_tries < self.max_tries:
            try:
                response = self.session.get(link, timeout=timeout, stream=True)
                response.raise_for_status()
                
                filepath = self.make_filepath(link)
                with open(filepath, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                logger.info('Downloaded\t{0}'.format(link))
                return
            except requests.exceptions.RequestException as e:
                logger.error('[RequestException]\t{0}\t{1}'.format(link, str(e)))
                num_tries += 1
        
        if num_tries >= self.max_tries:
            logger.warning('[failed download]\t{0}'.format(link))

    def is_valid_link(self, link):
        if link.find('javascript:') >= 0 or link.find('@') >= 0 or link.find('data:image') >= 0:
            return False
        if link.find('http') >= 0:
            netloc = urlparse(link).netloc
            if netloc:
                if netloc.find(':80') > 0:
                    netloc = netloc.replace(':80', '')
                return netloc[netloc.find('.') + 1:] == self.top_domain
        return True

    def handle_valid_link(self, link):
        if not link:
            return link
        if link[0:2] == '//':
            return self.scheme + ':' + link
        if link[0] == '/':
            return urljoin(self.home_url, link)
        if link.find('http') < 0 or link.find('http://') >= 0 or link.find('https://') >= 0:
            return link
        if link.find('http:/') >= 0 or link.find('https:/') >= 0:
            return link.replace(':/', '://')
        if link.find('http:') >= 0 or link.find('https:') >= 0:
            first_colon = link.find(':')
            link = link[0:first_colon] + '://' + link[first_colon + 1:]
            return link
        return link

    def make_filepath(self, link):
        abs_filepath = self.get_abs_filepath(link)
        dirname = os.path.dirname(abs_filepath)
        if not os.path.exists(dirname):
            try:
                os.makedirs(dirname)
            except (FileExistsError, NotADirectoryError) as e:
                logger.error('[Directory Error]\t{0}\t{1}'.format(link, abs_filepath))
        return abs_filepath

    def get_abs_filepath(self, link):
        old_link = link
        
        if link[-1] == '/':
            link += 'index.html'
        elif link.split('.')[-1] in self.domain_names:
            link += '/index.html'
        
        rel_url = os.path.relpath(link, self.home_url)
        if rel_url.find('?') >= 0:
            rel_url += '.html'
        if rel_url.split('/')[-1].find('.') < 0 or rel_url == '.':
            rel_url += 'index.html'
        
        abs_filepath = os.path.join(self.home_dir, rel_url)
        
        if abs_filepath.find('..') > 0:
            parts = abs_filepath.split('..')
            abs_filepath = '/'.join(parts[0].split('/')[0:-2]) + parts[1]
        
        if os.path.isdir(abs_filepath):
            logger.warning('[isdir]\t{0}\t{1}'.format(old_link, abs_filepath))
            abs_filepath = os.path.join(abs_filepath, 'index.html')
        
        return abs_filepath

    def replace_links(self, content, links, cur_url):
        links.sort(key=lambda link: len(link), reverse=True)
        for link in set(links):
            link_abspath = self.get_abs_filepath(urljoin(cur_url, self.normalize_link(link)))
            cur_url_abspath = self.get_abs_filepath(cur_url)
            rel_link = os.path.relpath(link_abspath, cur_url_abspath)[1:].replace('?', '%3F')
            replacement = '"{0}"'.format(rel_link)
            content = content.replace(
                '"{0}"'.format(link), replacement
            ).replace('\'{0}\''.format(link), replacement)
        return content

    def normalize_link(self, link):
        if link.find('http') < 0:
            return link
        if link.find(':80') > 0:
            link = link.replace(':80', '')
        first_colon = link.find(':')
        link = self.scheme + link[first_colon:]
        return link

    def get_links(self):
        export_links = self.links.copy()
        self.links.clear()
        return export_links


if __name__ == '__main__':
    # Replace with your target URL
    manager = Manager('https://necsi.edu')
    manager.start()