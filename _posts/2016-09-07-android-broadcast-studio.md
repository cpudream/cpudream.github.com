---
layout: post
title: "android广播教程学习总结"
catalog: true 
date: 2016-09-07
tags: 
    - Broadcast
    - Android
---

写广播不管三七二十一先写个广播接收器。可以写成内部类（静态注册不要写）。android系统默认广播优先级是0，取值范围是-1000~+1000。<font color="red">注意</font>不要在onReceive方法中添加过多的逻辑或者进行任何的耗时操作，因为广播接收器中是不允许开户线程的，当onRecevie()方法运行了较长时间没结束他就会报错。广播接收器扮演这打开程序和其他组件的角色。比如开启一个服务等等。先说广播的分类：<font color="red">a.</font>标准广播:是一种完全异步的广播。在广播发出之后所有的广播接收器几乎同时收到这条广播消息。它们之间没有任务先后顺序，这种广播效率比较高，无法被拦截。<font color="red">b.</font>有序广播是一种同步执行的广播，同一时刻只有一个广播接收器可以收到广播消息，前面的接收器可以截断正在传递的广播。Android系统内置了许多系统级别的广播，系统广播大全[点击请看](http://blog.liuyufeng.tech/post/2016-09-06-android-system-broadcast.html)，先看看动态注册里面要注意的东西，下面的实验显示Toast不依赖任何Activity而存在<!--more-->
```java
public void broadcastDemo(View view) {
    IntentFilter filter = new IntentFilter();
    //当网络发生变化时会发出下面一条广播，这里告诉我们要接收什么样的广播
    filter.addAction("android.net.conn.CONNETIVITY_CHANGE");
    NetworkChangeReceiver receiver = new NetworkChangeReceiver();
    registerReceiver(receiver, filter);  //按下Menu演示， 不能按Back
    //onDestroy()里取消注册
}
class NetworkChangeReceiver extends BroadcastReceiver{
    @verride
    public void onReceive(Context context, Intent intent){
        ConnectivityManager connectivityManager = (ConnectivityManager)getSystemService(Context.CONNECTIVITY_SERVICE);
        //调用下面的方法要记得加权限ACCESS_NETWORK_STATE
        NetworkInfo info = connectivityManager.getActiveNetworkInfo();
        if(info != null && info.isAvailable()){  //当网络不可用直接就为空，后面就会报空，依次类推
            Toast.makeText(context, "当前有网", Toast.LENGTH_LONG).show();
        }
    }
}
```
### 静态注册广播
<font color="red">广播与Activity通信用Intent,广播可以跨进程通信</font>静态注册广播程序没有启动程序就能收到广播，但是要注意，静态注册，广播接收器最好不要写成内部类，，写成内部类有可能报错，必须写成静态内部类，但注册的时候还要用$进行注册。静态注册<font color="red">首先通过android:name来指定具体注册哪一个广播接收器，然后在<intent-filter>标签里加入想要接收的广播就行</font><font color="green">一个Activity页面静态注册广播我感觉只能注册一个，注册两个的话有一个广播怎么也收不到，当然可以一个页面一个静态注册，多个动态注册</font>
### 有序广播传递数据
<font color="red">AndroidStudio的缓冲坑死我了</font>有序广播可以通过setResultData和getResultData等函数来传递数据，不能通过intent.put来传递会报空指针
```java
class NetworkChangeReceiver extends BroadcastReceiver{
    @Override
    public void onReceive(Context context, Intent intent){
        Log.i("you", intent.getStringExtra("diyi"));
        setResultData("wo ye buzhi dao shuo shen me");  //设置传递的值，也可以通过Bundle来实现
    }
}
```
```java
public class MyRecevier extends BroadcastReceiver{
    @Override
    public void onReceive(Context context, Intent intent){
        Log.i("you, "xxxxxxx");
        String s = getResultData();
        Log.i("you", s);
    }
}
```
### 本地广播
以前从来没有玩过本地广播，这种广播只能在应用程序内部传递数据。很好的解决了安全性问题。主要使用了一个LocalBroadcastManager来对广播进行管理。写法和全局的写法一样。<font color="red">另外</font>本地广播只能动态注册，不能静态注册，因为静态注册是为了让程序在未启动的情况下也能收到广播，而发送本地广播，我们的程序肯定启动了。
最后总结一下本地广播的优点（有可能面试问）：a. 可以明确地知道正在发送的广播不会离开我们的程序，因此不用担心机密数据泄漏； b. 其它的程序无法将广播发送到我们的程序内部。因此不需要担心会有安全漏洞的隐患； c. 发送本地广播比起发送系统全局广播将会更加高效。
```java
LocalBroadcastManager manager = LocalBroadcastManager.getInstance(MainActivity.this);
IntentFilter filter = new IntentFilter();
filter.addAction("mainactivity.sksk");
MyRecevier recevier = new MyRecevier();
manager.registerReceiver(recevier, filter);  //同理注销广播也要用manager注销
Intent i = new Intent();
i.setAction("mainactivity.sksk");
manager.sendBroadcast(i);   // 这个容易忘记写manager
```





