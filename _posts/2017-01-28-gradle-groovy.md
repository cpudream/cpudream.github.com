---
layout: post
title: "Android gradle教程"
catalog: true
date: 2017-01-28
tags: 
    - gradle
---
Android应用的构建过程是一个非常复杂的过程，涉及很多工具，首先，所有的资源文件都被编译且在一个R文件中引用；其次，编译Java代码并通过dex工具转换成dalvik字节码，最后这些文件被打包成一个APK文件，这些步骤如果由人工去完成那就非常繁琐，所以推出了构建工具。

| 语言 | 构建工具 | 书写语言 | 默认执行文件 |
| :------: | :------: | :------: | :------: |
| C++ | make | Shell | makefile |
| Java | ant   |    XML  |  build.xml |
| Android  |  gradle | groovy | build.gradle |

Gradle的书写语言是一种基于Groovy的领域专用语言（DSL）, Groovy是一种基于JVM虚拟机的语言， Groovy语言非常易读，学起来非常简单。<!-- more -->

Gradle中最重要的两个概念是**项目**和**任务**，每一次构建都必须包含一个项目（每个build.gradle文件代表一个项目），每个项目里面包含一个或多个任务，而任务里面要包含了好多动作，这个动作有点类似Java的方法， 不管是上面提到项目，还是任务，在构建的过程中都会以实例或者对像的形式存在。学这些东西可以类比Java知识学习。

**Gradle构建阶段生命周期**

1. 初始化： 项目实例化在该阶段。如果一个项目有多个模块（build.gradle）,那么就会创建多个实例
2. 配置： 构建脚本会执行，并为每个项目实例创建和配置任务
3. 执行： gradle决定哪个任务被执行

** 配置文件**

每一个基于Gradle构建的项目必须还有build.gradle，它里面必须还有下面**配置元素**

```java
buildscript {
    repositories {
        google()      //这个仓库放上面使速度变快，本地仓库
        jcenter()     //整个项目的依赖仓库， 
    }
    dependencies {
        //配置构建过程中的依赖包，
        classpath 'com.android.tools.build:gradle:3.0.0'
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

**插件**：是一种预定义好的属性和任务。可以理解为在哪个文件下执行哪个文件

1. Android插件： 定义编译Android代码的规则, 比如文件java文件位置等等，Android插件除了实现了基础插件的约定还定义了，connectedCheck, deviceCheck等**右侧有个gradle可以看所有的任务**
2. 依赖插件：定义好的依赖库相关的规则
3. Android插件实现了Java插件，Java插件与用了基础插件，基础插件定义了一些约定
```
apply plugin: 'com.android.application'  //Android插件
apply plugin : 'com.android.library'  //依赖库插件
```

**源集** Gradle提供了源集的概念，它们会被一起执行和编译，比如main, res, androidTest就是常见的源集[官方配置文档](https://developer.android.com/studio/build/build-variants?hl=zh-cn)

```groovy
sourceSets{
    main{
        manifest.srcFile 'AndroidManifest.xml'
        java.srcDirs = ['src/java']
        res.srcDirs = ['src/res']
    }
    //androidTest.setRoot   可以看看上面的文档
}
```

**Gradle Wrapper**  Gradle版本一直更新，新版本可能不会向后兼容，当你运行wrapper的时候会自动下载需要的gradle版本并运行build.gradle等一系列任务。
**gradle-wrapper.properties** 可以决定哪一个版本的Gradle, AndroidStudio提示更新Gradle就是跟据这里的信息决定的

**settings.gradle** 多模块一定存在的文件，settings文件在初始化阶段执行，告诉Gradle哪些模块需要被构建

```groovy
include ':app'
```

### 顶层构建文件

1. 项目构建配置在buildscript
2. dependencies代码块用于配置构建过程中的依赖包，不能把应用或依赖项目所需的包在顶层构建中
3. allprojects用于声明那些被用在所有模块的属性，最终被运用到所有模块

```
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://jitpack.io' }
    }
}
```

### 模块构建文件

1. 引入Android插件或者依赖库插件 顶层中已经配置了依赖
2. android代码块：包含了android特有的全部配置， 在Android插件里全定义好了
3. Android代码块里必须包含compileSdkVersion, buildToolsVersion新版AndroidStudio里面没有了
3. defaultConfig配置应用的核心属性， AndroidManifest.xml里的

```
defaultConfig {
    applicationId "com.bonc.ioc.ycleaderdesk.ycldzm"
    minSdkVersion 21
    targetSdkVersion 26
    versionCode 1
    versionName "1.0"
    testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
}
```
5. 依赖包：是Gradle配置的一部分，所以放在android外面

**【总结】** ： AndroidStudio通过Project Struct来修改整个gradle文件

### BuildConfig

构建工具会生成一个BuildConfig的类，包含：按照构建类型设置值的DEBUG常量

```
buildTypes {
    release {
       buildConfigField("String", "API_URL", "\"http://www.google.com\"")
       resValue("string", "app_name", "release")
    }
    debug{
        buildConfigField("String", "API_URL", "http://www.baidu.com")
        resValue("string", "app_name", "Debug")
    }
}
```

### 额外属性

定义额外属性（静态构建）有三种方法

1. ext代码块

```
ext {
    compileSdkVersion = 22
    buildToolVersion = "22.0.1"
}
//使用方法
compileSdkVersion rootProject.ext.compileSdkVersion
```

2. gradle.properties文件

```
//在.properties文件下定义属性
test = "helloworld"
//其它task里面可以直接
println test
```

3 -P命令行参数，（写命令的时候带过去的cmd）

### Gradle常见命令

查看Android项目用到的所有任务
```
gradlew tasks
```
+ assemble： 输出：包括assembleDebug和assembleRelease
+ clean: 清除编译中间特
+ check: 检查包括单元测试和集成测试
+ build 运行assemble和check等

### 依赖

Gradle支持三种不同的依赖： Maven, lvy和静态文件夹。
**Gradle也有本地缓冲一个特定版本的依赖只会在你的机器上下载一次**
1.  远程仓库
一个依赖由三种元素定义的：group, name和version
```groovy
implementation group: 'com.google.code.gson', name: 'gson', version: "2.0"
implementation 'com.google.code.gson:gson:2.4'
```

2. 本地仓库：通过SDK Manager安装上去的，新建的项目默认有个Android Support Library依赖就是在本地仓库里

```
C:\Users\LiuYufeng\AppData\Local\Android\sdk\extras\android\m2repository
C:\Users\LiuYufeng\AppData\Local\Android\sdk\extras\m2repository
```
3. 文件夹依赖仓库
这个是作为依赖仓库不是在dependices下面的， 告诉gradle，编译中依赖的jar包存储在指定的目录  

```
repositories {
  flatDir{
    dirs 'arrs'
  }
}

