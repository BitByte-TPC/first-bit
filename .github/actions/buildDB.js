require('dotenv').config();
const fs = require('fs');
const path = require('path');
const GitHub = require('github-api');

const dir = path.join(__dirname, '..', '..', 'public', 'directory');
const files = fs.readdirSync(dir);

const gh = new GitHub({
  token: process.env.GITHUB_TOKEN,
});

const nameDb = [];

const build = async () => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log({ i, file });

    if (file.endsWith('.json')) {
      const data = require(path.join(dir, file));

      const prof = await gh.getUser(data.githubId).getProfile();
      data.avatar_url = prof.data.avatar_url;
      nameDb.push(data);
    }
  }
};

build().then(() => {
  fs.writeFileSync(path.join(__dirname, '..', '..', 'public', 'nameDB.json'), JSON.stringify(nameDb));
});
