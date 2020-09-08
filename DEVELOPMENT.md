# Development
This is a guid to develope the project. See [README.md](README.md) if you want to add your name.

## Project setup
```bash
yarn install
yarn serve # Compiles and hot-reloads for development
yarn build # Compiles and minifies for production
yarn lint # Lints and fixes files
```

## Building the nameDB.json

For Quick setup grab a copy from [gh-pages](https://github.com/BitByte-TPC/first-bit/blob/gh-pages/nameDB.json) branch and in put it inside `public/`.

The nameDB is a big json file which contains all user added json files into one. It also fetches github avatar url from GitHuB id. You will need a GitHub oAuth token to build nameDB.json. The script fetches avatar_url from GitHuB id and without oAuth GitHub limits 60 request per hours.

1. Visit [Personal Acess Tokens](https://github.com/settings/tokens) and create one. 
2. Run `cp example.env .env`
3. Add token in .env file
4. Run `node buildDB.js` 

## Deploying site to GitHub pages
Make sure you have forked the repo.
```
sh deploy.sh <your-github-id>
```