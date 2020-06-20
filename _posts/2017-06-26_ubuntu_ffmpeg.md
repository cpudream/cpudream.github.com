---
layout: post
title: "Ubuntu下编译FFmpeg so库"
catalog: true
date: 2017-06-26
tags: 
    -  FFmpeg
---
前两天一直在搞流媒体服务器，一直搞CentOS，Ubuntu,但是一直无法编译成功Android需要的so库，现总结如下：
首先介绍一下ffmpeg里面各模块的功能把：
FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。它包括了领先的音/视频编解码库libavcodec等。
libavformat：用于各种音视频封装格式的生成和解析，包括获取解码所需信息以生成解码上下文结构和读取
音视频帧等功能；音视频的格式解析协议，为libavcodec分析码流提供独立的音频或视频码流源。
libavcodec：用于各种类型声音/图像编解码；该库是音视频编解码核心，实现了市面上可见的绝大部分解码器的功能，libavcodec库被其他各大解码器ffdshow,MPlayer等所包含或应用。
libavdevice：硬件采集、加速、显示。操作计算机中常用的音视频捕获或输出设备；
libavfilter：filter音视频滤波器的开发，如宽高比、剪裁、格式化、非格式化、伸缩。
libavutil：包含一些公共的工具函数的使用库，包括算数运算、字符操作。
libavresample：音视频封装编解码格式预设等。
libswscale：（原始视频格式转换）用于视频场景比例缩放、色彩映射转换；图像颜色空间或格式转换。
libswresample：原始音频格式转码
libpostproc：（同步、时间计算的简单算法）用于后期效果处理；音视频应用的后期处理，如图像的去块效应。
ffmpeg：该项目提供一个工具，可用于格式转换、解码或电视卡即时编码等；
ffsever：一个HTTP多媒体即时广播串流服务器。
ffplay：是一个简单的播放器，使用ffmpeg库解析和解码，通过SDL显示。 <!--more-->
<font color=red>===================</font>华丽的分割线<font color=red>===================</font>
环境： Ubuntu，ndk
整体流程是 build_android.sh调用configure生成makefile，然后通过make生成so文件，build_android是自己写的脚本，里面有相关配置，再写脚本之前我们要下载ndk,然后配置环境变量，如下：
1. 在普通用户下执行 sudo vim ~/.bashrc ,然后输入密码
2. 在打开的文本里添加如下代码
```
#我的NDK目录是/opt/android-sdk-linux/ndk-bundle，替换成你的就好了
export NDKROOT=/usr/ndk/android-ndk-r10e
export PATH=$NDKROOT:$PATH
```
3. 保存文件在命令行里输入source .bashrc来更新你的环境变量
4. 输入ndk-bundl -version来测试是否配置成功

### 下载 FFmpeg与初始化
1. 去官网下载FFmpeg源码 官网[https://ffmpeg.org](https://ffmpeg.org);
2. 用命令解压缩，注意tar.gz虽然可以windows也可以解压，但是非常不推荐，解压命令tar -zxvf 文件名
3. 用命令进入你解压好的ffmpeg里，然后，vim build_android.sh，写入如下代码<font color=red>NDK换成自己的,下面的\前面必须有空格，下一行不能有空格</font>编译连必须是9
```shell
#!/bin/bash
make clean
export NDK=/usr/ndk/android-ndk-r10e
export SYSROOT=$NDK/platforms/android-9/arch-arm/
export TOOLCHAIN=$NDK/toolchains/arm-linux-androideabi-4.8/prebuilt/linux-x86_64
export CPU=arm
export PREFIX=$(pwd)/android/$CPU
export ADDI_CFLAGS="-marm"

./configure --target-os=linux \
--prefix=$PREFIX --arch=arm \
--disable-doc \
--enable-shared \
--disable-static \
--disable-yasm \
--disable-symver \
--enable-gpl \
--disable-ffmpeg \
--disable-ffplay \
--disable-ffprobe \
--disable-ffserver \
--disable-doc \
--disable-symver \
--cross-prefix=$TOOLCHAIN/bin/arm-linux-androideabi- \
--enable-cross-compile \
--sysroot=$SYSROOT \
--extra-cflags="-Os -fpic $ADDI_CFLAGS" \
--extra-ldflags="$ADDI_LDFLAGS" \
$ADDITIONAL_CONFIGURE_FLAG
make clean
make
make install
```
4. 由于Android要求所有的so库必须以lib开头，所以我们要修改configure文件的如下代码
```
#注释的部分
#SLIBNAME_WITH_MAJOR='$(SLIBNAME).$(LIBMAJOR)'
#LIB_INSTALL_EXTRA_CMD='$$(RANLIB) "$(LIBDIR)/$(LIBNAME)"'
#SLIB_INSTALL_NAME='$(SLIBNAME_WITH_VERSION)'
#SLIB_INSTALL_LINKS='$(SLIBNAME_WITH_MAJOR) $(SLIBNAME)'

#自己写的部分
SLIBNAME_WITH_MAJOR='$(SLIBPREF)$(FULLNAME)-$(LIBMAJOR)$(SLIBSUF)'
LIB_INSTALL_EXTRA_CMD='$$(RANLIB)"$(LIBDIR)/$(LIBNAME)"'
SLIB_INSTALL_NAME='$(SLIBNAME_WITH_MAJOR)'
SLIB_INSTALL_LINKS='$(SLIBNAME)'
```
5. 给那个build_android.sh赋予执行权限，命令如下 chmod +777 build_android.sh
6. 直接运行./build_android.sh

等个十几分钟就好了，就生成so库了，就这么简单
