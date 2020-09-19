from github import Github
import os
import requests
import json

PR = os.environ[PULL_NUMBER]
ACCESS_TOKEN = os.environ[ACCESS_TOKEN]
REPO = "BitByte-TPC/first-bit"


def check_file(filepath, user):
    temp = filepath.split('/')
    fname = user['githubId'] + ".json"
    if temp[-1] == fname:
        return True
    else:
        return False


def check_github_username(user):
    URL = "https://www.github.com/" + user['githubId']
    request = requests.get(URL)
    if request.status_code == 200:
        return True
    else:
        return False


def check_contents(user):
    username = user['name']
    userbio = user['bio']

    if len(username) >= 3:
        if len(userbio) <= 64:
            print("SUCCESS: user data is compatible.")
            return True
        else:
            print("FAILED: userbio is too long.")
            return False
    else:
        print("FAILED: username too short.")
        return False


def check_duplicates(user, db):
    for i in range(len(db)):
        ex_user = db[i]
        if ex_user['githubId'] == user['githubId']:
            return False
            break


def check_extra(usr, pr):
    if pr.user.login == user['githubId']:
        return True
    else:
        return False


g = Github(ACCESS_TOKEN)
repo = g.get_repo(REPO)

status = True

pr = repo.get_pull(PR)
if pr.get_files().totalCount == 1:
    status &= 1
    file = pr.get_files()[0]

    file_url = file.raw_url
    userdata = requests.get(file_url).json()

    print("Checking file extension and name....")
    if check_file(file.filename, userdata):
        print("SUCCESS: file is json.")
    else:
        status &= 0
        print("FAILED: file is not json.")

    print("Checking if github username is valid....")
    if check_github_username(userdata):
        print("SUCCESS: github username is valid.")
    else:
        status &= 0
        print("FAILED: github username is invalid.")

    print("Checking contents of userdata....")
    check_contents(userdata)
    status &= check_contents(userdata)

    dburl = "https://github.com/BitByte-TPC/first-bit/raw/gh-pages/nameDB.json"
    db = requests.get(dburl).json()

    print("Checking if user already exists....")
    if check_duplicates(userdata, db) is False:
        status &= 0
        print("FAILED: user already exists.")
    else:
        print("SUCCESS: welcome to the first-bit.")

    print("Checking if user mentioned right githubId....")
    if check_extra(userdata, pr):
        print("SUCCESS: userdata is valid and true.")
    else:
        status &= 0
        print("FAILED: this githubId doesn't belongs to user.")

else:
    status &= 0
    print("ERROR: Unexpected count of files, expected one.")
