# Set up

## Ensure you have npm.
- - If not present [install-npm]

## Get all javascript dependenices using bower
- Ensure you have bower.
- - If not present install bower: **npm install -g bower**
- After installing bower
- - In the root folder *which has the bower.json*
- - do **bower install**

## GET gulp related dependencies for build
- Go to the root folder.*which has the package.json*
- - do **npm install**

## Build for dev
Ensure that _/app/js/core/constants/dev-constants.js_ are pointing to the correct server.
- QUESTION_URL = "http://localhost:9091/api/v1.0/questions/";
- USER_URL = "http://localhost:9090/api/v1.0/users/";
- ROLE_URL = "http://localhost:9090/api/v1.0/roles/";
- TAG_URL = "http://localhost:9092/api/v1.0/tags/";

To inject all the javascript file into the html.
- do **gulp dev**

Now you can deploy front-end on your server and check the site on *http://YOUR_SERVER/front-end*

## Build for prod
This will clean up the minified file, then minify all the javascript file, lastly inject the minified file in the html.
- do **gulp clean minify prod**

Now you can deploy front-end on your server and check the site on *http://YOUR_SERVER/front-end*


# Wireframes
http://qc.astutetech.com/clientreview/qb-proto-dev/

 [install-npm]: <https://github.com/joemccann/dillinger>