//告诉gradle依赖指定名字，指定结尾的依赖
compile(name: 'libraryname', ext: 'aar')
```

4. 文件依赖

```
//libs文件夹依赖
compile fileTree('libs')
//特定jar包依赖
compile fileTree('libs/gosn.jar')
//文件夹下过滤其它文件只依赖jar
compile fileTree(dir: 'libs', include:['*.jar'])
```

5. 依赖项目

```
//创建依赖项目
apply plugin: 'com.android.library'
//声明依赖项目
include ':app', ':library'
//最后在使用到的模块中使用
compile project(':library')
```
在构建依赖项目的时候会在output/aar/文件夹下生成.aar文件

### 创建构建Variant

Variant引入：当开发一个应用时，通常有几个不同的版本，最常见的情况是：开发版本，测试版本，生产版本，这些版本通常有不同的配置比如测试API和生产API URL不同， 除此之外假如APP有免费版和付费版，那就会出现4种情况：付费测试版，付费生产版，免费测试版，免费生产版，这4种版本的不同配置让项目变得十分复杂

#### Variant的组成

构建类型和product flavor的结合结果称之为构建Variant.
+ 构建类型：debug和release， AndroidStudio新生成的项目都会生成这两种构建类型
+ product flavor 不同定制的产品，这个让管理多个应用成为了可能

**总感觉构建类型和product flavor是相同的二者全可以定制不同的配置**怎么区分呢，如果这个版本要发到应用市场那请用product flavor，否则可以用构建类型

#### 构建类型

1. applicationID ： 不同的构建类型可以设置不同的applicationID，applicationID是用来区别不同的APK的，packageName是用来找R文件里面的资源
2. 无用资源是否需要移除

```java
buildTypes {
    release {
        minifyEnabled false   //是否启用混淆
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

自定义构建类型

```java
buildTypes{
    staging.initWith(buildTypes.debug)  //这句加上表示在原有构建类型的基础上重写属性
    staging {
        applicationIdSuffix ".staging"  //在原来的基础上追加
        versionNameSuffix "-staging"
    }
}
```

当创建一个新的构建类型时gralde会自动创建一个新的源集，该源集目录名称和构建类型名称一致，但是目录不是自动创建的， 目录结构如下：
![](https://i.loli.net/2018/07/29/5b5d5eaaad2a0.jpg)
**除了Values下的文件都会覆盖构建源集下的内容** 比如Manifest文件你吃需要写出差异的内容就行没必要完全copy

**Product flavor与构建类型类似也有以上特性比如源集等**
![](https://i.loli.net/2018/07/29/5b5d61e6118db.jpg)

#### Variant过滤

在根目录下写下下面的代码

```java
android.variantFilter { variant ->
    if(variant.buildType.name.equals('release')) {
        variant.getFlavors().each() { flavor ->
            if(flavor.name.equals('blue')) {
                variant.setIgnore(true);
            }
        }
    }
}
```

### gradle快速构建
添加下面代码比如开启后台线程，调整JVM内存大小， 多线程，使用缓冲等
```
org.gradle.daemon=true
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
org.gradle.parallel=true
org.gradle.configureondemand=true
org.gradle.caching=true
```
上面的Variant包的过滤

### groovy入门
```
println 'hello， world!'
```
+ 没有Sytem.out命名空间
+ 方法周围没有括号
+ 一行末尾没有分号

1. 变量与字符串
def: 相当于局部变量
ext: 相当于全局变量

```
def name = 'toString'    //单引号
def greet = "Hello $name"  //双引号可以引入变量
//花括号可以调用方法
def name_size = "you name is ${name.size()} characters long" 
new Date().'$name'()   //动态调用方法
```

2. 方法
不指定返回类弄，必须加def，最后一句不用写return,默认返回的是最后一句
```
def square(def num){
    num * num    //不需要return ,建议写上
 }
 //匿名代码块Closures,可以接受参数和返回值
 def square = { num ->
     num * num
 }
 
 Closures square = {
     it * it     //groovy会自动添加一个参数it
 }
```

3. 类
和Java的一样，只不过不用写public还是private，修饰符默认已经设置了，也不用给属性设置get和set方法



4. 集合
一般说到集合肯定就是List和Map了
```
List list = [1, 3, 3, 4]
list.each() { element->
    println element
} // 会返回集合中的每个对象
//closures
list.each(){
    println it
}
//map集合
Map pizzaPrices = [margherita:10, pepperoni:12]
//取值的方式
pizzaPrices.get('margherita')
pizzaPrices['margherita']
pizzaPrices.margherita
```

### Gradle中的Groovy

简单写一下Gradle关于groovy的简写

```
apply plugin: 'com.android.application'
等价于
Project.apply( [plugin: 'com.android.application'])
```

dependnce
```
ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss待添加
```

### 任务入门


```
//do First和do Last
task hello {
//执行任务之前就执行了，配置阶段
    println '配置'
    
    doLast {
        println 'doLast'
    
    }
    doFirst {
        println 'Hello'
    }
}
```


### 实战记录
 重命名包名
```
applicationVariants.all { variant ->
    variant.outputs.all {
        outputFileName = "bonc-android-${variant.versionName}-${variant.productFlavors[0].name}.apk".toLowerCase()
    }
}
```
读取签名
```
// config/gradle.properties
Properties localProperties = new Properties()
localProperties.load(project.rootProject.file('config/gradle.properties').newDataInputStream())

Map rootProperties = project.getProperties();

def storeFileStr = localProperties.getProperty('RELEASE_STORE_FILE',
        rootProperties.get('RELEASE_STORE_FILE', null))
def storePwdStr = localProperties.getProperty('RELEASE_STORE_PASSWORD',
        rootProperties.get('RELEASE_STORE_PASSWORD', null))
def keyAliasStr = localProperties.getProperty('RELEASE_KEY_ALIAS',
        rootProperties.get('RELEASE_KEY_ALIAS', null))
def keyPwdStr = localProperties.getProperty('RELEASE_KEY_PASSWORD',
        rootProperties.get('RELEASE_KEY_PASSWORD', null))

def debugCompileUrl = localProperties.getProperty('DEBUG_COMPILE_URL',
        rootProperties.get('DEBUG_COMPILE_URL', null))
def debugCompile = localProperties.getProperty('DEBUG_COMPILE',
        rootProperties.get('DEBUG_COMPILE', null))

android.buildTypes.all { buildType ->
    localProperties.any { property ->
        if (property.key.equals("VIOLET_PASSCODE")) {
            buildType.buildConfigField "String", property.key, "\"${property.value}\""
        }
        if (property.key.equals("AES_KEY")) {
            buildType.buildConfigField "String", property.key, "\"${property.value}\""
        }
        if (property.key.equals("AES_IV")) {
            buildType.buildConfigField "String", property.key, "\"${property.value}\""
        }
    }
}
ext {
    propertyHaveSigningConfigs = (storeFileStr != null && storePwdStr != null && keyAliasStr != null && keyPwdStr != null)
    propertyStoreFileStr = storeFileStr
    propertyStorePwdStr = storePwdStr
    propertyKeyAliasStr = keyAliasStr
    propertyKeyPwdStr = keyPwdStr

    propertyHaveDebugCompile = (debugCompileUrl != null && debugCompile != null)
    propertyDebugCompileUrl = debugCompileUrl
    propertyDebugCompile = debugCompile
}
```
签名文件设置, 下面代码必须要在buildTypes上面要不找不见
```
signingConfigs {
    if (propertyHaveSigningConfigs) {
        debug {
            storeFile file(propertyStoreFileStr)
            storePassword propertyStorePwdStr
            keyAlias propertyKeyAliasStr
            keyPassword propertyKeyPwdStr
        }

        release {
            storeFile file(propertyStoreFileStr)
            storePassword propertyStorePwdStr
            keyAlias propertyKeyAliasStr
            keyPassword propertyKeyPwdStr
        }
    }
}
```

### 插件



### 参考
[Gradle官方API](https://docs.gradle.org/current/dsl/)
[gradle下载](https://gradle.org/gradle-download/) 
[深入理解Android（一）：Gradle详解](http://www.infoq.com/cn/articles/android-in-depth-gradle)
[使用Gradle管理你的Android Studio工程](http://www.flysnow.org/2015/03/30/manage-your-android-project-with-gradle.html)








