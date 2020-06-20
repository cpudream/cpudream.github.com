---
layout: post
title: "算法最优解（一）"
catalog: true
date: 2016-12-17
tags: 
    - 算法
---
数据结构与算法是体现编程能力的一个重要手段，也是我接下来主要学习的知识之一，我认为算法和设计模式软件工程一样是最费力不讨好的活，他需要长期投入短期之内根本看不出效果，我希望自己每天学一些数据结构和算法，并且总结到博客里，方便复习,这里面的大部分算法是学习自左程云的《程序员代码面试指南》，每行代码都是纯手敲，我相信模仿加改良才是创新，算法代码同步到我的[GitHub](https://github.com/CPUdream/blog_example_demo/tree/master/Algorithm)上了。好了一步一坑的往下走吧<!-- more -->
### getMin功能的栈
<font color="red"></font>首先要两个栈一个是保存最小值的栈一个是本身元素的栈，再次这个要写成一个类方便被调用
```java
public class MyStack {
	private Stack<Integer> stackData;
	private Stack<Integer> stackMin;
    
	public MyStack(){
		this.stackData = new Stack<Integer>();
		this.stackMin = new Stack<Integer>();
	}
	public int getMin(){
		if(this.stackMin.isEmpty()){
			throw new RuntimeException("栈为空");
		}
		return this.stackMin.peek();
	}
	public void push(int value){
		//if语句写完之后看一看有没有共性抽取出来
		//尽量把变量写在前面,把这两个判断写成一行
		if(this.stackMin.isEmpty() || value <= this.stackData.peek() ){
			this.stackMin.push(value);
		}
		this.stackData.push(value);
	}
	public int pop(){
		if(this.stackData.isEmpty()){
			throw new RuntimeException("栈为空");
		}
		int popValue = this.stackData.pop();
		if(popValue == this.stackMin.peek()){
			this.stackMin.pop();
		}
		return popValue;
	}
}
```
### 两个栈组成队列
栈的特性是先进后出，队列的特性是先进先出，故要维护两个栈一个是本身元素往进push，另一个是倒序排列的当出栈的时候我们重出栈的地方开始,<font color=red>当时我还想如果我往栈里面push东西我是不是还要把另一个栈里的东西清空然后再往进推了，其实不是因为队列后进后出的特性，如果不为空那个pop还是那个值 所以没有必要</font>
```java
public class TwoStackQueue {
	private Stack<Integer> stackpush;
	private Stack<Integer> stackpop;
	TwoStackQueue(){
		stackpush = new Stack<Integer>();
		stackpop = new Stack<Integer>();
	}
	public void add(int i){
		stackpush.push(i);
	}
	public int poll(){
		if(stackpop.isEmpty() && stackpush.isEmpty()){
			throw new RuntimeException("对列为空");
		}else if(stackpop.isEmpty()){
			while(!stackpush.isEmpty()){
				stackpop.push(stackpush.pop());
			}
		}
		return stackpop.pop();
	}
	public int peek(){
		if(stackpop.isEmpty() && stackpush.isEmpty()){
			throw new RuntimeException("对列为空");
		}else if(stackpop.isEmpty()){
			while(!stackpush.isEmpty()){
				stackpop.push(stackpush.pop());
			}
		}
		return stackpop.peek();
	}
}
```
