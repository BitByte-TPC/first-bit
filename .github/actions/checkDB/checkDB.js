require('dotenv').config();
const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

const context = github.context;
const repo = context.payload.repository;
const owner = repo.owner;

const gh = github.getOctokit(core.getInput('GITHUB_TOKEN', { required: true }));
const args = { owner: owner.name || owner.login, repo: repo.name };

const FILES_ADDED = new Set();
const FILES_MODIFIED = new Set();
const FILES_RENAMED = new Set();
const FILES_REMOVED = new Set();

const AUTHOR = context.payload.pull_request.user.login;
let JSON_FILE;

const checkNameFile = async () => {

    let raw_url = JSON_FILE.raw_url;

    let file = fetch(raw_url).then(res => res.text());

    let data;
    try {
        data = JSON.parse(file);
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

const getCommits = async () => {
    const url = context.payload.pull_request.commits_url;
    commits = await gh.paginate(`GET ${url}`, args);
    return commits;
}

const fetchCommitData = async (commit) => {
    args.ref = commit.id || commit.sha;
    return gh.repos.getCommit(args);
}

const isAdded = (file) => {
    return 'added' === file.status;
}

const isModified = (file) => {
    return 'modified' === file.status;
}

const isRemoved = (file) => {
    return 'removed' === file.status;
}

const isRenamed = (file) => {
    return 'renamed' === file.status;
}

const processCommitData = async (result) => {

    if (!result || !result.data) {
        return;
    }

    result.data.files.forEach(file => {
        console.log(file);
        if (file.filename === `public/directory/${AUTHOR}.json`.toLowerCase()) {
            JSON_FILE = file;
            return;
        }

        if (isAdded(file)) {
            FILES_ADDED.add(file.filename);
            FILES_REMOVED.delete(file.filename);
            return;
        }

        if (isRemoved(file)) {
            if (!FILES_ADDED.has(file.filename)) {
                FILES_REMOVED.add(file.filename);
            }

            FILES_ADDED.delete(file.filename);
            FILES_MODIFIED.delete(file.filename);

            return;
        }

        if (isModified(file)) {
            FILES_MODIFIED.add(file.filename);
            return;
        }

        if (isRenamed(file)) {
            let prev_file = file.previous_filename;
            let new_file = file.filename;
            FILES.delete(prev_file) && FILES.add(new_file);
            FILES_ADDED.delete(prev_file) && FILES_ADDED.add(new_file);
            FILES_MODIFIED.delete(prev_file) && FILES_MODIFIED.add(new_file);
            FILES_RENAMED.add(new_file);
        }
    });
}

const checkFiles = async () => {
    console.log({ FILES_ADDED, FILES_MODIFIED, FILES_REMOVED, FILES_RENAMED });
    if (FILES_ADDED.length > 0 || FILES_MODIFIED.length > 0 || FILES_RENAMED.length > 0 || FILES_REMOVED.length > 0) {
        core.setFailed('PR has extra modified/added/deleted/renamed files.');
        return;
    }

    if (!JSON_FILE) {
        core.setFailed(`Could not find ${AUTHOR}.json file.`);
        return;
    }
}

const checkPR = async () => {

    getCommits().then(commits => {
        console.log({ commits });

        Promise.all(commits.map(fetchCommitData))
            .then(data => Promise.all(data.map(processCommitData)))
            .then(checkFiles)
            .then(checkNameFile)
            .catch(err => core.error(err) && (process.exitCode = 1));
    });
}

checkPR();
