---
layout: post
title: "设计模式之装饰模式"
catalog: true
date: 2017-01-03
tags:
    - 设计模式
---
扩展一个类有两种方式第一种是继承，子类不仅继承了父类的方法也可以增加新的职责（功能）。但是继承有一个缺点就是客户端无法动态的控制给子类增加新职责（功能）的时机（倒底用不用加新功能）等，同时合成复用原则教导我们少用继承多用关联。不说也知道扩展的第二种方式就是关联了，我们把要扩展的对象引入到新的类里，然后调用已有的方法实现扩展。从而减少了当有多个类需要被扩展同一个类时，类里面方法相同的问题。下面是GOF给出的装饰模式UML图<!--more-->
![装饰模式](/images/2017/0103decorator.jpg)
从上图可以看出装饰类(扩展类)和组件（被扩展类）同时继承或者实现一个基类，分别实现里面的方法，下面用代码进行演示
```java
//Compontent接口,写这个是为了扩展
public interface Compontent {
	void operation();
}
```
```java
public class Decorator {
	private Compontent compontent;
	public Decorator(Compontent compontent){
		this.compontent = compontent;
	}
	public void operation(){
		compontent.operation();
	}
}
```
```java
//没有扩展之前的操作
public class ConcreteCompontent implements Compontent{

	@Override
	public void operation() {
		System.out.println("ConcreteCompontent:" + "这个是基本的操作");
	}
}
```
```java
扩展之后的类
public class ConcreteDecorator extends Decorator{
	public ConcreteDecorator(Compontent compontent) {
		super(compontent);
	}
	@Override
	public void operation() {
		addOther();
		super.operation();
	}
	private void addOther(){
		System.out.println("ConcreteDecorator:" + "扩展类打印的结果");
	}
}
```
上面代码就是简单的装饰模式的原理与代码实现，我们再结合Java IO流对装饰者有更好的理解与应用
### Java IO装鉓
FileInputStream相当于被装饰者，BufferedInputStream相当于装饰者，我们通过newBufferedInputStream(new FileInputStream)实现了扩展问题，如果用继承的话java代码会出现大量的大里冗余
