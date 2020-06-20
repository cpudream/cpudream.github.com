---
layout: post
title: 算法之二叉树
date: 2017-02-28
catalog: true
tags:
    - 算法
---
数据结构里学过二叉树，但是也仅限于学过，我当时跟本不知道在实际开发中二叉树有什么作用，其实二叉数是对数组和链表的一种效率折中，众所周知，链表插入数据非常的方便，但是查找数据就非常不方便，相反，数组查找数据方便，插入数据非常不方便，而我们的二叉树取了两者的优势，所以开发中涉及用到插入数据，查找数据时多考虑考虑二叉树还是挺好的一件事，毕竟二叉树插入和查找时间复杂度小，感觉最常见的二叉树有二叉查找树（又叫二叉排序树或二叉搜索树，左子树小于根，根小于右子树），平衡二叉树（左右子树的高度差不能大于1）今天回顾一下二叉树的创建，查入，查找以及6种遍历方法<!--more-->
### 树的创建
二叉树是一种数据结构所以我们要把这个数据结构定义出来创建出来
```java
public class BTree {
	private Node root;
	public BTree(){
		root = null;
	}
	public class Node {
		private int mData;
		private Node mLeft;
		private Node mRight;

		public Node(int value){
			mData = value;
		}
	}
	public void buildBTree(Node node, int data){
		if(root == null){
			root = new Node(data);
		}else{
			if(data < node.mData){
				if(node.mLeft == null){
					node.mLeft = new Node(data);
				}else{
					buildBTree(node.mLeft, data);
				}
			}else{
				if(node.mRight == null){
					node.mRight = new Node(data);
				}else{
					buildBTree(node.mRight, data);
				}
			}
		}
	}
}
```
### 树的插入
结点的添加比较复杂，因为要涉及到指针的变化 

### 树的遍历
```java
/** 前序遍历 **/
public void  preQuery(Node head){
 if(head == null){
   return;
 }
 System.out.println(head.mData);
 preQuery(head.mLeft);
 preQuery(head.mRight);
}
/** 中序遍历 **/
public void orderQuery(Node head){
 if(head == null){
   return;
 }
 preQuery(head.mLeft);
 System.out.println(head.mData);
 preQuery(head.mRight);
}
```
<font color = "red">用非递归的方式实现遍历</font>所有递归全可以用非递归的方式解决，毕竟递归相当于函数栈把所有东西全保存起来了
```java
/** 非递归实现遍历 **/
	public void preOrder(Node head){
		if(head == null){
			return;
		}else{
			Stack<Node> stack = new Stack<Node>();
			stack.add(head);
			while(!stack.isEmpty()){
				Node node = stack.pop();
				System.out.println(node.mData);
				if(node.mRight != null){
					stack.push(node.mRight);
				}
				if(node.mLeft != null){
					stack.push(node.mLeft);
				}
			}
		}
	}
```
```java
/** 中序遍历 **/
	public void inOrder(Node head){
		if(head != null){
			Stack<Node> stack = new Stack<Node>();
			
			while(!stack.isEmpty() || head != null){
				if(head != null){
					stack.push(head);
					head = head.mLeft;
				}else{
					head =stack.pop();
					System.out.println(head.mData);
					head = head.mRight;
				}
			}
		}
	}
```
