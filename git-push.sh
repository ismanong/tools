#!/bin/bash
curday=`date +%Y-%m-%d`
git add . && git commit -m "Article Update By  $curday"  && git push 