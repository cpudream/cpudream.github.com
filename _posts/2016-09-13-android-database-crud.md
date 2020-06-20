---
layout: post
title: "Android数据存储CRUD"
catalog: true 
date: 2016-09-13
tags: 
    - ContentProvider
    - Android
---

接着前面的总结，首先说一下CRUD(Create, Retrieve(查询)， Update, Delete)，突然想起SQLite数据库支持的数据类型有哪些了，在网上找的一篇文章感觉写的很详细引用过来了<font color="blue">sqlite 数据类型 全面</font>[点击访问](http://blog.csdn.net/jin868/article/details/5961263)，总之一句话，SQLite采用动态的数据类型，一般会根据存入的值自动判断，会自动转换。进入正题。先从简单的开始添加数据,可以通过sqlite3命令查看添加数据是否成功了。<!--more-->

```java
case R.id.btn_act_main_insert:
   MyDatabaseHelper mh = new MyDatabaseHelper(MainActivity.this, "book.db", null, 2); //版本号低于以前的报错了
   SQLiteDatabase sqlbase = mh.getWritableDatabase();
   ContentValues values = new ContentValues();
   values.put("author", "liuyufeng");      //id那一列不用赋值因为，自动增长
   values.put("price", 12.5);
   sqlbase.insert("book", null, values);    //插入第一条数据
   values.clear();        //这个是个好东西 Editor里面也用到了
   values.put("author", "caihongliu");
   values.put("price", 13.6);
   sqlbase.insert("book", null, values);   //插入第二条数据
   break;
```
### 更新数据
看见更新数据库就想起那几个参数了，其实挺简单的

```java
MyDatabaseHelper mh1 = new MyDatabaseHelper(MainActivity.this, "book.db", null, 2); //版本号低于以前的报错了
SQLiteDatabase sqlbase1 = mh1.getWritableDatabase();
ContentValues values1 = new ContentValues();
values1.put("author", "liulifeng");
values1.put("price", 1212.1);
sqlbase1.update("book", values1, "author=?", new String[]{"liuyufeng"});
break;
```
### 删除数据
删除数据相比于其他的就是一句话的事,这里不贴代码了
> sqlbase1.delete("book","author=?", new String[]{"liulifeng"});

### 查询数据
SQL中查询是最复杂的，SQL的全称是Structured Query Language，重点还是在查询上了。SQLiteDatabase提供了query方法对数据库进行查询操作，有必要总结一下里面参数的含义

| query()方法参数 | 对应SQL部分 | 描述 |
|:--------:|:------------:|:--------:|
| table   |  from table_name | 指定查询的表名 |
| columns | select column1, column2 | 指定查询的列名  |
| selection |  where column = value  | 指定where的约束条件 |
| selectionArgs |     --   --    | 为where中的占位符提供具体的值  |
| groupBy      |   group by column | 指定需要group by的列  |
| having      |   having column = value | 对group by 后的结果进一步约束 |
| orderBy     |  order by column1, column2 | 指定查询结果的排序方式  |


### 事务处理是
