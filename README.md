![Daedal Logo](https://raw.githubusercontent.com/Niten001/DaedalSmartShower/master/img/daedal_combined_logo_purple.png)

Daedal has been tasked with the development of the user interface for the
smart shower system designed by Enware, for the completion of ECTE350 at the University of Wollongong.
To complete this task we will be using a Raspberry Pi Zero W to host a web server and database as
well as controlling all aspects of the system. The Raspberry Pi will run a combination of Node.js, MySQL
and custom written interface code to achieve this task.

Located in this repository is the software aspects of this project including all source code, full 
documentation on the contents of this repository and instructions on how to setup a development 
environment as well as implement the software on the Raspberry Pi.

The software for the web interface of our smart shower is designed to be easily
used by anyone wishing to control the shower whilst ensuring the safety and privacy
of our users. Our software solutions include native compatibility with all aspects of
our hardware solutions, long term storage and analysis of showering data for many
users using the smart shower system. Additionally our software solution will provide
secure administrative control over both users and devices to ensure safe and easy
operation for users of all age levels.

## Setting up a Development Environment

To set up the development environment for this project you must first create a GitHub account, you can do this by 
following the link [here](https://github.com/join).

Next you must make sure several programs are installed on your computer, these programs include:
- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/)
- [Visual Studio](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=16) (optional)

Once you have these programs installed you can download and modify the GitHub repository. There are two methods for doing this
depending on whether you are using the command line or Visual Studio to control git.

#### Visual Studio (Recommended)

To connect to GitHub natively on Visual Studio you have to download the GitHub extension for Visual Studio from either the extensions tab or from [here](https://visualstudio.github.com/).

Once you have this extension installed you must create a folder where you wish to store the project, then open Visual Studio in this folder.

Then you go to the *team explorer* tab and under connect sign in to GitHub.

Once you are signed in you should be able to add a repository to your project by clicking *clone* and copying and pasting the following link into the search bar.
```
https://github.com/Niten001/DaedalSmartShower.git
```
You should now have a copy of the master branch of this repository stored locally on your machine for you to edit and run as required.

#### Command Line/Terminal

To connect to GitHub via the command line you must run a few commands on the command line/terminal. First you must ensure git is added to your environment variables, the process for doing this can be found [here](https://docs.alfresco.com/4.2/tasks/fot-addpath.html).

Then you must create a folder where you wish to store the project and then open this folder in the command line/terminal. Once there run the following commands, to add your GitHub username and email to git.
```
git config --global user.name "Username"
git config --global user.email "email@example.com"
```
Then you can clone the repository to your project folder by running the following command.
```
git clone https://github.com/Niten001/DaedalSmartShower.git
```
You should now have a copy of the master branch of this repository stored locally on your machine for you to edit and run as required.

## Running the project

To run the project on your local machine once you have downloaded a copy of the latest master branch all you have to do is open a command line/terminal window in the folder containing the code for the master branch (Visual Studio has this built into the *Package Manager Console*). From here all you need to do is run the following line of code, to execute the project.
```
node ./index.js
```
The output from this project can be viewed in any browser windows, by going to the following url.
```
localhost:8080
```

## Workflow for editing/adding code to this repository

## Guidelines for writing code for this repository

## Resources for learning how to program this project

## Authors

## Acknowledgments