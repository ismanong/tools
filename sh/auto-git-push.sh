# 可能遇到的问题 
# Mac可能无法直接调用 Permission denied 需要给文件执行权限: chmod +x git-push.sh

# # 删除(移除)本地所有的更改
# git checkout -f
# # 查看分支 切换前
# git branch
# # 切换分支
# git checkout xxx
# 查看分支 切换后
git branch
# 拉取最新代码
git pull
# show git status 显示更改的文件
git status
# add all changing 开始添加所有变更
git add .
# local commit 提交变更到本地仓库
# git commit -m "^u %date% %time%"
git commit -m "^u"
# push to remote repository 推送到远程存储库
git push


# shell脚本运行后，让终端不再自动关闭
exec /bin/bash

#  await execShell('''
#    cd $gitDir
#    git pull --no-edit origin release:release
#    git add --all
#    git commit -m "dart自动提交"
#    git push
#    ''');