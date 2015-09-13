# Scrum Helper

Tool to manage the backlog and plan sprints.

Little project to learn something of Flux-React. WORK IN PROGRESS.

## Requirements

React:

    npm install -g react-tools

## Build

For development, with browserify:

    browserify -t reactify scrum.jsx -o scrum.js

For production: browserify with reactify, and uglify:

    export NODE_ENV=production
    browserify -t reactify scrum.jsx -o scrum.js
    uglifyjs scrum.js -nc -mt --unsafe -o scrum.js
