---
layout: post
title: 设计模式之简单工厂模式
date: 2017-03-28
catalog: true
tags: 
    - 设计模式
---
简单工厂模式(Simple Factory Pattern)不属于23种基本设计模式里的模式，简单工厂模式可以说是工厂方法模式的“小弟”,抽象工厂又是工厂方法模式的大哥，使用简单工厂可以降低客户端与业务类之间的耦合度，提高程序可扩展性（把具体业务类分离开来），缺点就是工厂类的职责过重，如果新加业务类就必须修改工厂类，违反了开闭原则。简单工厂的定义<font color = red>定义一个工厂类，它可以根据参数的不同返回不同类的实例，被创建的实例通常都具有共同的父类。因为简单工厂模式中用于创建实例的方法是静态方法，因些工厂模式又被称为静态工厂方法</font><font color = green>green</font> 总之一句话如果我们想要自己的业务（可以是多个界面的创建等）分离开来，我们就要考虑简单工厂是不是适合了.<!-- more -->
### 简单工厂实现
先来看看简单工厂的UML图。
![](http://of0xqj5p6.bkt.clouddn.com/2017/0328factory.png)
Factory（工厂类）是简单工厂类里的核心，主要是用来创建实体类的
```java
class Factory{
    Product product;
    public static Product create(){
        if(){
          product = new ConcreteProductA();
        }
    }
}
```
Product就是一个抽象的产品类里面，最典型的模式为
```java
abstract class product{
  public void sampleMethod(){

  }
  public abstract void diffMethod();
}
```
###简单工厂改进
