#!/bin/bash
rm -r masterthesis
unzip -o -d ./masterthesis ../masterthesis.zip 
echo "Please input commit message"
read commitMessage
echo "$commitMessage"
git add -A
git commit -m "$commitMessage"
git push