#!/bin/bash

if [ "$NODE_ENV" == "production" ]; 
then 
  npm start
else
  npm install
  nodemon start
fi
