---
layout: post
title: "AndroidStudio CMake开发FFmpeg"
catalog: true
date: 2017-06-27
tags: 
    - NDK
---
在AndroidStudio中采用CMake开发So库，有好多注意事项，此处以FFmpeg音频库为例，首先说一下MakeFile的升级，CMakeLists.txt,这个文件一般放在各个module的跟目录，此处注意区分module与project目录，因为CMakeList.txt里面有几个预编译的变量，CMAKE_SOURCE_DIR, PROJECT_SOURCE_DIR,全是相对于module目录的，我当时以为相当于project目录搞了半天。AndroidStudio中CMake有以下几个常用的函数
1. cmake_minimum_required(VERSION 3.4.1)     //设置cmake的最小版本，一般系统自动生成
2. set(path_cpp H:/BONC/JNITest/app/src/main/cpp)    //定义变量 path_cpp的值为H:/BONC/JNITest/app/src/main/cpp)
3. include_directories(${path_cpp}/include)      //配置头文件的包含路径
4. add_library( native-lib   SHARED IMPORTED)   //添加一个库，第三个参数可以是c文件的位置
5. set_target_properties(..., .., ..)           //给刚才的库添加必要的属性参数， 第二个参数一般是PROPERTIES IMPORTED_LOCATION
6. target_link_libraries( native-lib  ${log-lib} avutil swresample avcodec avformat )   //链接所用库文件
进入正题<!--more-->

首先把编译好的so库和头文件放在目录libs， 或者cpp目录里面， 我这里放入cpp目录下，我的工程结构如下,此处注意我编译好的so库是arm平台的所以把编译好的so库放在armeabi-v7a
![](http://of0xqj5p6.bkt.clouddn.com/2017/0627ndk.jpg)
然后配置app下gradle文件, 关键点我进行注释与说明，<font color=red>强调:</font>添加ndk, 添加sourceSets

```java
android {
    compileSdkVersion 25
    buildToolsVersion "25.0.3"
    defaultConfig {
        applicationId "tech.liuyufeng.jnitest"
        minSdkVersion 15
        targetSdkVersion 25
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
        externalNativeBuild {
            cmake {
                cppFlags ""
            }
        }
        //这个必须写，跟据自己的库的类型可以选择不同的类型，可以是多个类型的，不同的类型cpu的指令不一样
        /**ndk {
           // 设置支持的 SO 库构架，注意这里要根据你的实际情况来设置
           abiFilters 'armeabi'// 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64', 'mips', 'mips64'
        }**/
        ndk {
            abiFilters  'armeabi-v7a'
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    //这里必须写，下面的
    sourceSets.main {
        jniLibs.srcDirs = ['src/main/cpp']
        jni.srcDirs = []
    }
    externalNativeBuild {
        cmake {
            path "CMakeLists.txt"
        }
    }
}
```

如果上面弄的不对会报下面的错误找不见so库等，上两张图
![](http://of0xqj5p6.bkt.clouddn.com/2017/0627so.png)
![](http://of0xqj5p6.bkt.clouddn.com/2017/0627erro.jpg)
