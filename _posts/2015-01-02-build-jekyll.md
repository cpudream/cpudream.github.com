---
layout:       post
title:        "Windows下安装Jekyll"
date:         2015-01-02
catalog:      true
tags:
    - blog
---

>  前言：Jekyll是一个静态站点生成器，它利用模板创建一个静态网站；jekyll可以免费部署在Github上，而且可以绑定自己的域名。

## 一、安装Ruby

Jekyll是Ruby Gems组件，所以我们首先要在windows上装好ruby环境。

### 1.1 下载[RubyInstaller](http://rubyinstaller.org/downloads/)

* 下载WITH DEVKIT的包，注意操作系统是否64位版本
* 下载Ruby2.4以上，否则安装方法不一样

### 1.2  安装Ruby

* 记得要勾选 Add Ruby executables to your PATH，其作用是绑定ruby环境变量
* 记得勾选 MSY2 development toolchain
* 最后一步记得勾选MSY2，然后选3如下图![jekyll](/images/2015/jekyll.png)

### 1.3 安装RubyGems

Windows中下载[ZIP格式](https://rubygems.org/pages/download),解压到任意路径，切换进去输入命令：`ruby setup.rb`

---

##  二、安装Jekyll

对于Window则打开CMD窗口，对于Linux或者MAC则打开终端窗口：

### 2.1 更换源

* 无翻墙软件，可使用国内提供的源
```Bash
gem sources --remove https://rubygems.org/
gem sources -a https://gems.ruby-china.com/
gem sources -l
```
* 有翻墙软件，可以使用如下源
```Bash
gem sources --remove https://rubygems.org/
gem sources -a  http://rubygems.org/
```

### 2.2 安装jekyll
```Bash
gem install jekyll
```
开始安装，因为是联网安装，所以可能时间比较常，耐心等待。至此Jekyll 安装全部完成。

### 2.3 安装paginate
```Bash
gem install jekyll-paginate
```

### 2.4 验证jekyll
```Bash
jekyll -v
```

并_config.yml 中加入一句 `gems: [jekyll-paginate]``

---

## 三、使用jekyll

*  先把github博客Clone下来
```Bash
git clone https://github.com/[username]/[username].github.io.git
git clone git@github.com:[username]/[username].github.io.git
```
clone有两种方法:
第一种是https方法，通过直接输入账号密码的格式提交代码；
第二种是ssh的方式，需要提前配置SSH，之后可直接push代码。
* 启动jekyll服务
```Bash
cd xxxx.github.io.git
jekyll serve
```
*  浏览：[http://localhost:4000](http://localhost:4000/index.html)

**注意事项：**提交文章时时间非常重要的，提交文章的时间最好比当前时间早一段时间，时差问题，可能会导致文章提交失败。

## 四、提交文章

### 4.1 配置git用户名和邮箱
```Bash
$ git config --local user.name "{username}"     //用户名替换{username}
$ git config --local user.email "{email}"    //邮箱替换{email}
```
### 4.2 配置SSH
```Bash
$ ssh-keygen -t rsa -C"{email}"    //邮箱替换{email}
```
一路回车到命令完成，win7系统默认在文件夹`C:\Users\{你的用户名}\.ssh` ，该文件夹有`id_rsa`（私钥） 和 `id_rsa.pub`（公钥） 两个文件。

将`id_rsa.pub`内容复制到自己的Github主页的`Settings -> SSH keys`，添加完毕即可。

### 4.3 提交
```Bash
$ cd {username.github.io}
$ git add .
$ git commit -m "提交简介"
$ git push origin master
```
