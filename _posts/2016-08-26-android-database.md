---
layout: post
title: "Android数据存储教程总结大全"
catalog: true 
date: 2016-08-26
tags: 
    - 数据存储
    - Android
---

<font color="red">文章涉及到的源码在我的GitHub上可以找到[**点击跳转**](http://github.com/cpudream)</font>先说个小知识Android数据在按下返回键后存储一般重写onDestroy方法在这个里面写数据存储的相关代码（我当时没有想到）。Android五种数据存储方式一定要记住面试会问到分别是（文件存储、SharedPrefrences存储、数据库存储、ContentProvider存储、网络存储，）我经常会忘记ContentProvider存储。文件存在/data/data/packagename/files/下。首先说几个关于数据库中经常被忽略的概念**瞬时数据**: 就是内存中的数据，没有保存到设备中。**持久化技术**： 提供了一种机制可以让数据在瞬时状态和持久状态之间进行切换。。由于Android数据存储内容太多一篇文章写的太长了所以分成三篇文章去写！！！（8.28号更新）<!-- more -->。
#### 文件存储
首先说一下参数：MODE_PRIVATE是默认的操作模式，表示当指定同样文件名的时候，所写入的内容将会覆盖原文件中的内容，我刚开始一看还以为是私有的。别人不可以访问的意思。 MODE_APPEND这个就不用详细说明了表示追加，MODE_WORLD_READABLE和MODE_WORLD_WRITEABLE已经被废弃了Android4.2
如果你想使用文件存储的方式来保存一些较为复杂的文本数据，就需要定义一套自己的规范。这要方便之后从文件中把数据解析出来（像XML解析得到自己想要的数据），所以文件存储也比较适合存储一些简单的数据。 Android提供了两个类OpenFileOutput, OpenFileInput来对文件读取操作,**我代码写的对了可是在文件里怎么也看不见存储进去的内容后来果断清理缓冲成功了
```java
public void onClick(View view) {
   switch (view.getId()) {
      case R.id.btn_act_main_save_file:   //文件存储——存按钮响应
         try {
            mData = mContent.getText().toString();     //点击得到EditText字符窜
            FileOutputStream fout = openFileOutput(FILENAME, Context.MODE_PRIVATE);    //得到输出流
            saveFile(fout);        //Java中的方法
            Toast.makeText(MainActivity.this, "文件存储成功", Toast.LENGTH_LONG).show();
         } catch (FileNotFoundException e) {
             e.printStackTrace();
         }
         break;
      case R.id.btn_act_main_restore_file:   //文件存储——取按钮响应
         try {
            FileInputStream fis = openFileInput(FILENAME);
            mContent.setText(restore(fis));   //读取到的内容设置到TextView里
					//以前没有这么搞过
            mContent.setSelection(restore(fis).length());  //把EditText定位到末尾
         } catch (FileNotFoundException e) {
             e.printStackTrace();
         }
         break;
   }
}
```
<font color="red">TextUtils.isEmpty方法，一次性进行两种空值的判断。传入的是null或者等于空字符串的时候，返回true</font>
#### SharedPreferences存储
SharedPreference由于我经常用了所以没有什么可总结的，但是要注意参数和文件存储不一样的是把MODE_APPEND替换成了MODE_MULTI_PROCESS，这个是在多进程对同一个SharedPreferences文件进行读写的
getPreferences(),当前活动的类名作为SharedPreferences的文件名，只接收操作模式，作用域是本Activity
PreferenceManager静态类getDefaultSharedPreferences()方法，接收Context，默认是包名为前缀命名的SharedPreference这个是全局的。实战代码如下
```java
case R.id.btn_act_main_save_share:
   mData = mContent.getText().toString();     //点击得到EditText字符窜
   SharedPreferences.Editor editor = getSharedPreferences(FILENAME, Context.MODE_PRIVATE).edit();
   editor.putInt("1", 1);                     //把1也存进去了
   editor.putString("2", mData);            //把输入的内容存储起来
   editor.commit();
   Toast.makeText(MainActivity.this, "sharedPrefrence 存储的成功", Toast.LENGTH_LONG).show();
   break;
case R.id.btn_act_main_restore_share:
   SharedPreferences sp = getSharedPreferences(FILENAME, Context.MODE_PRIVATE);
   String str = sp.getString("2", null);            //根据key得到value
   mContent.setText(str);                          //把得到的数据设置到EditText里面
   break;
```
同时我们要看一下SharedPrefrence的存储格式为xml，里面有头布局，map，除了String用一种格式，其它的和int的存储格式一样。<font color="red">Editor是put对应Shareprefrences里的get,好不对称。</font>
```xml
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <string name="2">sssssssssss</string>
    <int name="1" value="1" />
</map>
```
#### SharedPreferences存储密码的问题
<font color="red">存储密码不是在点击登陆时存储，而是在登陆成功后存储，Editor.clear()以前不怎么用</font>，部分代码见下
```java
mLogin.setOnClickListener(new View.OnClickListener() {
   @Override
   public void onClick(View view) {
      String name = mName.getText().toString();   //得到EditText中用户名字符串
      String pwd = mPwd.getText().toString();     //得到EditText中密码字符串
		  //害的我好苦
      if (name.equals("admin") && pwd.equals("123")) {    //判断是否登陆成功
          Toast.makeText(LoginActivity.this, "111", Toast.LENGTH_LONG).show();
          if (mRemeber.isChecked()) {           //检查复选框是否被选中
              mEditor.putBoolean("rembered", true);
              mEditor.putString("name", name);
              mEditor.putString("pwd", pwd);
              Toast.makeText(LoginActivity.this, "登陆成功", Toast.LENGTH_LONG).show();
          }
      } else {
          mEditor.clear();
      }
      mEditor.commit();
   }
});
```
#### SQLite数据库存储
SQLite数据库是一种关系型数据库（关系型数据库其实就是一张二维表格，详情点[百度百科](http://baike.baidu.com/link?url=4Mjm0v-UQchPplNteNOFsf8CqAXGZeqBzeZmY2_aHLAJUjlXZsch-ywhYxmOW50uFQrkCqgeDvFYqsiQjpgF83abq1lTn2OI9N09_Z4HCF_)）,还遵循ACID事务（原子性，一致性，隔离性，持久性），SQLite数据库适用于一下情况，比如我们的手机短信可能有很多个会话，每个会话中又包含了很多信息内容，并且大部分会话还可以各自对应了电话簿中的某个联系人，很难想象如何用文件或者SharedPreferences来存储数据量大、结构复杂的数据。 现在开始说SQLiteOpenHelper这个帮助类是一个**抽象类**，Helper里面有两个实例getWritableDatabase()[当磁盘满的时候会发生异常]和getReadableDatabase()。通过这两个实例可以创建和打开一个数据库，当调用这两个实例时会调用help类的onCreate方法进行创建数据库的逻辑<font color="red">只执行一次</font>。<font color="blue">在写数据库名称时把后缀.db加上</font>，当创建Helper实例的时候要据版本号进行判断是不是执行onUpdater方法。部分代码见下面，效果请用adb命令来进行操作。adb操作sqlite3经常命令找不见请看这篇博客[点击访问](http://www.jianshu.com/p/16b212b2e928)如果不懂请看[adb命令大全](http://blog.liuyufeng.tech/post/2016-08-27-adb-command.html) sqlite3命令还可以用数据库命令比如select.<font color= "blue">(9.13更新)</font>
```java
case R.id.btn_act_main_sqlite:                 //SQLite存储
    MyDatabaseHelper helper = new MyDatabaseHelper(MainActivity.this, "book.db", null, 1);     //得到数据库帮助类
    SQLiteDatabase database = helper.getWritableDatabase();          //这里创建数据库
    Log.i("you", "创建数据库成功");
    break;
case R.id.btn_act_main_sqlite_update:        //sqlite更新
    MyDatabaseHelper openHelper = new MyDatabaseHelper(this, "book.db", null, 2);
    SQLiteDatabase base = openHelper.getWritableDatabase();          //要想执行必须调用这个
    Log.i("you", "数据库更新成功");
    break;
```
===================
```java
public MyDatabaseHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
    super(context, name, factory, version);
    mContext = context;
}
@Override
public void onCreate(SQLiteDatabase sqLiteDatabase) {
    sqLiteDatabase.execSQL(CREATE_TABLE);
    sqLiteDatabase.execSQL(CREATE_CATEGORY);   //这一句是后边加上的没有执行
    Toast.makeText(mContext, "创建数据库成功", Toast.LENGTH_LONG).show();   //Context必须传进来，在这里面调用了
}
@Override
public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {
   sqLiteDatabase.execSQL("drop table if exists book");
   sqLiteDatabase.execSQL("drop table if exists Category");          //必须先删除可能会报错，有点暴力
   onCreate(sqLiteDatabase);        //把这个database传进去了
}
```
由于篇幅太长了，关于SQLite的增，删，改查请看这篇文章[http://blog.liuyufeng.tech/post/2016-09-13-android-database-crud.html](http://blog.liuyufeng.tech/post/2016-09-13-android-database-crud.html)
