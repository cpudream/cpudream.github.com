---
layout: post
title: "Intent和IntentFilter教程总结"
catalog: true
date: 2016-09-04
tags: 
    - Intent
---

Intent是连接四大组件的桥梁，看书的时候有些小知识点容易忽略总结一下。返回监听onBackPressed()是这个方法，调用startActivityForResult时第二个activity中的Intent只能通过new来的，不能getIntent()得到。Intent的六大属性（<font color="red">ComponentName</font>, Action Data, Category, Extra(通过Bundle传数据), Action）,ComponentName表示显示调用（组件名），Action一般是打开的意思就是说我要打开什么了表示一个动作，所以经常与Data结合起来用，如我要打开图片，这里的图片就是Data,Data要用URI格式。Data与Type一起用的时候要用setDataandType不能分开调用setData和setType,虽然默认的分类是CATEGORY_DEFAULT,最后全写上容易出事。<font color="blue">每个Activity只能指定一个Action，多个Category,activity要同时响应他们，是与的关系不是或的关系</font><!--more-->

#### Data数据类型
tel://号码格式
mailto://邮件数据格式，
smsto://短信
file：//文件
geo://latitude, longitude，在地图上显示这个位置
android:scheme只指定上面的协议名，这个好呀
android:host这个是指定的是主机名比如www.baidu.com
android:port 端口号
android:mimeType,是一种互联网标准，它扩展了电子邮件标准，使其能够支持非ASCII字符、二进制格式附件等多种格式的邮件消息。可以用通配符，下面总结的够详细了，搬来用一下
<font color="red">[Android MimeType的用法和几种类型](http://www.bkjia.com/Androidjc/953284.html)</font>
#### Action属性大全
ACTION_MAIN: AndroidApplication的入口，每个应用只能有一个
ACTION_VIEW: 系统根据不同的DATA类型，打开不同的应用 1。file//打开文件这里根据后缀来打开比如mp3, 2。http://打开网页。
ACTION_DIAL：打开拨号程序，如果设置了Data就把电话填进去
ACTION_CALL：直接就打电话了
ACTION_BOOT_COMPLETED:Android系统启动完毕发送这个广播
ACTION_TIME_CHANGED：Android系统的时间发生改变后发出带有此Action的广播（Broadcast）。
ACTION_PACKAGE_ADDED：Android系统安装了新的Application之后发出带有此Action的广播（Broadcast）。
ACTION_PACKAGE_CHANGED：Android系统中已存在的Application发生改变之后（如应用更新操作）发出带有此Action的广播（Broadcast）。
ACTION_PACKAGE_REMOVED：卸载了Android系统已存在的Application之后发出带有此Action的广播（Broadcast）。

#### Category分类
CATEGORY_BROWSABLE：设置该组件可以使用浏览器启动。一般我们浏览网页的时候用这个调转到APP
CATEGORY_DEFAULT：默认的分类，也就是普通的activity，不设置就是默认的
CATEGORY_LAUNCHER:app主入口,与ACTION_MAIN一起用

#### Extra
getStringExtral,putExtral里面是键值对的可以是其它基本数据类型，也可以是Bundle






