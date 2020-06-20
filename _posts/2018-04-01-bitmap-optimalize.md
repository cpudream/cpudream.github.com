---
layout:       post
title:        "Android Bitmap高效加载与压缩优化"
date:         2018-04-01 12:00:00
catalog:      true
tags:
    - bitmap
---

Bitmap不是Android特有的，是计算机图形学中的概念，位图，他的主要作用就是把图片转换成像素信息加载到内存中，我们可以操作这些像素信息来得到到我们想要的效果。
1. Bitmap是Android系统中的图像处理的最重要类之一
2. 通过Bitmap我们可以获取图片的信息，比如宽度上的像素值，高度上的像素值，alpha值等
3. 获取到信息后，可以对其进行缩放，裁剪等操作。

【总结】：Bitmap为我们提供了对图像文件的操作支持，就像File类为我们提供了对本地文件的操作一样

## Bitmap加载方式

Bitmap跟据来源的不同，有以下几种加载方式

```Java
BitmapFactory.decodeByteArray();
BitmapFactory.decodeFile();
BitmapFactory.decodeResource();
BitmapFactory.decodeStream();
```

## Bitmap高效加载方式

Bitmap高效加载的好处 防止内存溢出, 尽可能节省内存开销,使我们的应用跑的更加流畅
Bitmap加载的思路，通过BitmapFactory.Options实现, 具体步骤如下：
+ 设置`inJustDecodeBounds = true`只加载边框，此时调整图的深度小一点
+ 通过options的outWidth / outHeight得到图片原始宽高，
+ 最后通过要显示的宽高和原始宽高设置`inSampleSize`(也就是采样率)

【总结】：BitmapFactory.Options的常用重要属性:

```Java
inJustDecodeBounds     //是否只加载边框
inPreferredConfig      //位图的深度
outWidth / outHeight   //得到宽高
inSampleSize           //设置采样率
```

**代码实现**

```Java
public static Bitmap ratio( String filePath, int pixellW, int piexlH){
    BitmapFactory.Options newOptions = new BitmapFactory.Options();
    newOptions.inJustDecodeBounds = true;
    newOptions.inPreferredConfig = Bitmap.Config.RGB_565; //位图的深度
    BitmapFactory.decodeFile(filePath, newOptions);
    int originalW = newOptions.outWidth;
    int originalH = newOptions.outHeight;
    newOptions.inSampleSize = getSimpleSize(originalW, originalH, pixellW, piexlH);
    newOptions.inJustDecodeBounds = false;
    return BitmapFactory.decodeFile(filePath, newOptions);
}

private static int getSimpleSize(int originalW, int originalH, int pixellW, int piexlH) {
	int simpaleSize = 1;
	if(originalW > originalH && originalW > pixellW){
    simpaleSize = originalW / pixellW;
    }else if(originalH > originalW && originalH > piexlH){
    	simpaleSize = originalH / piexlH;
    }
	if(simpaleSize <= 0){
		simpaleSize = 1;
	}
     return simpaleSize;
}
```

## Bitmap压缩

4种压缩方式： 质量压缩， 尺寸压缩， 采样率压缩， 终极压缩

### 1. 质量压缩

只会改变图片硬盘中的大小并不会改变内存大小，也就是并不改变真实像素，同过通化来实现
`高效加载后压缩,调用上面的方法`

1. 代码实现

```Java
//这个方法一般是将图片压缩保存到本地或者上传到服务器=============
public static void compress(Bitmap bmp, File file){
     int quilt = 50;
     ByteArrayOutputStream bas = new ByteArrayOutputStream();
     bmp.compress(Bitmap.CompressFormat.JPEG, quilt, bas);
     try {
         FileOutputStream fos = new FileOutputStream(file);
         fos.write(bas.toByteArray());
         fos.flush();
         fos.close();
     } catch (FileNotFoundException e) {
         e.printStackTrace();
     } catch (IOException e) {
        e.printStackTrace();
     }
}
```

### 2. 尺寸压缩

尺寸压缩是真正意义上的压缩尺寸，最常用场景的是缩略图

1. 代码实现

