---
layout: post
title: "Android NDK开发 音视频基础及FFmpeg"
catalog: true 
date: 2018-04-11
tags: 
    - Android
---

### 基础

1. 常见的视频格式比如FLV, MP4, AVI...这些全是封装格式，
2. 封装格式经过解封装之后得到音频压缩数据和视频压缩数据，
3. 平常我们录像的过程就是一个压缩的过程或者说是编码的过程，
4. 播放软件播放的过程是一个解封装解码播放的过程，视频解码得到视频像素数据
5. 视频像素数据YUV(y代表亮度，UV代表色度)Y和UV好像是分开存储的
6. 电视采用YUV这样当黑白的话我们可以只播放Y那一个就行
7. 专门的工具播放YUV视频，比如YUV Player Deluxe
8. YUV存储比例4：1是根据生物学人眼对亮度比较敏感得到的（只有色盲，只听说过亮盲）
7. 音频解码得到的就是一个音频采样数据PCM，PCM可以用Adobe Audition播放，刚开始进去要设置采样率和声道，声音采样率就是单位时间内震动次数的记录，44100就是人耳能听见的最大震动<!-- more -->

### 信息查看工具

1. [MediaInfo](https://mediaarea.net/en/MediaInfo/Download/Windows)视频信息查看工具，官网https://mediaarea.net/en/MediaInfo/Download/Windows
2. 安装好之后先打开该软件，会进行一些初始化设置（添加到右键菜单）
3. 右键视频——>MediaInfo，菜单查看——>文本，就可以看到视频的宽高，码率等等
![](http://140.143.64.135:18410/uploads/article/20180417/5ad5b74a81c0a.png)

### 封装格式

1. FLV这里必须说一下，是Adobe公司出的 IE浏览器默认嵌套了Flash, Flash里面支持FLV播放，FLV也是Adobe公司的
2. FLV 包含头文件，数据由是由大小不固定的Tag构成的，有可能是音频，视频交替出现的，所以有的播放器不支持FLV键盘快进
3. MPEG2-TS格式还有MP4里面是数据大小人TS Packet构成的，不包括头文件

### 压缩数据及算法

1. H.264 数据由大小不固定的NALU构成的（nalu可以理解成数据结构），１个NALU存储的是１帧压缩后的数据，那为什么压缩后的大小不一样呢，因为压缩算法构成的，可以将图像压缩１００被, H.264压缩算法比较复杂，比如帧内检测，环路检测，比如新闻联播主持人的衣服，不变，那我们主城一个环，里面就不要保存了帧间检测，比如几帧之间就主持人的嘴动了我们就只保存动的部分
2. 音频编码有AAC,数据由大小不固定额package组成，压缩10倍以上， PCM存储方式如果是双声道那么就是左右，左右的来存储，如果单声道就是顺序存储

**上面这些算法压缩方式FFMpeg全集成了，有些算法没有集成**

### FFMPEG

FFMPEG目前来说是最好的音视频处理类库（http://ffmpeg.org）, 不要下载最新的版本，可以先试一下windows版本，Download——>builds，**一般我们不用2.8以上的版本，因为差别太大了**

1. Shell切换到satic/windows/ffmpeg.exe里面敲命令:比如mp4转avi**可以百度需要的命令，比如ffmpeg视频转gif **, 这个就是微视频里面刚开始有一个动图没声音，点击图片然后在从网上下载图片，**得到的gif几十M，那我们就要通过对gif进行解析压缩**
2. `ffmpeg -i input.mp4 -b:v640k -s 640x360 output.mp4`我们可以降低码率和视屏尺寸大小来减小大小

### ffplay

ffplay就是一个播放器所以我们要根据这个做播放器，里面包括了播放暂停，播放出来的全是同步好的，还可以快进等等，`ffplay input.mp4`

### vs_2012中运行FFMPEG

1. 建立空工程,下载下ffmpeg static , dev, shared的库把里面的 include , lib ，动态库复制到项目源代码目录不是跟目录
2. 配置头文件提示在C/C++ -> 附加包含目录，把include的目录复制进去
3. 配置lib目录，在连接器->附加库目录，把lib目录复制进去
4. 继续配置lib,在连接器->输入->附加依赖项里添加
```
avformat.lib
avutil.lib
avdevice.lib
avfilter.lib
postproc.lib
swresample.lib
swscale.lib
```
5. 新建源文件必须c++，因为有可能ffmpeg里面有c++代码部分代码
```c
extern
{
#include "libavcodec\avcodec.h"
}

void main(){
	avcodec_configuration();
}
```
6. 64位运行配置（FFmpeg依赖系统指令）
7. 用的ffmpeg是`ffmpeg-2.6.9` shell脚本最好是本地修改好呀，给执行权限<font color="red">utf-8无BOM编码格式，否则在Linux上即使复制进去也不会有的</font>
8. `apt-get install dos2unix`windows格式转unix,, `dos2unix build_android.sh`
9. [vim常用命令总结 （转)](http://www.cnblogs.com/yangjig/p/6014198.html)

10. chown -R /usr/liuyufeng ubuntu
11. 安装posix文档  man apt-get install manpages-posix-dev


##### 环境变量配置

export PATH:=/....:$PATH

上面如果安装时出现依赖关系必须输入命令

```shell
sudo apt-get -f install
```

##### Android源码

```shell
    sudo apt-get install vim ctags cscope
```
