---
layout: post
title: "设计模式之单例模式"
catalog: true
date: 2016-12-10
tags: 
    - 设计模式
---
我非常赞同把算法，数据结构，设计模式，重构，软件工程比做金庸小说里的内功，Java, C#, Idea等比做武功的招式如九阳神功，那么是内功厉害还是招式厉害？我认为数据结构和设计模式等更应该学习对于一个开发者来说，只要我们把内功修炼好了，有一天我们想转行做后台，做移动端那个速度不是一般人可比的。只要稍微会一点招式就可以杀人于无形，毕竟所有的系统最主要还是业务逻辑和性能安全等<font color="red">======</font>在编程中常用的设计模式有24中，包括23种GoF设计模式和一个简单工厂模式。设计模式按类型可以化分为<font color="red">创建型模式</font>里面包括单例模式，简单工厂模式， 工厂方法模式， 抽象工厂模式， 原型模式， 建造者模式，，<font color="red">结构型模式</font>里面包含适配器模式，桥接模式，组合模式，装饰模式， 外观模式， 享元模式，代理模式， <font color="red">行为型模式</font>。职责模式， 命令模式， 解释器模式， 迭代器模式，中介者模式，备忘录模式，观察者模式，状态模式，策略模式，模板方法模式，访问者模式。设计模式就是为了复用和扩展而产生的所以学习他们很重要<!-- more-->
先看一下UML图![](http://of0xqj5p6.bkt.clouddn.com/2016/1210singleTon.png)
### 单例模式

单例模式(Singleton Pattern)：确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例，这个类称为单例类，它提供全局访问的方法。单例模式是一种对象创建型模式。
单例模式有三个要点：一是某个类只能有一个实例；二是它必须自行创建这个实例；三是它必须自行向整个系统提供这个实例。
<font color="red">饿汉式写法</font>
```java
public class SingleTon{
  private static final INSTANCE = new SingleTon();
  private SingleTon(){}
  public static SingleTon getInstance(){
    return INSTANCE;
  }
}
```
<font color="red">特点：</font>mInstance必须是静态的， getInstance必须是静态的,这种写法在类加载时期就已经创建出实例了，饿汉模式从资源利用率上不及懒汉模式，因为你写的单利不一定在系统中被调用，但是他一定是单例的，以推荐用懒汉模式，系统刚起动时可能出现延迟加载的问题
<font color="red">懒汉式写法</font>
```java
public class SingleTon{
  private static SingleTon mInstance;
  private SingleTon(){
  }
  public static SingleTon getInstance(){
    if(mInstance == null){
      mInstance = new SingleTon();
    }
    return mInstance;
  }
}
```
这个在多线程中可能出现多个实例的问题，修改如下
```java
public class SingleTon{
  private static SingleTon mInstance;
  private SingleTon(){
  }
  synchronized public static SingleTon getInstance(){
    if(mInstance == null){
      mInstance = new SingleTon();
    }
    return mInstance;
  }
}
```
加个同步锁，这次保证了单例，但是性能不好了。所以再次修改如下：<font color="red">最好写法</font>
```java
public class SingleTon{
  private static class HolderClass{
    private final static SingleTon INSTANCE = new SingleTon();
  }
  public static SingleTon getInstance(){
    return SingleTon.getInstance.INSTANCE;
  }
}
```
这个就好了，这里涉及的有类的加载问题,首先加载静态代码块变量和方法谁在前面现加载谁但是方法不会被调用,JAVA类首次装入时，会对静态成员变量或方法进行一次初始化,但方法不被调用是不会执行的， 静态成员变量和静态初始化块级别相同，非静态成员变量和非静态初始化块级别相同。
先初始化父类的静态代码--->初始化子类的静态代码-->
初始化父类的非静态代码--->初始化父类构造函数--->
初始化子类非静态代码--->初始化子类构造函数
