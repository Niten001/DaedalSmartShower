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

To connect to GitHub natively on Visual Studio you have to download the GitHub extension for Visual Studio from either the extensions
tab or from [here](https://visualstudio.github.com/).

Once you have this extension installed you must create a folder where you wish to store the project, then open Visual Studio in this folder.

Then you go to the *team explorer* tab and under connect sign in to GitHub.

Once you are signed in you should be able to add a repository to your project by clicking *clone* and copying and pasting the following link
into the search bar.
```
https://github.com/Niten001/DaedalSmartShower.git
```
You should now have a copy of the master branch of this repository stored locally on your machine for you to edit and run as required.

#### Command Line/Terminal

To connect to GitHub via the command line you must run a few commands on the command line/terminal. First you must ensure git is added to your
environment variables, the process for doing this can be found [here](https://docs.alfresco.com/4.2/tasks/fot-addpath.html).

Then you must create a folder where you wish to store the project and then open this folder in the command line/terminal. Once there run the
following commands, to add your GitHub username and email to git.
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

To run the project on your local machine once you have downloaded a copy of the latest master branch all you have to do is open a command
line/terminal window in the folder containing the code for the master branch (Visual Studio has this built into the *Package Manager Console*).
From here all you need to do is run the following line of code, to execute the project.
```
node ./index.js
```
The output from this project can be viewed in any browser windows, by going to the following url.
```
localhost:8080
```

## Workflow for editing/adding code to this repository
When you wish to modify the code in this repository you must follow a simple process to minimise errors and maximise productivity. First you must
go to the *Projects* page for this repository and ensure nobody else is currently working on the specific problem you plan on addressing. If there
are no existing projects for the task you wish to complete, the next task you must complete, is to create a new project pane with the following
information and structure.
```
Relevant Title
Short description of what and why
References to related sections, resources or issues
List of outcomes to be met
Any other relevant notes
```
Once this is completed, move the pane for the tasks you are currently working on into the *In Progress* column of the projects dashboard.

Now you need to open the folder where this repository is stored locally on your computer and ensure follow a series of steps which can be completed
in both Visual Studio and the Command Line.

#### Visual Studio (Recommended)

Open the repository in Visual Studio and navigate to the *Branches* tab in the *Team Explorer*, once there ensure you have the most recent version
of the *master* branch by running a *Pull* on this branch (Right click on the *master* branch and select *Checkout*, then right click again and select
*Pull*).

Now that you have the most recent version of *master* you must create a new local branch for the particular project you are working on (Ensure you
use logical naming conventions, preferably using the same name as the title for the project pane you are currently working on; formatted using
[Pascal Case](https://en.wiktionary.org/wiki/Pascal_case)). You do this by navigating to the *Branches* tab in the *Team Explorer* and right clicking
on the master branch then selecting *New Local Branch From*. Then you can *check out* this branch and make changes to the code as necessary.

During the coding on your new branch you should periodically *commit* your changes on your branch (preferably at least once a day). To do this you can
go to the *Changes* tab in the *Team Explorer* and enter a sensible commit message (this message should briefly and concisely cover what has been
changed since the last commit). Then you can click *Commit*/*Commit All* to commit your changes to your branch.

Once you have completed coding on your branch you now have to perform a *rebase* on your code. This is done to update your branch to the latest
version of the *master* branch to prevent errors and conflicts when your branch is merged into the master branch. The first step when performing a
*rebase* operation is to *check out* the *master* branch, then *pull* the latest version of *master* in the same way as before. Now you *check out* 
your branch and select *Rebase* from the *Branches* tab in the *Team Explorer* you then *rebase* your current branch onto the *master* branch and read 
through all the conflicts ensuring you keep both your new changes and the changes on *master* (when in doubt about a conflict, always give preference 
to the *master* branch to ensure nobody else's code changes are overwritten accidentally). Now you should check that the *rebase* operation hasn't caused 
any issues/errors and you code changes still work. Now you should *commit* all the new changes on your branch.

Now that you have performed a *rebase* on your branch you are ready to push your local branch up to the GitHub repository so that you can perform a
*pull request* on your branch. (You can do this at any time to share your branch with other members of the team, however you should not complete a
*pull request* until you have completed the changes to your code and the outcomes addressed in the project pane referencing this branch). To push your
code all you need to do is go the the *Branches* tab of the *Team Explorer* and right click on the branch you wish to push to GitHub, then select push.

#### Command Line

Open the folder containing your local repository via the command line, Then you must ensure you have the most recent version of the *master* branch
by running a *Pull* on this branch using the following command.
```
git checkout master
git pull origin master
```

Now that you have the most recent version of *master* you must create a new local branch for the particular project you are working on (Ensure you
use logical naming conventions, preferably using the same name as the title for the project pane you are currently working on; formatted using
[Pascal Case](https://en.wiktionary.org/wiki/Pascal_case)), by running the following command. Then you can *check out* this branch and make changes to
the code as necessary.
```
git checkout master
git branch <branch-name>
git checkout <branch-name>
```

During the coding on your new branch you should periodically *commit* your changes on your branch (preferably at least once a day). Commits should
include a sensible commit message (this message should briefly and concisely cover what has been changed since the last commit). To do this you can
use the following commands.
```
git add <files-that-you-wish-to-commit>
git commit -m <message>
```
If no new files have been added to the repository you can instead use.
```
git commit -a -m <message>
```

Once you have completed coding on your branch you now have to perform a *rebase* on your code. This is done to update your branch to the latest
version of the *master* branch to prevent errors and conflicts when your branch is merged into the master branch. The first step when performing a
*rebase* operation is to *pull* the latest version of *master* in the same way as before. Now you *check out* your branch and enter the following code,
dealing with any merge conflicts as they appear.
```
git checkout master
git pull origin master
git checkout <branch-name>
git rebase master
```
Now you should check that the *rebase* operation hasn't caused any issues/errors and you code changes still work. Then you should *commit* all the new
changes on your branch.

Now that you have performed a *rebase* on your branch you are ready to push your local branch up to the GitHub repository so that you can perform a
*pull request* on your branch. (You can do this at any time to share your branch with other members of the team, however you should not complete a
*pull request* until you have completed the changes to your code and the outcomes addressed in the project pane referencing this branch). To push your
code all you need to do is run the following command.
```
git push https://github.com/Niten001/DaedalSmartShower.git <branch-name>
```

When you wish to complete a *pull request* on your code go to the GitHub repository and you should either be prompted to create a pull request, or you
can select *New pull request* and include the following information.
```
Title of the project pane
Link to the project pane
Short description of the changes the pull request implements
Outcomes from the project pane to be checked
Any other relevant notes
```
Once a pull request is completed somebody else must read, run and review your code to ensure it follows all the guidelines set out in this document as
well as adding comments on changes or improvements to be made on the code. Once this is complete and all changes have been fixed (by the original creator)
the new branch can be merged with the *master* branch and deleted so that the process may start again.

While your branch is under review you should document all functions and new dependencies in the wiki following the guidelines set out in the wiki. A
pull request should not me merged until the documentation is completed.

If you come across an issue while working on or using the code in this repository which is unrelated to your current project, you should add this issue
to the *Issues* tab on this GitHub repository, including all nessessary information as you would when writing a new project pane.

## Guidelines for writing code for this repository

All code written in this repository should follow the guidelines set out below to ensure that all of the code in this repository is easy to read and debug and uses 
consistent syntax formatting and naming conventions. To ensure this, when writing and reviewing code the following points should be considered.
- Variable names are logical and related to what they contain, they are formatted using [Camel Case](https://en.wikipedia.org/wiki/Camel_case)
- Function names ale logcal and related to what they contain, they are formatted using [Pascal Case](https://en.wiktionary.org/wiki/Pascal_case)
- Struct and type names are logical and related to what they contain, they are formatted as all letters lowercase with underscores
- Indentaion is logical and easy to ready, children of loops, logical statements, functions, etc. are indented from their parents
- Long lines of text are broken up over several lines where possible, try to aim for a line length of around 150 characters
- Brackets with content spanning multiple lines are placed on seperate lines to their content (the first bracket may be on the same line as the parent)
- Spacing is added whereever it is logical and makes the code easy to read
- Single line comments are in line with the first line they reference, after the code
- Multiple line comments are on a seperate line to the code they reference, on the line directly above the line they refernce, large blocks of meaningless characters
are not used to seperate multi-line comments from the rest of the code
- Comments are used whenever clarification of a line or section of code is needed and are as clear and consise as possible

## Resources for learning how to program this project
- [Git Documentation](https://git-scm.com/docs)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [W3Schools](https://www.w3schools.com/)
- [Node Package Manager](https://www.npmjs.com/)
- [Coding Train Node Tutorials](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp)
- [Coding Train Data and API Tutorials](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X)

## Authors
- Thomas Battye-Smith (5570001)
- Quang Hung Pham (5560512)
- Ilija Babic (5777446)
- Yuhao Cui (6101422)
- Lachlan Fowke (5065549)
- [@Niten001](https://github.com/Niten001) Timothy Martin (5726803)
- Amalesh Nagenthiran (4184312)

## Acknowledgments
[![University of Wollongong](https://www.uow.edu.au/content/groups/public/@web/documents/siteelement/uow171491.png)](https://www.uow.edu.au/index.html)

[![Enware Australia](https://www.enware.com.au/img/logos/EnwareLogo_NoTagLine.svg)](https://www.enware.com.au/)