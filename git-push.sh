#!/bin/bash
curday=`date +%Y-%m-%d`
git add . && git commit -m "Article Update On  $curday"  && git push 