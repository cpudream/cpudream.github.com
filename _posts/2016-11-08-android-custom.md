---
layout: post
title: "Android控件架构与自定义控件详解"
catalog: true 
date: 2016-11-08
tags: 
    - View
    - Android
---
这个话题好像有点大了，Android控件分为两大类ViewGroup和View,整个界面形成了一个控件树，<font color="red">上层控件负责下层控件的测量与绘制，并传递交互事件，这里就涉及到遍历（深度优先）的问题</font>这就是为什么我们写布局的时候尽量不要嵌套的太深了的原因。首先我们简单分析一下android界面的架构推荐看一下源码大体就是每个Activity都有一个Window对象，在Android中Windows由PhoneWindow实现，PhoneWindow将DecorView设置为了根View,DecorView作为顶层视图，里面封装了大量的窗口操作方法。这里面的所有View的监听事件都通过WindowManagerService来接收，并通过Activity对象来回掉相应的onClickListener.[文章代码地址和图片样本](https://github.com/CPUdream/blog_example_demo/tree/master/Histogram)<!--more-->
![](http://of0xqj5p6.bkt.clouddn.com/2016/1108jiemian.png)
### 测量函数
一张图就行了，别瞎盗用，谢谢
![](http://of0xqj5p6.bkt.clouddn.com/2016/1108android_measure.png)
### View的测量
面试中会问到自定义View中经常用到的方法<font color="red">onFinishInflate, onSizeChanged, onMeasure, onLayout, onDrawable, onTouchEvent(当时面试官最想听到这个，但是我懵逼了)</font>，一般是父控件测量子控件，View的测量包括三种模式：<font color="#42b993">EXACTLY</font>,这个是默认的测量模式，当我们将空件的layout_width和layout_height指定成match_parent和具体值时采用这种测量模式，如果我们不写onMeasure方法，在布局文件里写wrap_content然并卵，第二种测量模式<font color="#42b993">AT_MOST</font>这种模式适用于wrap_content,控件的尺寸不能超过父控件的最大尺寸，第三种不常用我也没有用过<font color="#42b993">UNSPECIFIED</font>象scrollView就是这种模式想要多长就多长，测量中经常用到的类MeasureSpec，这个类里封装了好多测量操作比如getMode，getSize。

```java
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
   setMeasuredDimension(getMiniWidth(widthMeasureSpec), getMiniHeight(heightMeasureSpec));
}
private int getMiniWidth(int widthMeasureSpec) {
   int result = 500;
   int mode = MeasureSpec.getMode(widthMeasureSpec);
   int size = MeasureSpec.getSize(widthMeasureSpec);
   if(mode == MeasureSpec.EXACTLY){
      result = size;
   }else if(mode == MeasureSpec.AT_MOST){
      result = Math.max(result, size);
   }
      return result;
}
private int getMiniHeight(int widthMeasureSpec) {
   int result = 500;
   int mode = MeasureSpec.getMode(widthMeasureSpec);
   int size = MeasureSpec.getSize(widthMeasureSpec);
   if(mode == MeasureSpec.EXACTLY){
       result = Math.max(result, size);
   }else if(mode == MeasureSpec.AT_MOST){
       result = Math.max(result, size);
   }
   return result;
 }
```

### View的绘制
我们重写onDraw来对View进行绘制，里面常用到的有canvas, paint，这两个类全属于Android绘图机制里的东西，后面会写一篇文章进行总结，这里简单说一下canvas执行画图的操作把像素全保存到了bitmap里了，bitmap逐个像素显示的图片，存储效率底（bmp）,这里叫画矩形
```java
Paint paint = new Paint();
paint.setColor(Color.RED);
canvas.drawLine(0,490, 490, 490, paint);
canvas.drawLine(0,0, 0, 490, paint);
canvas.drawRect(0, 320, 30, 490, paint);
canvas.drawRect(32, 160, 62, 490, paint);
canvas.restore();
```
### 自定义属性
AndroidStudio中自定义属性是比较简单的直接在values目录下建立attrs.xml（declare-styleable），在代码中可以通过context.obtainStyledAttributes把属性值存储到了TypeArray中然后直接取出来用就可以了
```java
public rectangle(Context context, AttributeSet attrs) {
   super(context, attrs);
   TypedArray ta = context.obtainStyledAttributes(attrs, R.styleable.rectangle);
   mClor = ta.getColor(R.styleable.rectangle_backgroud, Color.RED);
   ta.recycle();   //这个东西记得写。。。
}
```
### ViewGroup自定义
ViewGroup一般不会调用onDrawble的除非在布局文件里设置了backgroud，ViewGroup里重写onDrawble时，会挡住里面放的那些控件比如Button等，好像是画布是白色的原因。父控件测量子控件所以我们进行自定义ViewGroup时一般要重写onMeasure，对子View进行遍历，测出最大的那个值然后进行设置ViewGroup的Size,还要重写onLayout确定子View放在哪个目录下面，下面是我自定义ViewGroup时的部分代码
```java
@Override
protected void onLayout(boolean changed, int l, int t, int r, int b) {
   int count = getChildCount();
   for(int i = 0; i < count; i++){
      View child = getChildAt(i);
      int width = child.getMeasuredWidth();
      int height = child.getMeasuredHeight();
      if(i == 0 || i == 1){
          child.layout(0, 0, xx + width, height);
      }else{
          xx += width;
          child.layout(xx, 0, xx +width, height);
      }
   }
}
 @Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
   //得到父控件给ViewGroup的建议测量模式和测量尺寸
   int fuWidthMode = MeasureSpec.getMode(widthMeasureSpec);
   int fuHeightMode = MeasureSpec.getMode(heightMeasureSpec);
   int fuSize = MeasureSpec.getSize(widthMeasureSpec);
   int fuSizeHight = MeasureSpec.getSize(heightMeasureSpec);
   //测量所有孩子View的尺寸，下面进行遍历的到宽高
   measureChildren(widthMeasureSpec, heightMeasureSpec);
   int childCount = getChildCount();
   for(int i = 0; i < childCount; i++){
       View view =  getChildAt(i);
       hh = view.getMeasuredHeight();
       ww = view.getMeasuredWidth();
       cpar = (MarginLayoutParams) getLayoutParams();
       hhh = Math.max(hh, hhh);
       www = Math.max(ww, www);
    }
 setMeasuredDimension(fuWidthMode == MeasureSpec.EXACTLY ? fuSize : hhh , fuHeightMode == MeasureSpec.EXACTLY ? fuSizeHight : www);
 }
```                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
