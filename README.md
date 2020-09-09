[![Open Source Love](https://firstcontributions.github.io/open-source-badges/badges/open-source-v1/open-source.svg)](https://github.com/firstcontributions/open-source-badges)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


# first-bit

It's hard. It's always hard the first time you do something. Especially when you are collaborating, making mistakes isn't a comfortable thing. We at [BitByte - The Programming Club](https://github.com/BitByte-TPC) wanted to simplify the way new open-source contributors learn & contribute for the first time.

Reading articles & watching tutorials can help, but what's better than actually doing the stuff in a practice environment? So, to provide guidance and simplify the way beginners make their first contribution, we've created this amazing project.

If you are a beginner and wants to get your hands dirty with Open Source contributions, you've hopped on to the right place. This project is made just for you.

## About first-bit

This project is created and maintained by [BitByte - The Programming Club](https://github.com/BitByte-TPC) to help young developers of [IIITDMJ](https://iiitdmj.ac.in) kickstart their journey to the world of Open Source. This is a very basic project where you can easily make your first contribution and learn the complete workflow of using Git and Github along the way.

So, let's start with the first and the most basic step, installing **Git**.

## Install Git

If you don't have git on your machine, [install it]( https://help.github.com/articles/set-up-git/).

## Configure Git

.........

## Fork this repository

<img align="right" width="300" src="assets/fork.png" alt="fork this repository" />

Fork this repository by clicking on the fork button on the top of this page.
This will create a copy of this repository in your account.

## Clone the repository

<img align="right" width="300" src="assets/clone.png" alt="clone this repository" />

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the clone button and then click the *copy to clipboard* icon.

Open a terminal and run the following git command:

```
git clone "url you just copied"
```
where "url you just copied" (without the quotation marks) is the url to this repository (your fork of this project). See the previous steps to obtain the url.

<img align="right" width="300" src="assets/copy-to-clipboard.png" alt="copy URL to clipboard" />

For example:
```
git clone https://github.com/this-is-you/first-bit.git
```
where `this-is-you` is your GitHub username. Here you're copying the contents of the first-bit repository on GitHub to your computer.

## Create a branch

Change to the repository directory on your computer (if you are not already there):

```
cd first-bit
```
Now create a branch using the `git checkout` command:
```
git checkout -b <add-your-new-branch-name>
```

For example:
```
git checkout -b add-alonzo-church
```
(The name of the branch does not need to have the word *add* in it, but it's a reasonable thing to include because the purpose of this branch is to add your name to a list.)

## Make necessary changes

### Using Terminal

Change to `public/directory` directory/folder inside your repository where you need to add a new file.

```
cd public/directory
```

Create a new file in your current directory (`first-bit/public/directory`) with name `this-is-you.json` where `this-is-you` is your GitHub username.

#### For Windows Users

* On cmd, type `notepad this-is-you.json` which will search for a file with name `this-is-you.json` in your current directory.
* If a file with the same name exists in your current directory (which will not be the case unless you create one), it will be opened using notepad.
* If not (which is our case :wink:), Windows will display a prompt saying `Do you want to create a new file?`.
* On clicking `Yes`, a file with name `this-is-you.json` will be created in your current directory and opened using notepad.
* Now copy the follwing text and paste it in your newly created file:
  ```
    {
        "githubId": "this-is-you",
        "name": "your-name",
        "bio": "Something about yourself using not more than 64 characters." 
    }
  ```
  replacing `this-is-you` with your GitHub ID, `your-name` with your Full Name and updating the text in bio.

  **For example:**
  ```
    {
        "githubId": "sdhiman99",
        "name": "Shivansh Dhiman",
        "bio": "Searching new horizons.."
    }
  ```
* Save the file pressing `Ctrl + s` and close the notepad.

#### For Linux Users

- Copy the template

  ```bash
  cp public/directory/name.json.example public/directory/<yout-github-id>.json
  ```

  Replace `<your-github-id>` with your original id.

- Open  `public/directory/<yout-github-id>.json` and fill it.

  ```bash
  gedit public/directory/<yout-github-id>.json
  ```
- Save file `ctrl+s` and close the editor. 

## Commit those changes

If you go to the project directory and execute the command `git status`, you'll see there are changes.

<img align="right" width="450" src="assets/git-status.png" alt="git status" />

Add those changes to the branch you just created using the `git add` command:

```
git add public/directory/<yout-github-id>.json
```

Now commit those changes using the `git commit` command:
```
git commit -m "Add <your-github-id> to Contributors list"
```

## Push changes to GitHub

Push your changes using the command `git push`:
```
git push origin <add-your-branch-name>
```
replacing `<add-your-branch-name>` with the name of the branch you created earlier.

## Submit your changes for review

If you go to your repository on GitHub, you'll see a  `Compare & pull request` button. Click on that button.

<img style="float: right;" src="assets/compare-and-pull.png" alt="create a pull request" />

Now submit the pull request.

<img style="float: right;" src="assets/submit-pull-request.png" alt="submit pull request" />

Soon I'll be merging all your changes into the master branch of this project. You will get a notification email once the changes have been merged.

## Where to go from here?

Congrats!  You just completed the standard _fork -> clone -> edit -> PR_ workflow that you'll encounter often as a contributor!

Celebrate your contribution and share it with your friends and followers by going to [web app](https://firstcontributions.github.io/#social-share).

You could join our slack team in case you need any help or have any questions. [Join slack team](https://join.slack.com/t/firstcontributors/shared_invite/enQtNjkxNzQwNzA2MTMwLTVhMWJjNjg2ODRlNWZhNjIzYjgwNDIyZWYwZjhjYTQ4OTBjMWM0MmFhZDUxNzBiYzczMGNiYzcxNjkzZDZlMDM).

Now let's get you started with contributing to other projects. We've compiled a list of projects with easy issues you can get started on. Check out [the list of projects in the web app](https://firstcontributions.github.io/#project-list).

