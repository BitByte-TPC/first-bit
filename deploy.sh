#!/usr/bin/env sh

# abort on errors
set -e

yarn run build

cd dist

git init
git add -A
git commit -m 'deploy'
git remote add deploy https://github.com/$1/first-bit.git
git push -f deploy master:gh-pages

cd -
