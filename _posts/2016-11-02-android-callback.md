---
layout: post
title: "接口回调理解"
catalog: true 
date: 2016-11-02
tags: 
    - 回调
---
Android中处处见回调，用的都记住了，可是理解起来总是有点别扭，为什么会有回调，用回调有什么好处，什么时候用回调。于是乎，有了这篇文章。回调不只是Android独有的，像一种设计模式各种编程语言全有，下面的这个例子完全适用于其他语言。进入正题：

首先说明接口回调是回调的升华，下面说说我一步步怎么理解的回调和接口回调。回调比较官方的说法就是A类调用B类里的C方法，然后在某个恰当的时机B调用A里面的D方法的过程。上一句中恰当的时机包括立即和不立即两中情况。为什么A不自己调用自己的D方法而要通过B类去调用了，就是因为A不知道自己什么时候要调用自己的那个D方法（也就是不知道什么是恰当时机），听的有点懵逼，下面以一个简单例子来说明（中午吃饭的时候想到的），其实我们在餐厅吃饭的过程就是回调，故事完全原创转载标明出处，小明去吃饭首先要和服务员报饭（报饭的过程相当于注册监听），然后服务员做饭，做好饭之后通知小明取饭吃饭（通知的这个过程中就会回调），讲到这里你应该感觉到了观察者模式的味道了，所以说回调是一种特殊的观察者模式，不理解没关系，下面在代码中一步一步实现！！！<!--more-->

### 回调1.0

1. 先写一个小明的实体类：
```java
//观察者
public class XiaoMing {
	public void callHelp(String str){
		System.out.println("我要吃" + str);
		//把小明类看成A类，服务员看成B类，这里就是A类调用了B类里的C,方法
        //专业速语是把小明注册进去了，意思是让服务员去给小明做饭去
        Waiter waiter = new Waiter(str);
		waiter.doEating(this);   //可以替换成观察者模式中的regesit方法
	}
	public void eat(){
		System.out.println("小明在吃饭");
	}
}
```
2. 再写一个服务员类
```java
//被观察者
public class Waiter {
	String mEatName = null;
	public Waiter(String pEatName){
		mEatName = pEatName;
	}
	public void doEating(XiaoMing pXiaoMing){
		System.out.println("服务员在做"+pXiaoMing+"前面顾客的饭");
		System.out.println("服务员在做"+pXiaoMing + mEatName);
		System.out.println("服务员喊" + pXiaoMing + mEatName);
		//这里就是B,类调用了A,类的D方法， 服务员反过来调用小明类的d方法
        //观察者中的update
		pXiaoMing.eat();	
	}
}
```

上面就是最最基本的回掉，注释里面写的也很明白
3. 最后写一个测试类
```java
public static void main(String[] args) {
	XiaoMing xiaoming = new XiaoMing();
	xiaoming.callHelp("鱼香肉丝");
}
```
4. 输出结果
```
我要吃鱼香肉丝
服务员在做小明前面顾客的饭
服务员在做小明的鱼香肉丝
服务员喊小明吃鱼香肉丝
小明在吃饭
```

### 回调2.0
假如小红也来吃饭了怎么写呢同理我们写出了一个小红实体类,和小明的写法一样
```java
public class XiaoHong {
	public void callHelp(String str){
		System.out.println("我要吃" + str);
		Waiter waiter = new Waiter(str);
		waiter.doEating(this);
	}
	public void eat(){
		System.out.println("小红在吃饭");
	}
}
```
可是我们发现一个错误,服务员做饭的那个方法doEating只能接受小明类型的参数，不能接受小红了，所以我们在服务员那个类里真加一个方法doEating2用来给小红做饭，代码如下
```java
public void doEating2(XiaoHong pXiaoHing){
	System.out.println("服务员在做"+pXiaoHing+"小明前面顾客的饭");
	System.out.println("服务员在做"+pXiaoHing + mEatName);
	System.out.println("服务员喊" + pXiaoHing + mEatName);
	pXiaoHing.eat();	
}
```
大家想想如果我有100个客户来吃饭，那你的写100个doEating出来，很自然想到把里面的那个参数给抽象出来(参数是小明，小红。。。)，否则代码冗余太多，父类引用了子类实例用到java中的多态。可是Java属于单继承所以我们一般不抽取成父类而是抽取成接口，就有了下面的接口，下面就是接口回掉的内容了
```java
public interface IEating {
	public  void eat();
}
```
然后我们去实现里面的接口，看看代码效果
```java
//小红代码：
public class XiaoHong implements IEating{
	public void callHelp(String str){
		System.out.println("我要吃" + str);
		Waiter waiter = new Waiter(str);
		waiter.doEating(this);
	}
	@Override
	public void eat() {
		System.out.println("小红在吃饭");
	}
}
```
服务员代码
```java
public class Waiter {
	String mEatName = null;
	public Waiter(String pEatName){
		mEatName = pEatName;
	}
	public void doEating(IEating eater){   //变化在这里，
		System.out.println("服务员在做"+eater+"小明前面顾客的饭");
		System.out.println("服务员在做"+eater + mEatName);
		System.out.println("服务员喊" + eater + mEatName);
		eater.eat();	
	}
}
```
这样不管来多少客服都是同一个方法，这里我们基本上就把回掉接口弄完了，可是还有一种情况是卡我时间最长的，请看回掉3.0

### 回调3.0
在Android中经常见这种写法,匿名内部类的写法
```java
public class XiaoMing {
	public void callHelp(String str){
		System.out.println("我要吃" + str);
		Waiter waiter = new Waiter(str);
		waiter.doEating(new IEating() {
			@Override
			public void eat() {
				System.out.println("小明在吃饭"+"");
			}
		});
	}
}
```
当时我怎么想不通这怎么搞的，怎么叫回调呢，感觉不像回调，可是我们换种写法是不是就很容易理解了
```java
public class XiaoMing {
 	class ZhongJian implements IEating{
		@Override
		public void eat() {
			System.out.println("小明在吃饭"+"");
		}
	}
	public void callHelp(String str){
		System.out.println("我要吃" + str);
		Waiter waiter = new Waiter(str);
		waiter.doEating(new ZhongJian());
	}
}
```
ZhongJian这个类相当于XiaoMing这个类的子类，,匿名类和这个ZhongJian类的区别就是一个有名字一个没有名字而已，所以很容易理解了

### 回调使用场景
从上面的例子我可以发现，回调函数其实就是耗时之后的通知因为不知道什么时候耗时完成（这里的耗时不准确也可以说成等待），所以我们网络请求完全可以写成回调来通知主界面。Button也一样的道理
