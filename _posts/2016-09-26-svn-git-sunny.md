---
layout: post
title: 版本控制之Git与SVN总结
catalog: true
date: 2016-09-26
tags: 
    - 版本控制

---


版本控制的出现主要是为了解决下面问题： 

1. 不敢删除源代码文件，不敢修改源代码文件，文档和源代码管理混乱，无法查找；
2. 不知道如何把项目分发，多个人参与进来不方便，因为不知道怎么整合<!--more-->

版本控制一路走来最长用的就以集中式（SVN）和分布式（Git），优缺点大体可以归结为：

1. SVN是集中式的所以对服务器要求高，容灾性差，用户必须进行联网， 但安全性高
2. Git是分布式的所以安全性就差，不需要联网，学习成本高

按照开发流程总结Git和SVN相关的知识体系。

### Git
Git是分布式版本控制，为了方便用户间进行代码交换也有一台中央管理器就是远程仓库

1. 安装好Git之后要自报家门,进行必要的配置。
2. 认证远程仓库SSH

#### 全局配置

查看和配置全局用户和密码（user.name, user.password）

``` shell
//查看全局git配置，全保存在了.git里面的文件中
git config --list --global       
//修改默认的用户名和邮箱地址
git config --global user.name cpudream
git config --global user.email cpudream@live.com
```

git配置相关的命令（增，册，改，查），为了方便下面以user.name为例列出来

```shell
//查看具体的配置文件 
 git config user.name     
 //增加配置
git config --global --add user.name liuyufeng
//删除配置
git config --global unset user.name liuyufeng   
```

#### SSH认证

```shell
//生成ssh认证在用户目录下的.ssh文件下
ssh-keygen -t rsa -C "cpudream@live.com"
```

Linux的话可以把ssh加入到ssh-agent里面进行管理与缓冲里，不加也可以，因为涉及到ssh生命周期的问题，不太懂

```shell
ssh-agent bash
ssh-add ~/.ssh/id_rsa
```

#### GIT操作区域

Git分为三个区加上一个远程仓库：工作区， 临时区，本地仓库， 远程仓库，所有的命令就是这三个区域中进行，**下图在google image里面找的**

![git.png](https://i.loli.net/2018/07/22/5b543a6bce8f9.png)

#### 创建仓库

第一种方式本地先创建仓库与远程仓库关联
```shell
git init
//与远程仓库关联，不认证也可以关联
git remote add origin git@github.com:cpudream/gitHello.git
//如果远程仓库是空的，可以直接push
git push -u origin master
//如果远程仓库不为空，会报fatal: refusing to merge unrelated histories
git pull origin master ----allow-unrelated-histories
```

第二种方式，直接clone一个新仓库

```shell
git clone https://github.com/CPUdream/gitHello.git
```


#### 提交修改
```shell
git add .
git commit -m "add readme.md"
//修改上一次的commit
git commit --amend -m "third"  
```

#### 查看代码仓库状态

```shell
git status 查看文件的状态
git diff  HEAD^ 查看加了什么东西，用第三方工具 
git diff --staged:比较work are VS stated<br/>
git diff --cached: staged VS local repo(不加参数默认是这个命令)
```

### git stash暂存
一般切换分支的时候会用到
```shell
git add -A # 首先应该执行 add 命令，才能执行 stash
git stash # 暂存当前的修改
git stash list # 查看已经存在的暂存 
```

#### 本地切换分支

```shell
//创建并切换
git checkout -b dev
//下面两行代码等价于上面的
git branch dev
git checkout dev
//删除本地分支
git branch -d dev
```

#### 分支冲突

1. 切换到 master分支
2. 下载最新代码 ，解决冲突git pull origin master
3. 合并代码 git merge dev

#### 回退

1. 移除工作区： `git checkout test.md`  清空当前工作区的东西，回退到暂存区中的状态
2. `git reset` 回退版本, 如果push的时候有冲突，因为远程仓库没有回退
```shell
 --hard 重置index，workspace区
 --mixed 重置index， 不重置workspace
 --soft  全不重置
```
3. `git revert `要解决上面的问题出来的

#### 远程管理

```shell
//先建立本地分支, 推送上去，指定远程分支和本地分支
git push origin dev:dev  
//删除远程分支
//推送一个空分支
git push origin :dev
//直接删除
git push origin --delete dev
```

```shell
git remote -v  #查看远程地址 

git remote add origin {git-url} # 添加 origin 仓库

git remote rm origin  # 删除 orgin 仓库

git remote set-url origin {git-url}  # 重置 orign 指向的仓库
```

#### 标签

新建标签
```shell
//创建head和指定id的
git tag tag1
git tag tag1 commit_id
```
发布标签到远程
```shell
git push origin tag1
//一次推送全部tag
git push origin --tags
```
删除标签
```shell
//先删除本地标签，再删除远程标签
git tag -d tag1
//最好看一下有多少标签再删除
git push origin :refs/tags/tag1
```

### SVN

svn操作比较简单不总结了，只说一下svn的分支管理

#### 分支管理

1. Branch -> 修改 To path(一般在后面加/branch) 
2. 选HEAD revision in the repository
3. 上面新建完之后是空的， 需要update
4. 合并分支时选中master分支， merge
5. 然后选择Merge two different trees
6. 下一步在From和To中都选择要合并的分支目录;
7. 在From的Revision选择创建分支时的那个Revision，具体就是点击Show log
8. 在To的Revision选择HEAD Revision，也就是最新操作;
9. 下一页选择默认项

#### svn备份

首先Update,然后Export这个就OK了，不受版本控制了

### 参考
[瘳雪峰的Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
[易百教程](https://www.yiibai.com/git/)
[ssh-add教程](http://man.linuxde.net/ssh)
[git push origin与git push -u origin master的区别](https://www.cnblogs.com/zhouj850/p/7260558.html)
[git版本回滚：revert和reset](https://blog.csdn.net/zc474235918/article/details/60136724?locationNum=11&fps=1)
