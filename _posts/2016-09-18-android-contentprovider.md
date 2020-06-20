---
layout: post
title: "Android ContentProvider教程总结学习"
catalog: true 
date: 2016-09-18
tags: 
    - ContentProvider
    - Android
---

好久没有看书了，每天总是找各种借口不看，真的不能堕落呀，今天总结一下内容提供者，这个我一般不怎么用。Android进程之间交流我知道的只有广播和内容提供者了，SharedPreferences提供的MODE_WORLD_READABLE和MODE_WORLD_WRITEABLE在Android4.2之后就被废弃了。不同于文件存储和SharedPreferences存储中的两种全局可读写操作模式，内容提供器可以选择只对一部分数据进行共享，从来保证我们的程序中的隐私数据不会泄漏，ContentResolver中的增删改查方法都不接收表名参数，因为不同应用的表名可能相同，所以接收应用名称和表的组合，起了一个好听的名字叫Uri，Uri由两个元素组成权限（authority）和路径（Path), authority就是一个包名，Path就是一个表名比如：tech.liuyufeng.ContentProvider/table1,为了标明这个URI内容URI所以在前面加一个content://，相当于一种协议。uri.parse还要加那个协议名。其实,内容接收者是常用到的也是最简单的。和SQLite操作是一个类型的，<font color="red">所有的全是与列名有关系的不与具体的值有关系，不加约束就会查出所有列（where）</font><!--more-->
```Java
   ContentValues values = new ContentValues();
   values.put("column1", "");        //这里指定的就是列名
   getContentResolver().update(uri,values,"column1 = ? and column2 = ?", new String[]{"text", "2"});
```

### 获取手机联系人
关于通讯录联系人的读取感觉这篇文章比较受用[点击访问](http://uule.iteye.com/blog/1709227)，ContatsContract.CommonDataKinds.Phone是Uri.parse得到的结果，只不过是进行了封装。记得加读取联系人的权限
```java
List<String> list = new ArrayList<String>();
int i = 0;
Cursor cursor = null;     //经常忘记关闭
try {
    //下面的大写字母看那个链接
    cursor = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
    while(cursor.moveToNext){
        String name = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
        String phone = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
        list.add(i, name + phone);
        i++;
    }
}catch (Exception e){
    e.printStackTrace();
}finally {
    if(cursor != null){
        cursor.close();
    }
}
```
### 自己的内容提供者
继承ContentProvider有六个抽象方法需要重写,有已下注意点通常会在onCreate()里完成对数据库的创建和升级等操作。返回true表示内容初始化成功，返回false失败，注意当存在ContentResolver尝试访问我们的程序时，内容提供器才会被初始化。getType方法是所有内容提供器都必须提供的一个方法，用于获取Uri对象所对应的MIME类型。一个内容URI所对应的MIME字符串主要由三部分组成。Android对这三部分做了如下的规定：
1. 必须以vnd开头
2. 如果内容URI以路径结尾，则后接android.cursor.dir/,如果内容以id结尾，则后接android.cursor.item/.
3. 最后接上vnd.<authority>.<path>
例如：vnd.android.cursor.dir/vnd.com.example.app.provider.table1

### 内容URI
内容URI的格式主要有以上两种，以路径结尾就表示期望访问表中所有的数据。以id结尾就表示访问该中拥有相应id的数据。我们可以使用通配符的方式来分别匹配这两种格式的URI,规则如下。
1. *: 表示匹配任意长度的任意字符
2. #：表示匹配任意长度的数字
所以，一个能够匹配任意表的内容URI格式就可以写成：
content://com.example.app.provider/*
而一个能够匹配table1表中任意一行数据的内容URI格式就可以写成：(为什么不是任意列了)
content://com.example.app.provider/table1/#
下面的代码有点长是一个自定义Provider，自定义Provider在注册时要注意加android:exported="true"否则报安全错误
```java
public class DatabaseProvider extends ContentProvider{
    //记得注册一下哈
    private MyDatabaseHelper helper = null;
    private static UriMatcher mUriMatcher = null;
    public static final int BOOK_DIR = 0;
    public static final int BOOK_ITEM = 1;
    public static final String AUTHORITY = "tech.liuyufeng.blog.databasedemo.provider";
    static{
        mUriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        mUriMatcher.addURI(AUTHORITY, "book", BOOK_DIR);
        mUriMatcher.addURI(AUTHORITY, "book/#", BOOK_ITEM);
    }
    @Override
    public boolean onCreate() {
        helper = new MyDatabaseHelper(getContext(), "book.db", null, 2);
        return true;
    }
    @Override
    public Cursor query(Uri uri, String[] strings, String s, String[] strings1, String s1) {
        SQLiteDatabase db = helper.getReadableDatabase();
        Cursor cursor= null;
        switch (mUriMatcher.match(uri)){
            case BOOK_DIR:
                cursor = db.query("book", strings, s, strings1,null, null,s1);   //这个用上面的参数
                break;
            case BOOK_ITEM:
                String bookId = uri.getPathSegments().get(1);  //0.是得到book, 1.是得到#，
                cursor = db.query("book", strings, "id = ?", new String[]{bookId}, null, null, s1);
                break;
        }
        return cursor;
    }
    @Override
    public String getType(Uri uri) {
        switch (mUriMatcher.match(uri)){
            case BOOK_DIR: //这两个的最后全一样，就是前面不一样
                return "vnd.android.cursor.dir/vnd.tech.liuyufeng.blog.databasedemo.provider.book";
            case BOOK_ITEM:
                return "vnd.android.cursor.item/vnd.tech.liuyufeng.blog.databasedemo.provider.book";
        }
        return null;
    }
    @Override
    public Uri insert(Uri uri, ContentValues contentValues) {
        SQLiteDatabase db = helper.getWritableDatabase();
        Uri returnUri = null;
        switch (mUriMatcher.match(uri)){
            //只有这个时才会合并
            case BOOK_DIR:
            case BOOK_ITEM:
                long newBookId = db.insert("book", null, contentValues);  //返回的是行号
                returnUri = Uri.parse("content://" + AUTHORITY + "/book/" + newBookId);
                break;
        }
        return returnUri;
    }
    @Override
    public int delete(Uri uri, String s, String[] strings) {
        SQLiteDatabase db = helper.getWritableDatabase();
        int deleteNum = 0;
        switch (mUriMatcher.match(uri)){
            case BOOK_DIR:
                deleteNum = db.delete("book", s, strings);
                break;
            case BOOK_ITEM:
                String bookId = uri.getPathSegments().get(1);
                deleteNum = db.delete("book", "id = ?", new String[]{bookId} );
                break;
        }
        return deleteNum;
    }
    @Override
    public int update(Uri uri, ContentValues contentValues, String s, String[] strings) {
        SQLiteDatabase db = helper.getWritableDatabase();
        int updateNum = 0;
        switch (mUriMatcher.match(uri)){
            case BOOK_DIR:
                updateNum = db.update("book", contentValues, s, strings);
                break;
            case BOOK_ITEM:
                String updateBookId = uri.getPathSegments().get(1);
                updateNum = db.update("book", contentValues, "id = ?", new String[]{updateBookId});
                break;
        }
        return updateNum;
    }
}    
```