```Java
public static void compressToFile(Bitmap bmp, File file){
   //压缩尺寸的大小，值越大，尺寸越小
   int radio = 1;
   //ARGB_8888是一个像素站了4个byte
   Bitmap bitmap = Bitmap.createBitmap(bmp.getWidth()/radio,bmp.getHeight()/radio,Bitmap.Config.ARGB_8888);
   Canvas canvas = new Canvas(bitmap);
   RectF rectF = new RectF(0, 0, bitmap.getWidth()/radio, bitmap.getHeight()/radio);
   canvas.drawBitmap(bitmap, null,  rectF, null);
   ByteArrayOutputStream bos = new ByteArrayOutputStream();
   bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
   FileOutputStream fos = null;
   try {
      fos = new FileOutputStream(file);
       fos.write(bos.toByteArray());
       fos.flush();
        fos.close();
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
   }
}
```

### 3. 采样率压缩

采样率压缩和上面一样，通过修改inSampleSize的值来实现

```Java
public static void compressBitmap(String pathfile, File file){
   BitmapFactory.Options options = new BitmapFactory.Options();
   options.inJustDecodeBounds = false; //只画边框下面得到的bitmpap是空的
   options.inSampleSize = 2; //值越大，那个像素越少
   Bitmap bitmap = BitmapFactory.decodeFile(pathfile, options);
   ByteArrayOutputStream bos = new ByteArrayOutputStream();
   bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
   try {
       FileOutputStream outputStream = new FileOutputStream(file);
       outputStream.write(bos.toByteArray());
       outputStream.flush();
       outputStream.close();
    } catch (FileNotFoundException e) {
         e.printStackTrace();
    } catch (IOException e) {
         e.printStackTrace();
    }
}
```

### 4. 终极压缩

**引入**
PC图片处理引擎是JEPG引擎，移动端是Skia，谷歌把skia引擎算法改了，采用定长编码，相同质量图片处理后变大，但是解码算法没变，还是用的哈夫曼算法。为什么呢？举个小例子

1. 一个像素包括alpha, green, red, blue，这几种可以有好多种组合（8*4 = 24），假如我们能组合成5种结果，a,b,c,d,e 那么我们要用定长编码的时候就会，这样搞，因为一种
```Bash
a. 001,
b. 010
c. 011,
d. 100。这种就是定长编码的最优了， 所以占3位，
```
2. 实际开发中我们可能有好多种组合,有的组合就没有出现，加权编码
```Bash
a:80%
b:10%
c: 10%
e: 0% e就没有出现过，那么你按上面的定长编码是不是就显的浪费了，
哈夫曼编码：需要去扫描整个信息(图片信息--每一个像素包括ARGB)，要大量计算，很吃CPU。
```

我们绕过Android Bitmap API层，来修复哈夫曼算法
**实现**
1. 下载JPEG引擎使用的库—libjpeg库http://www.ijg.org/ ， Linux编译libjpeg.so文件
2. 高版本的ndk上编译可能会出错，只需要按照提示删除没有必要的依赖库。然后ndk-build后面跟一些参数（百度一下编译时没有记下来）
3. 导入需要的头文件，没必要全导入，可以根据Android.mk，LOCAL_SRC_FILES里面的进行导入

**编写Android.mk,写错CLEAR_VARS可能会去build中间产物里面找lib库，报找不见错误**

**C++代码思路**
1. android的bitmap解码，并转换成RGB数据
2. JPEG对象分配空间以及初始化
3. 获取文件信息
4. 为压缩设置参数，比如图像大小，类型，颜色空间
5. 开始压缩, 结束压缩, 释放资源

得到一个像素中的a的值可以右移24位，因为argb总共是占了4个字节，所以我们把其它三个移出去就得到了a的值

**Android.mk代码**

```Bash
LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)
LOCAL_MODULE := jpegbither
LOCAL_SRC_FILES := ${APP_ABI}/libjpeg.so
include $(PREBUILT_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := testjni
LOCAL_SRC_FILES := jpegtest.cpp
LOCAL_SHARED_LIBRARIES := jpegbither
LOCAL_LDLIBS := -ljnigraphics -llog
include $(BUILD_SHARED_LIBRARY)
```

**gradle.build**

```Java
//这个代码必须在那个defaultConfig里面
externalNativeBuild{
   ndkBuild{
      arguments "NDK_APPLICATION_MK:=src/main/jni/Application.mk"
      abiFilters "armeabi-v7a", "armeabi", "x86"
   }
}
sourceSets {
	main {
		jni.srcDirs = [] // 禁止as自己生成mk
	}
}
externalNativeBuild {
   ndkBuild {
     path 'src/main/jni/Android.mk'
   }
}
```

**C++代码实现**

