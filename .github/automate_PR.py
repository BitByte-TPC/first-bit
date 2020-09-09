from check_PR import status
from github import Github

PR = os.environ[PULL_NUMBER]
ACCESS_TOKEN = os.environ[ACCESS_TOKEN]
REPO = "BitByte-TPC/first-bit"

g = Github(ACCESS_TOKEN)
repo = g.get_repo(REPO)
pr = repo.get_pull(PR)
pr.delete_labels()

success_labels = ['validated']
failure_labels = ['blocked', 'help wanted']

COMMIT = "Add " + pr.user.login + " to the directory."

# Add reviewers
REVIEWERS = ['avats-dev']

print("Adding labels and automating PRs....")

if status and pr.mergeable:
    pr.set_labels(*success_labels)
    pr.create_issue_comment("@" + pr.user.login +
                            " Successfully passed all the tests, Congrats!!")

    pr.merge(commit_title=COMMIT,
             merge_method="merge")

else:
    pr.set_labels(*failure_labels)
    pr.create_issue_comment("@" + pr.user.login +
                            " your PR couldn't be merged, check your PR again."
                            " @BitByte/mentors are requested to help you.")

    pr.create_review_request(reviewers=REVIEWERS)

print("Succesfully completed automation tasks!!")
