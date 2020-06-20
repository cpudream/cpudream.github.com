---
layout: post
title: "Android Service教程总结学习"
catalog: true 
date: 2016-09-25
tags: 
    - Service
---
Anroid服务就是应用程序即使在关闭的情况下仍然可以在后台继续运行。不过要注意，服务并不是运行在一个独立的进程当中的，而是依赖于创建服务所在的应用程序进程。当某个应用程序进程被杀掉时，所依赖的服务也停止运行，服务并不会自动开户线程而是运行在主线程中去的，服务的生命周期如下图，但是要注意onStart在onStartCommad之后但是他已经被Android废除了。onCtreate()在服务创建的时候调用，onStartCommand()方法会在每次服务启动的时候调用。服务不能写有参构造函数，这样的话注意有问题。<!--more-->
![](http://of0xqj5p6.bkt.clouddn.com/2016/0925androidservice.jpg)
### 前台服务
服务的东西掌握的不错但是以前没有怎么用过前台服务，前台服务与普通服务最大的区别就是，他会一直有一个正在运行的图标在系统的状态栏显示，下拉状态栏后可以看出更加详细的信息非常类似于通知。下面的代码记得写在Service里面而不是写在Activity里面。
```java
Notification.Builder builder = new Notification.Builder(this);
builder.setContentText("内容");
builder.setContentTitle("标题");
builder.setSmallIcon(R.mipmap.ic_launcher);
builder.setAutoCancel(true);
Intent i = new Intent(this, MainActivity.class);
 PendingIntent pendingIntent = PendingIntent.getActivity(this, 1, i, 0);//PendingIntent经常忘记
builder.setContentIntent(pendingIntent);// 这个也容易忽略
Notification notification = builder.build();
startForeground(1, notification);
```
### IntentService的使用
IntentService的引入解决了两种问题，第一当运行完成自动自动停止服务，第二，在内部创建了子线程我们没有必要创建了。
这个代码很好写，只需要承继IntentService写一个无参构造函数和重写onHandleIntent()这个在子线程中的就可以了，
```java
public class IntentServiceDemo extends IntentService {
    public IntentServiceDemo() {//只能是无参构造函数
        super("IntentServiceDemo");
    }
    @Override
    protected void onHandleIntent(Intent intent) {
        Log.i("you", Thread.currentThread().getId()+ "=====");
    }
}
```
