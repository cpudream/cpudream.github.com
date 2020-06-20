---
layout: post
title: "ADB教程总结"
catalog: true 
date: 2016-08-27
tags: 
    - adb
    - Android
---

网上关于adb的来龙去脉写的不是很全于是做了一下总结，方便查阅，ADB(Android Debug Bridge)翻译过来是Android调试桥接器说白了就是一个工具，先来讲讲ADB的功能**1。**将本地的APK安装到Android设备里；**2。**计算机和设备之间上传和下载文件；**3。**运行设备的shell(命令行)感觉这个是最常用的adb和adb shell的区别在于adb shell相当于linux的shell用来操作里面的东西只能作用于一台android设备，而adb把他理解成网络可以作用于多台设备比如查看所有的android设备等等，向android设备里传入数据等。总之一句话就是为了电脑和Android设备通信的，其实ADB充当的就是客户端和服务端的那种模式中的网络角色，Android相当于服务端，电脑相当于客户端，你的电脑要操作Android设备，相当于浏览器要访问服务器一样。AndroidStudio和Eclipse启动时会启动adb进程，里面有个adb daemon服务用来监听5554等端口，如果有Android设备启动起来就监听到了，**在网上找到了下面的一张图非常形象**，感觉画的好好<!--more-->
![](http://of0xqj5p6.bkt.clouddn.com/2016/0827adbconnection.png)

### adb命令  

<font color="red">windows下的目录结构于linux下的目录结构斜杠不一样</font>下面用表格的形式总结一下adb的常用命令

|           命令         |           功能            |                                                    备注                                   |
| :--------------------: | :----------------------: |  :-------------------------------------------------------------------------------------:  |                             
|        adb deviecs     |    查看当前连接的设备      |             返回设备序列号和在线状态onffline、device                |
|   adb install [文件名]  |     安装APK              |                         必须要有后缀名称                          |
|  adb   unstall [包名]   |     卸载APK              |                                     必须是包名                  |
| adb kill-server      |   设备不在线或者有多个设备时用 |                                                                 |              
| adb start-server     |        和上面的命令对应       |                                                                     |                   
|  adb push <local> <remote> |  往android端上传数据   | adb push c:\users\cpudream\desktop\biji.txt  /mnt/sdcard/  (后面的是sdcard路径，后面有斜杠)   |                   
|   adb pull <remote> [<local>]  | 下载数据到本地       | adb pull /mnt/sdcard  d:\a (windows文件夹后面可以没有斜杠，但linux不行呀)                    |
|  adb root                    | 进入root权限       |            感觉没什么卵用                                                        |
 

### adb shell命令
adb shell是运行在手机里面的一般用到访问数据库的东西

```
sqlite3  "数据库名"        \\进入数据库
.table                     \\列出所有表
.schema                     \\查看建表语句
```


