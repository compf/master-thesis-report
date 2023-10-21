#!/bin/bash
unzip -o ../masterthesis.zip 
echo "Please input commit message"
read commitMessage
echo "$commitMessage"
git add -A
git commit -m "$commitMessage"
git push