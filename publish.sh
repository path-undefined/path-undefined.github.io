#!/usr/bin/env bash

set -e

rm -rf docs

cd data
npm run build
cd ..

cd website
npm run build
cp -r dist ../docs
cd ..

git status

if [[ $(git status --porcelain) ]]; then
  echo "Git status not clean, I'll commit everything ..."
  git add .
  git commit -m "Updated the content."
fi;

git push origin main
