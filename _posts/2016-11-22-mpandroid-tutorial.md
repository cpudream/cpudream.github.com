---
layout: post
title: "Android统计图表实现教程以及常见问题"
catalog: true
date: 2016-11-22
tags: 
    - MPAndroid
---

在Android端实现图表有两种方式一种是通过Android端自定义View来实现，另一种借助服务端Html5实现图表，Adnroid端直接网络请求显示图表即可。H5实现的图表不好适配（Android屏幕尺寸实在太多）比如出现大量留白等，不流畅（毕竟网络还不是很快）导致用户体验不好。为了直观看两张实现好的截图就好了（涉及公司机密，只截取部分）。第一张是H5实现的字体那么丑，左右面空白那么多，还那么丑（真是个看脸的时代啊！！！！）。怂了一会H5,进入正题<!-- more -->
![](http://of0xqj5p6.bkt.clouddn.com/2016/1203chart.jpg) 
我用的是Philipp Jahoda大神的[MPAndroid](https://github.com/PhilJay/MPAndroidChart)第三方库(到目前为止有53人维护过代码，3889fork，在几年内很少有图表类库能超越他)。先说一下我现在无法解决的问题，我记得我试成功一次但是忘记了，如果有人知道请留下答案谢谢，第一PieChart中当某项数据非常大时会把其他颜色挤掉，第二在BarChart、LineChart中一直放大x轴或y轴时，那个x轴的值一直在重复我不想让他重复，关于这个问题google结果[点击查看](https://github.com/danielgindi/Charts/issues/315)<font color=red>解决了哦2017.1.6，mBarX.setGranularity(1f); // only intervals of 1 day</font>
英文文档写的非常不错我只不过终结一下常用的。
### 前面的话
每个图表类都有一个Entry类，这个类表示一个条目（BarEntry,LineEntry...）.每个图表还有一个DataSet类，这个类包可以说是包含样式和数据的类，我们可以通过这个类设置图表中样式颜色等比如高亮等setColors（）。通过这个类也可以分组，也可以给图表分组比如说几个数据是红色，几个图表是蓝色。
### 常用类
这个类库太大所以把常用的类库先总结出来，方便下一步学习，这里初略开一下有点映像即可
1. 图表类（可以结合连接看看图片长什么样子了[点击查看图片](https://github.com/PhilJay/MPAndroidChart#chart-types)）
  LineChart（折线图）, BarChart（柱状图）, PieChart（饼形图），ScatterChart（散布图）, RadarChart（蜘蛛网图），CandleStickChart, BubbleChart（气泡图）
2. 轴
 X轴对应类XAxis ，Y轴对应YAxis， 他们两的父类是AxisBase，这个轴线由几部分组成 <font color="#42b983">axis-line, grid-line, LimitLines</font>轴线常用的方法有
 + setTextColor(int color) : 设置轴标签的颜色。
 + setTextSize(float size) : 设置轴标签的文字大小。
 + setTypeface(Typeface tf) : 设置轴标签的 Typeface。
 + setGridColor(int color) : 设置该轴的网格线颜色。
 + setGridLineWidth(float width) : 设置该轴网格线的宽度。
 + setAxisLineColor(int color) : 设置轴线的轴的颜色。
 + setAxisLineWidth(float width) : 设置该轴轴行的宽度。
 
<font color="red">下面以折线图为例讲解，其他的图型也类似只不过是换个类名而已</font>
   

### 配置——引用类库
1. 在你项目的build.gradle添加下面代码
```java
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
    }
}
```
2. 在app的build.gradle下添加下面代码
```java
dependencies {
    compile 'com.github.PhilJay:MPAndroidChart:v3.0.1'
}
```

### xml中应用图表
```java
<!--折线图,其他图直接替换就可以了-->
<com.github.mikephil.charting.charts.LineChart
   android:id="@+id/line_chart"
   android:layout_width="match_parent"
   android:layout_height="300dp"/>
```
<font color="red">然后直接通过findViewById就可以得到他的实例</font>

### 图表常用方法
只要一般图标具有的属性这个类库都具有相应的方法，下面列举一些常用的方法：
 * setNoDataTextDescription(String desc) : 设置当 chart 为空时显示的描述文字。
 * setMaxVisibleValueCount(int count) : 设置最大可见绘制的 chart count 的数量。 只在 setDrawValues() 设置为 true 时有效。
 * setVisibleXRangeMaximum(int);设置x轴最大的可见值 ，Y轴也同理了
 
### X轴、Y轴
通过chart.getXAxis()，chart.getYAxis()就可以得到轴线，得到轴线之后就可以设置显示轴线的方向，在上面显示还是下面显示等，可以设置轴线中values的方向setLabelRotationAngle()[旋转多少个角度]，最常用的就是自定义轴值，默认是一堆数，通过setValueFormatter()自定义，里面还有一个参数，是个接口当然我们直接实现就好了。
### Legend
我用到的是隐藏这个鬼玩意：首先得到这个 Legend legend = chart.getLegend();然后调用legend.setEnabled(false) : 来隐藏他
当然还可以移动Legend的显示位置，自定义图标等等全是set开头的函数你只需要看看就懂了，一般用不到
### MarkerView
根据英文可以看出应该是一个标记之类的东西，当我们点击条目时弹出一个值就是通过他来显示的我感觉官方给的Demo写的很好，具体就是写一个类extends MarkerView然后完成里面的方法，用的时候看看官方文档更好。
### annimation动画
MPAndroid把动画给封装好了，故我们只要chart.animateXY(int xDuration, int yDuration),好像还有回弹动画，这个我没有试，英语不老好的人
<font color="red">建议</font>还是看英文资料比较好，这是我第一次看这个英文资料，看完之后，更加坚信我学习英文的动力，加油吧
