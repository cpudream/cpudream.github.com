---
layout: post
title: 技巧之VySor破解
date: 2017-02-26
catalog: true
tag:
    - tools
---
Vysor是一款非常好的Android演示google浏览器插件，但是免费版有各种限制比如分辨率之类的。现总结出破解教程。
1.谷歌地址栏输入 chrome://version/ 打开关于 找到个人资料路径，我的是 C:\Users\administrator\AppData\Local\Google\Chrome\User Data\Default，打开Extensions文件夹，里面一堆长ID文件夹。
2.地址栏输入chrome://extensions/，找到Vysor的ID，去刚才的目录打开相对应的目录。
3.找到uglify.js，打开编辑，搜索_il
4.把_il:Te.a() 替换为 _il:true
5.修改好，完事
