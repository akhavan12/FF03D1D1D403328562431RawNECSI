#!/bin/bash
# Simple publisher: copy edu-site/ -> docs/ for GitHub Pages
set -e
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

if [ ! -d "edu-site" ]; then
  echo "edu-site/ not found in $ROOT_DIR"
  exit 1
fi

# Remove old docs and copy
rm -rf docs
mkdir -p docs
# copy preserving permissions and including hidden files
cp -a edu-site/. docs/

# Ensure .nojekyll so GitHub Pages serves files starting with _ and other files
touch docs/.nojekyll

# Add a short README inside docs
cat > docs/README.md <<'EOF'
This folder contains the static site copied from `edu-site/` and is intended to be used as the GitHub Pages source (branch: main, folder: /docs).

To publish: commit and push `docs/` to the repository, then enable Pages in repository settings (use `docs/` folder as source).
EOF

echo "Copied edu-site/ -> docs/ and created docs/.nojekyll"
ls -la docs | sed -n '1,200p'
