---
layout: post
title: "Android Fragment教程总结"
catalog: true
date: 2016-09-05
tags:
    - Fragment
    - Android
---

Fragment是什么就没有必要说了，但是要强调Fragment是Android3.0（11）后引入的如果要在2点几的Android设备上用那必需导入v4包。fragment在布局里面首字母是小写的有一次把他搞成大写的怎么也搞不出提示来<font color="red">[注意]:</font>现在的APP技持的是API17以上的所以没必要考虑直接导入android.app.Fragment就可以了。4.0系统的平板模拟器好像存在bug。<font color="red">[强调]</font>如果fragment调用了replace()方法那，这个fragment的生命周期是onPause(),onStop和onDestoryView(),如果没有调用addToBackStack(),此时的fragment还要进入销毁状态，onDestroy()和onDetach()方法也会得到执行。当返回的时候会执行onActivityCreated(),onStart(),onResumed()。onCreated()和onCreateView()没有被执行，因为视图被移出了但没有销毁<!--more-->。
Fragment的生命周期与Activity是息息相关假如Activity处于暂停状态Fragment也处于暂停状态的先上一张图
<img src="http://of0xqj5p6.bkt.clouddn.com/2016/0904fragment_lifecycle.jpg"/>

### 生命周期描述
1. onAttach()当碎片和活动建立关联的时候调用
2. onCreateView()为碎片创建视图时调用
3. onActivityCreated()确保与碎片相关的活动一定已经创建完毕的时候调用
4. onDestroyView()当与碎片关联的视图被移除的时候调用，remove方法也算
5. onDetach()当碎片与活动解除关联的时候调用

###  静态加载碎片
静态加载布局很简单但是有些还是要注意了，这里在代码里标明了。但是强调写name的时候要把包名加上
```java
public class LeftFragment extends Fragment{
	//inflater参数和false
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.frg_left,container,false);
        return view;
       // return super.onCreateView(inflater, container, savedInstanceState);  // 注意一下==============
    }
}
```
![img](/images/2016/0905staticfrag.png)
### 动态加载碎片
动态加载碎片也很简单一般我们用FrameLayout把位置占好，然后用fragment替换就好了。但是这样的话按Back直接就退出了我们可以填加addToBackStack()。模拟Activity的返回栈。返回上一个Fragment。
```java
public void nihao(View view){
    LeftFragment fragment = new LeftFragment();       //fragment对象
    FragmentManager manager = getFragmentManager();
    FragmentTransaction transaction = manager.beginTransaction();    //开启事务
    transaction.replace(R.id.fl,fragment,"lf_frag");   //第一个参数是FramLayout,第三个参数是标记方便查找
    //manager.findFragmentByTag("lf_frag");  //注意
    transaction.addToBackStack(null);  //用事务的方法加入栈中，参数用于描述栈的状态，一般传入null
    transaction.commit();
}
```
### 碎片与活动之间通信
碎片与活动之间通信比较简单，在活动中得到碎片的方法是getFragmentManager().findFragmentById(R.id.right_fragment);然后调用碎片中的方法。从而得到碎片中的数据。在碎片中调用活动中的方法通过（MainActivity）getActivity();<font color="red">碎片与碎片之间通信复杂一点</font>在一个fragment中得到activity（activity里面写一些属性和set,get方法属性用来保存数据）然后第二个activity通过get得到值。
google也提供了另外一种方法通过setArguments();要给哪个Fragment里面传递数据直接得到他的实例通过事务设置arguments就可以了。
```java
InvoiceInfoFrag invoiceInfoFrag = new InvoiceInfoFrag();
FragmentManager manager = getFragmentManager();
FragmentTransaction transaction = manager.beginTransaction();
Bundle bundle = new Bundle();
bundle.putString("tax_type", "45");
bundle.putString("code", code);
bundle.putString("number", num);
invoiceInfoFrag.setArguments(bundle);   //传入参数
transaction.replace(R.id.act_public_item_main_fragment, invoiceInfoFrag).addToBackStack(null);
transaction.commit();
```
