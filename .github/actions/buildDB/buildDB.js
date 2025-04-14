require("dotenv").config();
const fs = require("fs");
const path = require("path");
const core = require('@actions/core');
const github = require('@actions/github');
const dir = path.join(__dirname, "..", "..", "..", "public", "directory");
const files = fs.readdirSync(dir);

const gh = process.env.GITHUB_TOKEN;
const nameDb = [];

const build = async () => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log({ i, file });

    if (file.endsWith(".json")) {
      try {
        const data = require(path.join(dir, file));

        nameDb.push(data);

        await gh.users
          .getByUsername({ username: data.githubId })
          .then((prof) => {
            data.avatar_url = prof.data.avatar_url;
          });
          
      } catch (e) {
        console.log(e);
      }
    }
  }
};

build()
  .then(() => {
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "..", "public", "nameDB.json"),
      JSON.stringify(nameDb)
    );
  })
  .catch((e) => {
    core.setFailed(`Failed to compile a DB, \n${e.message} `);
  });
