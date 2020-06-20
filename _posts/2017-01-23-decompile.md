---
layout: post
title: "Android反编译"
catalog: true
date: 2017-01-23
tags:
    - 反编译
---
最近由于个人感情和年会，年终总结等活动一直无法静下心来写文章，其实也就是各种借口吧了，看了一下上一篇文章正好20天了，感觉好可悲呀，希望下不为例，正好刚装系统要安装一个Android反编译工具于是把这些经历记录下来方便以后直接查阅<font color=red>注意看最好一个小标题</font>,废话不说开车了<!-- more -->

### 下载地址
 + apktool [https://ibotpeaches.github.io/Apktool/install/](https://ibotpeaches.github.io/Apktool/install/), 根据英文文档安装，其实就是把bat与apktool重命名之后放在一起当然入在c://window最好了
 + dex2jar [http://sourceforge.net/projects/dex2jar/files/](http://sourceforge.net/projects/dex2jar/files/)
 + jd-gui [http://jd.benow.ca/](http://jd.benow.ca/)

### 使用说明
+ apktool
把apk放在与apktool同级目录里运行命令：apktool d xxxx.apk就可以反编译出资源文件了
+ dex2jar
把apk后缀修改为.zip解压，将其中的classes.dex复制到dex2jar文件夹里运行命令：d2j-dex2jar classes.dex 会生成classes-dex2jar.jar
+jd-gui就是用来打开jar包的

### 重打包
关于重打包，现在用不上，也不打算做什么不道德的事，所以等到用着了再总结

### 小技巧
我不会记这些命令，我会在这些软件下写一个readme文件，用的时候直接复制就可以了就这么简单
