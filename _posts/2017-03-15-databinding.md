---
layout: post
title: Android DataBinding教程
date: 2017-03-15
catalog: true
tags: 
    - Android
---
DataBinding是实现MVVM的一个工具最近项目里面要使用DataBinding，所以总结出这个玩意来了，最好的教程当然是官方提供的了[点击访问](https://developer.android.com/topic/libraries/data-binding/index.html)，DataBinding是一个library,我们要用他当然要导入了，但是AndroidStudio1.3之后提供了对他的支持我们只需要在APP Mouldle Gradle下添加以下代码就可以用DataBinding这个类了,就这么简单就这么韧性
```Java
android{
  dataBinding {
    enabled = true;
  }
}
```
<!-- more -->
### 绑定基本数据类型
使用DataBinding，在XML里面type必须要写完整的，以前看博客说lang包下的不完整也是可以的事实证明，是错误的，编译时就会出错， XML是View我们可以在XML里面写代码所以在用到类的时候我们要通过关键定variable进行变量的申明。
```XML
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable
            name="name"
            type="java.lang.String" />
    </data>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@{name}" />
</layout>
```
```java
//与布局文件进行绑定自动生成一个根据布局名字命名的Binding
ActivityMainBinding mBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
mBinding.setName("liuyufeng");   //这个是最简单的
Log.i("you", "aaa" + mBinding.getName());
```
### ViewModle绑定View
我对这个的理解是当我的Bean类设置了值的时候View也是有值的，当我们的Bean变化了的时候View也是可以变化的，所以我们建立一个实体类来操作。<font color = red>先说一个简单的错误，错误信息看下面</font>
```java
Error:Execution failed for task ':app:compileDebugJavaWithJavac'.
> java.lang.RuntimeException: Found data binding errors.
****/ data binding error ****msg:Could not find accessor tech.liuyufeng.databindingdemo.UserBean.pwd
file:D:\me_androidstudio_workspace\DataBindingDemo\app\src\main\res\layout\activity_main.xml
loc:21:28 - 21:35
****\ data binding error ****
```
上面的意思是不能发现UserBean下的pwd所以我一看是没有写那pwd的get,可以不写set方法不知道为什么，<font color = red>不写get方法报错，不写set方法不会报错</font>
这个代码不写了要看的直接去我的GitHub上看一下就好了[点击访问](https://github.com/CPUdream/blog_example_demo)
### View绑定ViewModle
这个我看来就是View里面的值变了那么你得让我的那个ViewModle也变化，也就是我们的那个Bean类发生变化，同理我们先上一段代码吧，为了省事点我把事件监听也放在一块方便查看。
```xml
<EditText
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:text="@{user.name}" />
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="ok"
    android:onClick="@{ main1.myClick}"/>
```
```java
</font color = red>首先必须要做的事就是把这个东西给set到Binding里面去</font>
mBinding.setMain1(this);
//2. 写myClick方法就可以了
```
<font color=red>当我们那样写了之后会出现一个问题就是View里面的值发生变化但是Log不变，还是初始的值，这个很尴尬</font>

#### View绑定ViewModle实现
其实解决方法就是我们的Modle类继承BaseObservalb就可以了，把get方法前面加上@Binding,然后加上这么一个玩意就可以了@={}
```xml
<EditText
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    <!--不能有空格否则就错了 -->
    android:text="@={user.name}" />
  <Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="ok"
    android:onClick="@{main1.myClick}"/>
```