```C++
#include "bitherlibjni.h"
#include <string.h>
#include <android/bitmap.h>
#include <android/log.h>
#include <stdio.h>
#include <setjmp.h>
#include <math.h>
#include <stdint.h>
#include <time.h>

//统一编译方式
extern "C" {
#include "jpeg/jpeglib.h"
#include "jpeg/cdjpeg.h"		/* Common decls for cjpeg/djpeg applications */
#include "jpeg/jversion.h"		/* for version message */
#include "jpeg/android/config.h"
}


#define LOG_TAG "jni"
#define LOGW(...)  __android_log_write(ANDROID_LOG_WARN,LOG_TAG,__VA_ARGS__)
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO,LOG_TAG,__VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR,LOG_TAG,__VA_ARGS__)

#define true 1
#define false 0

typedef uint8_t BYTE;

char *error;
struct my_error_mgr {
  struct jpeg_error_mgr pub;
  jmp_buf setjmp_buffer;
};

typedef struct my_error_mgr * my_error_ptr;

METHODDEF(void)
my_error_exit (j_common_ptr cinfo)
{
  my_error_ptr myerr = (my_error_ptr) cinfo->err;
  (*cinfo->err->output_message) (cinfo);
  error=(char*)myerr->pub.jpeg_message_table[myerr->pub.msg_code];
  LOGE("jpeg_message_table[%d]:%s", myerr->pub.msg_code,myerr->pub.jpeg_message_table[myerr->pub.msg_code]);
 // LOGE("addon_message_table:%s", myerr->pub.addon_message_table);
//  LOGE("SIZEOF:%d",myerr->pub.msg_parm.i[0]);
//  LOGE("sizeof:%d",myerr->pub.msg_parm.i[1]);
  longjmp(myerr->setjmp_buffer, 1);
}

int generateJPEG(BYTE* data, int w, int h, int quality,
		const char* outfilename, jboolean optimize) {

    //jpeg的结构体，保存的比如宽、高、位深、图片格式等信息，相当于java的类
    struct jpeg_compress_struct jcs;

    //当读完整个文件的时候就会回调my_error_exit这个退出方法。setjmp是一个系统级函数，是一个回调。
    struct my_error_mgr jem;
    jcs.err = jpeg_std_error(&jem.pub);
    jem.pub.error_exit = my_error_exit;
    if (setjmp(jem.setjmp_buffer)) {
        return 0;
    }

    //初始化jsc结构体
    jpeg_create_compress(&jcs);
    //打开输出文件 wb:可写byte
    FILE* f = fopen(outfilename, "wb");
    if (f == NULL) {
        return 0;
    }
    
    //设置结构体的文件路径
    jpeg_stdio_dest(&jcs, f);
    jcs.image_width = w;//设置宽高
    jcs.image_height = h;
//  if (optimize) {
//      LOGI("optimize==ture");
//  } else {
//	LOGI("optimize==false");
//  }

    //看源码注释，设置哈夫曼编码：/* TRUE=arithmetic coding, FALSE=Huffman */
    jcs.arith_code = false;
    int nComponent = 3;
    /* 颜色的组成 rgb，三个 # of color components in input image */
    jcs.input_components = nComponent;
    //设置结构体的颜色空间为rgb
    jcs.in_color_space = JCS_RGB;
//  if (nComponent == 1)
//	jcs.in_color_space = JCS_GRAYSCALE;
//  else
//	jcs.in_color_space = JCS_RGB;

	//全部设置默认参数/* Default parameter setup for compression */
	jpeg_set_defaults(&jcs);
	//是否采用哈弗曼表数据计算 品质相差5-10倍
	jcs.optimize_coding = optimize;
	//设置质量
	jpeg_set_quality(&jcs, quality, true);
	//开始压缩，(是否写入全部像素)
	jpeg_start_compress(&jcs, TRUE);

	JSAMPROW row_pointer[1];
	int row_stride;
	//一行的rgb数量
	row_stride = jcs.image_width * nComponent;
	//一行一行遍历
	while (jcs.next_scanline < jcs.image_height) {
		//得到一行的首地址
		row_pointer[0] = &data[jcs.next_scanline * row_stride];

		//此方法会将jcs.next_scanline加1
		jpeg_write_scanlines(&jcs, row_pointer, 1);//row_pointer就是一行的首地址，1：写入的行数
	}
	jpeg_finish_compress(&jcs);//结束
	jpeg_destroy_compress(&jcs);//销毁 回收内存
	fclose(f);//关闭文件

	return 1;
}

/**
 * byte数组转C的字符串
 */
char* jstrinTostring(JNIEnv* env, jbyteArray barr) {
	char* rtn = NULL;
	jsize alen = env->GetArrayLength( barr);
	jbyte* ba = env->GetByteArrayElements( barr, 0);
	if (alen > 0) {
		rtn = (char*) malloc(alen + 1);
		memcpy(rtn, ba, alen);
		rtn[alen] = 0;
	}
	env->ReleaseByteArrayElements( barr, ba, 0);
	return rtn;
}

jstring Java_net_bither_util_NativeUtil_compressBitmap(JNIEnv* env,
		jclass thiz, jobject bitmapcolor, int w, int h, int quality,
		jbyteArray fileNameStr, jboolean optimize) {
	BYTE *pixelscolor;
	//1.将bitmap里面的所有像素信息读取出来,并转换成RGB数据,保存到二维byte数组里面
	//处理bitmap图形信息方法1 锁定画布
	AndroidBitmap_lockPixels(env,bitmapcolor,(void**)&pixelscolor);

	//2.解析每一个像素点里面的rgb值(去掉alpha值)，保存到一维数组data里面
	BYTE *data;
	BYTE r,g,b;
	data = (BYTE*)malloc(w*h*3);//每一个像素都有三个信息RGB
	BYTE *tmpdata;
	tmpdata = data;//临时保存data的首地址
	int i=0,j=0;
	int color;
	for (i = 0; i < h; ++i) {
	    for (j = 0; j < w; ++j) {
	        //解决掉alpha
		//获取二维数组的每一个像素信息(四个部分a/r/g/b)的首地址
		color = *((int *)pixelscolor);//通过地址取值
		//0~255：
//		a = ((color & 0xFF000000) >> 24);
		r = ((color & 0x00FF0000) >> 16);
		g = ((color & 0x0000FF00) >> 8);
		b = ((color & 0x000000FF));
		//改值！！！----保存到data数据里面
		*data = b;
		*(data+1) = g;
		*(data+2) = r;
		data = data + 3;
		//一个像素包括argb四个值，每+4就是取下一个像素点
		pixelscolor += 4;
	    }
	}
	//处理bitmap图形信息方法2 解锁
	AndroidBitmap_unlockPixels(env,bitmapcolor);
	char* fileName = jstrinTostring(env,fileNameStr);
	//调用libjpeg核心方法实现压缩
	int resultCode = generateJPEG(tmpdata,w,h,quality,fileName,optimize);
	if(resultCode ==0){
		jstring result = env->NewStringUTF("-1");
		return result;
	}
	return env->NewStringUTF("1");
}
```

