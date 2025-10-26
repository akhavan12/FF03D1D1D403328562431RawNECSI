import glob
from bs4 import BeautifulSoup
import pandas as pd
import requests

def img_url_strip(url):
    return url.split("?")[0]

def read_links():


    html_files = glob.glob("./edu-site/necsi.edu/**/*.html", recursive=True)
    # print(html_files[0])
    # file_sample ="./edu-site/necsi.edu/index.html"

    for htmlfile in html_files:
        with open(htmlfile,"r") as f:
            html_content = f.read()

        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            img_sources=[]
            for img in soup.find_all('img'):
                if img:
                    # img_sources.append(img_url_strip(img["src"]))
                    img_sources.append(img["src"])
        except Exception as e:
            print(f"Error processing file {htmlfile}: {e}")
        try:
            if len(img_sources)>0:
                with open("links.txt","a") as f_links:
                    for src in img_sources:
                        f_links.write(src+"\n")
        except Exception as e:
            print(f"Error processing file {htmlfile}: {e}")

def load_links():
    df_links = pd.read_csv("links.txt",header=None,names=["img_src"])
    df_links["mix_link"]=df_links["img_src"].apply(lambda x: x.split("/")[-2]+"_"+x.split("/")[-1])
    df_links = df_links.drop_duplicates().reset_index(drop=True)
    df_links.to_csv("links.csv",index=None)

def download_assets():
    df =pd.read_csv("links.csv")
    df_links=df['img_src'].tolist()
    for idx,link in enumerate(df_links):
        try:
            response = requests.get(link)
            if response.status_code == 200:
                file_name = link.split("/")[-2]+"||"+link.split("/")[-1]
                with open(f"./assets/{img_url_strip(file_name)}", "wb") as f:
                    f.write(response.content)
                print(f"Downloaded {file_name} ({idx+1}/{len(df_links)})")
            else:
                print(f"Failed to download {link}: Status code {response.status_code}")
        except Exception as e:
            print(f"Error downloading {link}: {e}")
#read_links()
#load_links()
# download_assets()

def replace_image_links(original_file):
    
    # print(html_files[0])


    # for htmlfile in html_files:
    with open(original_file,"r") as f:
        html_content = f.read()
    # first load the html file
    soup = BeautifulSoup(html_content, 'html.parser')
    # find all imgs


    for img in soup.find_all('img'):
        # if there is an img
        if img:
            # get the last part of the url of the img
            #link.split("/")[-2]+"||"+link.split("/")[-1]
            file_name = img["src"].split("/")[-2]+"||"+img["src"].split("/")[-1]
            # create new src path
            new_src = f"./assets/{img_url_strip(file_name)}"
            img["src"] = new_src
            img["srcset"]=new_src
            img["data-src"]=new_src
            img["data-image"]=new_src


    
    with open(original_file,"w") as f_out:
        f_out.write(str(soup))


html_files = glob.glob("./edu-site/necsi.edu/**/*.html", recursive=True)

for htmlfile in html_files:
    try:
        replace_image_links(htmlfile)
    except Exception as e:
        print(f"Error processing file {htmlfile}: {e}")


    