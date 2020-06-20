---
layout: post
title: "BaseActivity"
catalog: true 
date: 2016-09-04
tags: 
    - Activity
---

这篇文章是结合自己的工作与《第一行代码》中郭林大神总结的Activity的用法技巧总结出来的，第一是知晓当前是哪一个活动通过得到类名实现，第二是随时随地退出程序
```java
public class BaseActivity extends Activity {
    private static final String TAG = "BaseActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, getClass().getSimpleName());     //得到当前类名
        ActivityCollector.addActivity(this);        //注意这句
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        ActivityCollector.removeActivity(this);
    }
}
```
<!--more-->
```java
public class ActivityCollector {
    public static List<Activity> activities = new ArrayList<Activity>();
    public static void addActivity(Activity pActivity) {   //增加Activity
        activities.add(pActivity);
    }
    public static void removeActivity(Activity pActivity) {  //移出当前Activity
        activities.remove(pActivity);
    }
    public static void finishAll() {     //移除全部Activity
        for (Activity activity : activities) {
            if (!activity.isFinishing()) {
                activities.remove(activity);
            }
        }
    }
}
```
#### 启动活动的最佳写法
往进去传参数的问题解决了，自己要多多写写自己的情况
```java
public class SecondActivity extends BaseActivity{
    private static final String TAG = "SecondActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent i = getIntent();
        Log.i(TAG, i.getStringExtra("param1"));
    }
    public static void actionStart(Context pContext, String pData1, String pData2){
        Intent i = new Intent(pContext, SecondActivity.class);
        i.putExtra("param1", pData1);   //要传的参数1
        i.putExtra("param2", pData2);   //要传的参数2
        pContext.startActivity(i);
    }
}
```

