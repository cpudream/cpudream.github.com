---
layout: post
title: "Android入门教程拾遗"
catalog: true
date: 2016-08-17
tags: 
    -Android
    - 第一行代码
---

<font color="red">小常识</font>2003年， AndyRubin(安迪·鲁宾)创办了Android公司。这个人你还是要记住的。2008年，第一个Android版本诞生。(2016.10.18更新)Android底层通过最快的C语言保证效率，上层使用Java简单，快速进行开发。
Android系统架构，四层架构，五块区域。<font color="red">Linux内核层（Linux Kernel）</font>:Android系统的核心服务安全性，内存管理，进程管理，网络协议为硬件提供底层驱动提供支持。<font color="red">(库和运行时)Libraries, Android Runtime</font>:Librarie通过C/C++库为AndroidFramework层提供了支持，eg.SQLite:关系数据库，Webkit:web浏览器，OpenGL,3D效果。应用框架层（APPLICATION FRAMEWORK）提供各种API
Android4.0以上的设备已经占到99%了。查看各个Android版本所占的比例http://developer.android.com/about/dashboards。所以<font color="red">现在开发支持API17（Android4.2）以上不会往下兼容了</font>下面是部分版本对应的SDK,请参见：http://developer.android.com/guide/topics/manifest/uses-sdk-element.html<!--more-->
![](http://of0xqj5p6.bkt.clouddn.com/2016/0817startfirstcode.png)

<font color="red">Target SDK</font>就是指你在这个目标版本上做了充分的测试，系统不再为你做向前兼容了（更高版本的兼容），举个例子如果你用的TargetSDK是18（Android4.3）那么Android6.0里的那些特性就无法兼容了比如那种界面风格。所以TargetSDK一般设置成最新版本的<font color="red">Comille With</font>,这个就是app在构建的时候用的android.jar包是哪个的了一般也设置成最大的，假如你设置成最小的有些api就不能用了。
Android SDK是谷歌提供的Android开发工具包
<font color="red">assets和res/raw文件的区别</font>它们两者全是不进行编译的，原封不动的打包到apk里面，而raw文件可以被映射到R文件里面，raw下的文件还不会被压缩，只能有一层目录，assets可以有多层，两者全不能读取数据库
<font color="red">Logcat小结</font>别用System.out,优缺点太多。Assert表示断言失败后的错误消息，这类错误原本是不可能出现的错误，现在却出现了，是极其严重的错误类型。 
### Dalvik与ART
(2016.10.18更新)Dalvik<font color="red">包含了一整套的Android运行环境虚拟机</font>每个App分配一个Dalvik虚拟机来保证互相之间不干扰，这个等特点是运行时编译，Dalvik可以运行.dex，这个dex相当于压缩后的java程序，适合小内存。而ART是安装时编译，所以ART安装时消耗时间变长，同时也会占用更大的存储空间（指内部储存，用于储存编译后的代码）,但节省了很多Dalvik虚拟机用于实时编译的时间），这个相当与软件工程中的空间换取时间



