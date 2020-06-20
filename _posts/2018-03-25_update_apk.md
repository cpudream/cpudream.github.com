---
layout: post
title: "Android增量更新"
date: 2018-03-25
catalog: true
tags: 
    - NDK
---
## 基础
借增量更新的思路可以处理其它的还有C源代码的精华库，做一个简单的笔记。<font color="red">此笔记包括Windows版和Linux版，两个</font>
文件拆分要在服务端进行，由于C库不是跨平台的，所以我们要说的就是要在不同的平台编译不同的库，

1. 首先把vs中的严格检查取消掉，因为有时不是错误也报红，很烦人。不过visualstudio默认是取消掉的。操作步骤是属性->c/c++下面的常规->SDL检查选择成否
2. 去官网下载bsdiff和bzip2的源代码,文件合并的时候依赖于bzip2,但是服务端开发不需要下载bzip2
3. 把bsdiff源代码复制到vs工程里面，当然只复制.c,.cpp,.h文件，其它文件没有必要复制，切记把dispatch文件删除了，因为服务端只拆分不合并，，然后把复制进来的c/c++代码添加到现有向里
4. 运行C代码检查错误，常见的错误类型例出来 <!--more-->

- 调用了不安全的函数，只需要添加`#define _CRT_SECURE_NO_WARNINGS`，如果多个文件都有不安全函数那么可以右建属性工程 c/c++ -> 命令行添加`-D _CRT_SECURE_NO_WARNINGS`
- 同理调用了过期的函数,只需要添加`#define _CRT_NONSTDC_NO_DEPRECATE`,或者在上面的命令里添加`-D _CRT_NONSTDC_NO_DEPRECATE`

5. 仔细阅读源代码，修改bsdiff.cpp源文件（main）,看看需要传递什么参数几个参数了，如果之道了，那开始编写JNI
6. 编写JNI，生成头文件，在bsdiff.cpp里面实现那个刚才的头文件，在里面去调用main函数
7. 然后生成动态库dll，复制到Java工程里面，生成DLL动态库，属性里面选择`配置属性`下的常规，里面有个选项，当然还要设置成64位的了

## Linux文件拆分
本来下面的代码可以直接在AndroidStudio下进行的，但是我们开发是为了给后台用，所以，还是在Linux上进行吧。
1. Linux上的bsdiff好像依赖于bzip,所以把bsdiff和bzip这两个文件的C代码复制到一个文件下，还是按照上面的步骤生成.h,并在bsdiff里面添加代码。
<font color="red">【注意】</font>一个工程只能有一个main函数，所以要看bsdiff和bzip两个里面是不是全有main,先不用关注后面报错的时候再改,main可以随便改
2. <font color="red">复制Linux下的jni.h</font>这个是必须要做的，或者在NDK目录下找jni.h的头文件，不需要复制<font color="red">jni_md.h</font>因为Android也是基于Linux的
3. 把代码上传到Linux,进入目录执行GCC  `gcc -fPIC -shared blocksort.c decompress.c bsdiff.c randtable.c bzip2.c huffman.c compress.c bzlib.c crctable.c`
4. 编译的时候发现找不见bzlib.h，去bsdiff.c里面把bzlib.h的尖括号变成双引号，
5. 这个时候会生成.so文件。放在web工程的工程目录下面，可以在工程中打包成jar包去调用 `java -jar `
6. 结果找不见动态库，这个要修改代码加载指定代码的so库， 也就是System.loadLibray那个函数


<font color="red">【注意】：</font>在导入一个源文件时老是找不到源文件，有可能就是编码的问题，有的老外喜欢用Linux系统，所以我们要把所有的全变成utf-8无BOM格式
