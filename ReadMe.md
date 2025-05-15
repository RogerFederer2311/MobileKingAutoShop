# How to get started 

## Install Visual studio Community 2022

Instruction Download Visual studio 2022 from this site https://visualstudio.microsoft.com/downloads/

## Install MYSQLWORKBENCH 

download MYSQLWORKBENCH from this site https://dev.mysql.com/downloads/workbench/

## Install React.js for Visual Studio 2022

 The Prerequisites to install  React.js is in this site https://learn.microsoft.com/en-us/visualstudio/javascript/tutorial-create-react-app?view=vs-2022

## Create Google Maps Api Keys

Follow the instructions on this website to create Google Maps API https://developers.google.com/maps/documentation/javascript/get-api-key

Add the keys to the secrets.ts file in the client folder 

## Setup the Database 

Setup the database by copying everything from the createDB.txt file and then pasting it into MYSQLWORKBENCH query and executing it

## Run the program 

Run the mobilekingautoshop.sln file in visual studio 2022

Set the server folder as the startup project by right clicking the server folder and clicking set startup project in visual studio 2022

Run the program by clicking the play button on the top. It may take a few minutes to install the project after clicking the play button
once everything is installed you should be able to visit the site locally on https://localhost:55951/ and after that it should be fully 
functional. If you want to host the site you can host it on AWS or Google cloud.

# Hosting the site 

Hosting the site you can visit this site to host the project https://aws.amazon.com/ec2/instance-types/. When creating an instance make 
sure to choose the free tier option otherwise you will be charged if you use another option. Select the ubuntu operating system.

## Install MariaDB

Follow the instruction on this site to install MariaDB https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-22-04. Make sure to create the database with all the information from CreateDB.TXT file.

## Install .netruntime

Follow the instruction to install .netruntime with this link https://learn.microsoft.com/en-us/dotnet/core/install/linux-snap-runtime.

## Install and setup apache

Follow the instruction on this site to install apache https://www.yogihosting.com/aspnet-core-host-apache-linux/

## Deploy app to ec2 instance 

You must build the application in visual studio and publish it once published you have to move all the publish file to the ec2 instance and then host all the files from there. 



