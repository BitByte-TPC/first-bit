require('dotenv').config();
const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github');
const dir = path.join(__dirname, '..', '..', '..', 'public', 'directory');
const files = fs.readdirSync(dir);

const gh = github.getOctokit(core.getInput('GITHUB_TOKEN', { required: true }));
const nameDb = [];

const build = async () => {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log({ i, file });

        if (file.endsWith('.json')) {
            const data = require(path.join(dir, file));
            
            await gh.users.getByUsername({username: data.githubId}).then(prof => {
                data.avatar_url = prof.avatar_url;
                nameDb.push(data);
            }).catch(console.log);
        }
    }
};

build().then(() => {
    fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'public', 'nameDB.json'), JSON.stringify(nameDb));
}).catch(e => {
    core.setFailed(`Failed to compile a DB, \n${e.message} `);
})
