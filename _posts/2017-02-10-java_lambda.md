---
layout: post
title: "Java Lambda表达式"
catalog: true
date: 2017-02-10
tags: 
- lambda
---
在计算机的学习总是后知后觉，jdk1.8出来也已经两个年头了，可是它的新特性一直没有学，也没有用，最近一直在用RxJava，所以用Lambda表达式代码会更加简洁，网上关于Lambda的教程非常多，但是还是想自己实践并记录一下，方便以后查阅,需要注意的是AndroidStudio现在还没有支持Lambda表达式，必须借住第三方的libray,Lambda语法结构是(argument) -> {body;}, 我感觉Lambda就有两种形式，一种是匿名内部类的形式，另一种是list遍历的foreach,<!--more-->
1. 线程


```Java
//jdk 1.8之前
new Thread(new Runnable() {

			@Override
			public void run() {
				System.out.println("测试线程");
			}
		}).start();
```

```Java
//jadk 1.8+
new Thread(() -> System.out.println("测试线程1")).start();
```

2. List

```Java
//jdk 1.8之前

for(int i = 0; i <10; i++){
			list.add(i + "个");
		}
		for(String temp : list){
			System.out.println(temp);
		}
```

```Java
//jdk1.8+
//只有List能这么搞，其它的数组好像是不能这么写
list.forEach(temp -> {System.out.println(temp + "test");});
```

### AndroidStudio使用Lambda
详细配置见这一篇博客吧：[Android gradle 与 groovy 入门教程](https://blog.liuyufeng.tech/post/2017-01-28-gradle-groovy.html)
