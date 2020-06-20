---
layout: post
title: "Activity教程总结"
catalog: true
date: 2016-09-02
tags:
    - Activity
    - Android
---

Android中Activity是最常用的先弄点Activity中不常用的OnsaveInstanceState()和OnRestoreInstanceState(),这两个方法不属于Activity的生命周期，不一定被执行，只有遇到意外情况如内存不足销毁一个Activity时才会调用这些方法，也就是用户不想销毁时他由于一些原因销毁了，onSaveInstance在onPause之后执行，OnRestoreInstanceState在onStart之后执行。一般我们还是通过onCreate还原数据。另外<font color="red">屏幕旋转</font>时也会调用这个方法（销毁Activity了）在这两个方法里面可以保存临时数据。如果你的应用程序中没有申明任何一个活动为主活动这个程序仍然可以安装一般用来做第三方服务的，如支付宝快捷支付服务。按下Back键时就调用OnDestory以前一直以为OnDestory的调用具有随机性，当启动一个新的activity，前一个activity进入onpause，此时的activity即使被系统回收了，按back键也能回来，只不过时重新调用了oncreate方法。同时记住onsaveInstanceState要手动保存数据了系统不会自动保存的先看一下<!--more-->activity的生命周期
![img](/images/2016/0902activitylife.jpg)
<!--more-->
下面介绍特定场景下Activity生命周期的变化

#### 按下返回按键
onPause –> onStop –> onDestroy

#### 按Home键
onPause –> onSaveInstanceState –> onStop

#### 屏幕旋转
屏幕旋转时Activity会销毁并重新创建。<br/>
onPause –> onSaveInstanceState –> onStop –> onDestroy –> onCreate –> onStart –> onRestoreInstanceState –> onResume

### Activity任务和启动模式
<font color="red">任务</font>：任务是指在执行特定作业时与用户交互的一系列Activity,这些Activity按照各自的打开顺序在返回栈中，有可能在不同的栈中。当按下Home键时这个任务就进入后台了，重启一个应用就是一个新的任务，
如果你想管理Activity在栈中的位置，比如启动一个Activity时你想让他进入一个新的栈中而不是原来的栈中，这些是可以能过manifest文件中的<activity>属性设置的，或者在启动Activity时配置Intent的Flag<br/> 通过activity属性taskAffinity给任务栈指定一个名字，名字默认是app的名字，所以你指定的不能是app的名字。
<font color="red">启动模式</font>通过设置activity属性可以设置activity启动模式：standard(标准模式)，singleTop（栈顶复用模式），singleTask（栈内复用模式）， singleInstance(单实例模式)实现了活动实例的共享。<font color="red">通过Intent，Flag可以设置启动模式</font>点击查看(Android 之Activity启动模式(二)之 Intent的Flag属性)[http://wangkuiwu.github.io/2014/06/26/IntentFlag/]

* allowTaskReparenting
* clearTaskOnLaunch如果将首页（最底层）Activity的这个属性设置为true，那么只要用户离开了当前任务，再次返回的时候就会将最底层Activity之上的所有其它Activity全部清除掉。也就是没次返回任务栈时都是从首页开始
* alwaysRetainTaskState如果将首页（最底层）Activity的这个属性设置为true，任务栈所有的Activity会被继续保留
* finishOnTaskLaunch这个属性和clearTaskOnLaunch是比较类似的，不过它不是作用于整个任务上的，而是作用于单个Activity上。如果某个Activity将这个属性设置成true，那么用户一旦离开了当前任务，再次返回时这个Activity就会被清除掉

### 三、Activity、Window、View的关系