## 面试总结

### 1. 基础

1. 色位图： 单色位图，256色位图等，表示一个像素总共有多少种颜色
2. 位位图： 8位位图，24位位图，表示一个像表点了8位有2^8次种颜色
3. 现代计算机全支持24位(真彩图)和32位位图，所以才会出现`#FFFFFF`
4. RGB565 表示R占5位， G占6位，B占5位， 此时不能用`#FFFFFF`代码形式了，只能用`0x0011`等定义调色板

【总结】：一个像素点占内存多少是由位深度决定， ARGB不一定是32位的，只有在位深度为32位才成立

### 2. 计算 1080 * 920分辨率 256色位图所占的内存

1. 256色位图，位图深度为2^8
2. 占内存 = 1080 * 920 * 8

### 3. 怎么计算采样率

用代码表示如下
```Java
if(width>reqWidth || height>reqHeight) //原始的宽比目标宽大，或者原始高比目标高大
{
    int widthRadio=Math.round(width *1.0f/reqWidth);
    int heightRadio = Math.round(height * 1.0f / reqHeight);
    inSampleSize = Math.max(widthRadio, heightRadio);
}
```

1. 要求宽大于目标宽，或者要求高大于目标高，采样设置成1
2. 采样率越大缩放越严重，Android系统建议向下取整

如果宽的采样率是2，高的采样率是3，会出现如下情况
1. 采样率设置成3，图片会拉申
2. 采样率设置成2，仍然适合ImageView

### 参考

[颜色模式中8位,16位,24位,32位色彩是什么意思?会有什么区别?计算机颜色格式（ 8位 16位 24位 32位色）](https://www.cnblogs.com/1175429393wljblog/p/5404626.html)

[RGB565，RGB8888等相关](https://blog.csdn.net/u012917700/article/details/50233989)

[解释颜色深度概念：8 bit、16 bit、32 bit的意思](https://blog.csdn.net/panshun888/article/details/78278104)
