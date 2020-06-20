---
layout: post
title: "Android UI拾遗"
catalog: true 
date: 2016-08-31
tags: 
    - UI
    - Android
---

<font color="red">UI小常识</font>DroidDraw也是一款androidUI可视化编辑器可用来拖拽，与AndroidStudio的Design一个样。不推荐使用。invisiable把图片隐藏了但还占着位置，经常和gone搞混。推荐看看TextView的常用属性给个农民伯伯翻译的[TextView属性大全](http://www.cnblogs.com/over140/archive/2010/08/27/1809745.html)链接。其他的控件大部分继承于TextView。margin，gravity是所有控件都公用的属性，但是Layout_gravity不是哪里都能用的下面会提到。Android五大布局需要注意的是FrameLayout中文是帧布局，经常不会写那个字，AbsoluteLayout绝对布局在android2.3的时候就被废了。TableLayout以前不怎么用，今天就用一下咯。首先还是总结一下LinearLayout与RelativeLayout的属性大全，经常把他们两个的属性搞混<!--more-->。

#### LinearLayout属性
android:orientation  
android:layout_gravity[相对于父控件的位置，与RelativeLayout相对与父控件是一个效果]
android:layout_weight(规范写法设置成0，这个属性与orientation相对应)

#### RelativeLayout
//在父类的哪里
android:layout_centerHrizontal="true"//水平剧中
android:layout_centerInParent="true"
android:layout_alignParentLeft="true"
android:layout_alignParentBotton="true"
android:layout_alignParentRight="true"
//相对于控件进行定位
android:layout_above="@id/button2"
android:layout_below="@id/button2"
android:layout_toRightOf="@id/button2"
android:layout_toLeftOf="@id/button2"
//另一租
android:layout_alignLeft=""一个控件的左边缘与另一个控件的左边缘对其
android:layout_alignRight=""
android:layout_alignTop=""
android:layout_alignBottom=""

#### ImageView
src属性设置的是内容，按图片大小展示不进行拉伸，background设置的是图像的背景。
现在来说说scaleType控制图片大小放到ImageView里
fitXY不按比例缩放完全适应ImageView（把整个View塞满）,可能变形,
fitStart,fitCenter,fitEnd按纵横比例缩放，最长的那个边与ImageView相同把它放在（左上，居中，右下）
center：保持原图的大小，显示在ImageView的中心，大的直接干掉
centerCrop:按照比例缩放，直到完全覆盖ImageView
centerInside:按照比例缩放,使得ImageView能够完全显示图片
matrix:从左上角开始填充多了直接干掉

#### progressBar
<font color="red">xml布局设置style，没有android:style这个玩意，并且引用系统风格要写成？android:attr/progressBarStyleHorizontal。</font> ?号表示引用当前主题的属性值,<font color="red">style以后要总结呀</font>一般设置成水平的要设置max的值，还有这么一个玩意@android:style/Widget.ProgressBar.Horizontal

#### Dialog
AlertDialog.Builder得到的是AlertDialog实例，所以我们要看一下源码
ProgressDialog和AlertDialog类似只是他不借助Builder了直接new就可以了


