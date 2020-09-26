require('dotenv').config();
const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github');

const context = github.context;
const repo = context.payload.repository;
const owner = repo.owner;

const gh = github.getOctokit(core.getInput('GITHUB_TOKEN', { required: true }));
const args = { owner: owner.name || owner.login, repo: repo.name };

const checkDB = async () => {
    const dir = path.join(__dirname, '..', '..', '..', 'public', 'directory');
    const files = fs.readdirSync(dir);

    for (let i = 0; i < files.length; i++) {

        const file = files[i];
        if (file.endsWith('.json')) {
            let data;
            try {
                data = require(path.join(dir, file));
            } catch (e) {
                core.setFailed(`${file} is not a valid json file.`);
            }

            if (!(data.name && data.bio && data.githubId)) {
                core.setFailed(`${file} does not follow the scheme.`);
            }

            if (!data.githubId === file.replace('.json', '')) {
                core.setFailed(`${file} does not has vaild githubId.`);
            }

            if (data.bio === 'Something about yourself using not more than 128 characters.') {
                core.setFailed(`${file} does not has vaild bio.`);
            }

            if (data.bio.length > 256) {
                core.setFailed(`${file}, bio is longer than 256 chars.`);
            }
        }
    }
};

const getCommits = async () => {
    const url = context.payload.pull_request.commits_url;
    commits = await gh.paginate(`GET ${url}`, args);
    return commits;
}

const fetchCommitData = async (commit) => {
    args.ref = commit.id || commit.sha;
    return gh.repos.getCommit(args);
}

const getFileNames = async (result) => {
    if (!result || !result.data) {
        return;
    }

    const files = [];
    result.data.files.forEach(file => {
        console.log(file);
        files.push(file);
    });

    return files;
}

const checkPR = async () => {
    try {
        let commits = await getCommits();
        let commit = commits[0];

        let authorId = commit.author.login;

        let results = await fetchCommitData(commit);
        let files = await getFileNames(results);
        let file = files[0];
        let filename = file.filename.split('/')[2];
        filename = filename.split('.')[0];

        console.log({ filename, authorId });

        if (filename.toLowerCase() !== authorId.toLowerCase()) {
            core.setFailed(`${filename} does not match with author id ${authorId}.`);
        }
    } catch (e) {
        core.setFailed(`Failed to validate ${filename}, \n ${e.message}.`);
    }
}

checkPR();
checkDB();
