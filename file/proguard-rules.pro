#指定压缩级别
-optimizationpasses 5
#不跳过非公共的库的类成员
-dontskipnonpubliclibraryclassmembers
#混淆时采用的算法
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*
#把混淆类中的方法名也混淆了
-useuniqueclassmembernames
#优化时允许访问并修改有修饰符的类和类的成员
-allowaccessmodification
#将文件来源重命名为“SourceFile”字符串
-renamesourcefileattribute SourceFile
#保留行号
-keepattributes SourceFile,LineNumberTable
#保持泛型
-keepattributes Signature
#保持所有实现 Serializable 接口的类成员
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}
#===============指定混淆字典===========================
-obfuscationdictionary dictionary-test.txt
-classobfuscationdictionary dictionary-test.txt
-packageobfuscationdictionary dictionary-test.txt
#===============指定混淆字典===========================
#-repackageclasses com.bonc.ioc.checkin.debug
#Fragment不需要再AndroidManifest.xml中注册，需要额外保护下
-keep public class * extends android.support.v4.app.Fragment
-keep public class * extends android.app.Fragment
#保持测试相关的代码
-dontnote junit.framework.**
-dontnote junit.runner.**
-dontwarn android.test.**
-dontwarn android.support.test.**
-dontwarn org.junit.**
-ignorewarning

#整个包下的类都保持
-keep public class com.bonc.ioc.wisdomlq.api.bean.* { *; }
-keep public class com.bonc.ioc.wisdomlq.assembly.cameraselectphoto.bean.*{ *;}
-keep  class Decoder.**{ *;}
-keep  class com.tencent.**{ *;}
-keep  class com.alibaba.idst.nls.**{ *;}
-keep  class com.alibaba.fastjson.parser.deserializer.*{*;}

-keepattributes Signature
-dontwarn com.alibaba.fastjson.**
-keep class com.alibaba.fastjson.**{*;}
-keepclassmembers class * implements java.io.Serializable { *; }
#-libraryjars libs/sun.misc.BASE64Decoder.jar
#-libraryjars libs/tbs_sdk_thirdapp_v3.1.0.1034_43100_sharewithdownload_obfs_20170301_182143.jar

#----------- rxjava rxandroid----------------
-dontwarn sun.misc.**
-keepclassmembers class rx.internal.util.unsafe.*ArrayQueue*Field* {
    long producerIndex;
    long consumerIndex;
}
-keepclassmembers class rx.internal.util.unsafe.BaseLinkedQueueProducerNodeRef {
    rx.internal.util.atomic.LinkedQueueNode producerNode;
}
-keepclassmembers class rx.internal.util.unsafe.BaseLinkedQueueConsumerNodeRef {
    rx.internal.util.atomic.LinkedQueueNode consumerNode;
}
-dontnote rx.internal.util.PlatformDependent

#----------- gson ----------------
-keep class com.google.gson.** {*;}
-keep class com.google.**{*;}
-keep class sun.misc.Unsafe { *; }
-keep class com.google.gson.stream.** { *; }
-keep class com.google.gson.examples.android.model.** { *; }
-keep class com.qiancheng.carsmangersystem.**{*;}

#----------retrofit--------------
#-keepclassmembernames,allowobfuscation interface * {
#    @retrofit2.http.* <methods>;
#}
#-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
#

-keep class retrofit2.** { *; }
-dontwarn retrofit2.**
-keepattributes Signature
-keepattributes Exceptions
-dontwarn okio.**
-dontwarn javax.annotation.**

#-------------- okhttp3 -------------
-dontwarn com.squareup.okhttp.**
-keep class com.squareup.okhttp.{*;}
#retrofit
-dontwarn retrofit.**
-keep class retrofit.** { *; }
-keepattributes Signature
-keepattributes Exceptions
-dontwarn okio.**

# ---------------- gilde ----------------
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.resource.bitmap.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

#----- 极光推送 --------
-dontoptimize
-dontpreverify

-dontwarn cn.jpush.**
-keep class cn.jpush.** { *; }
-keep class * extends cn.jpush.android.helpers.JPushMessageReceiver { *; }

-dontwarn cn.jiguang.**
-keep class cn.jiguang.** { *; }

#--------高德地图--------

#3D 地图
-keep class com.amap.api.mapcore.**{*;}
-keep class com.amap.api.maps.**{*;}
-keep class com.autonavi.amap.mapcore.*{*;}
#定位
-keep class com.amap.api.location.**{*;}
-keep class com.loc.**{*;}
-keep class com.amap.api.fence.**{*;}
-keep class com.autonavi.aps.amapapi.model.**{*;}
# 搜索
-keep class com.amap.api.services.**{*;}
# 2D地图
-keep class com.amap.api.maps2d.**{*;}
-keep class com.amap.api.mapcore2d.**{*;}
# 导航
-keep class com.amap.api.navi.**{*;}
-keep class com.autonavi.**{*;}

#语音

-keep class com.iflytek.cloud.**{*;}

-keep class com.iflytek.msc.**{*;}

-keep interface com.iflytek.**{*;}

#------------- support.v7 -----------------
-keep public class android.support.v7.widget.** { *; }
-keep public class android.support.v7.internal.widget.** { *; }
-keep public class android.support.v7.internal.view.menu.** { *; }

-keep public class * extends android.support.v4.view.ActionProvider {
    public <init>(android.content.Context);
}

#--------- ijkplayer ---------------------
-keep class tv.danmaku.ijk.media.player.** {*;}
-keep class tv.danmaku.ijk.media.player.IjkMediaPlayer{*;}
-keep class tv.danmaku.ijk.media.player.ffmpeg.FFmpegApi{*;}

#------------------  下方是共性的排除项目         ----------------
# 方法名中含有“JNI”字符的，认定是Java Native Interface方法，自动排除
# 方法名中含有“JRI”字符的，认定是Java Reflection Interface方法，自动排除

-keepclasseswithmembers class * {
    ... *JNI*(...);
}

-keepclasseswithmembernames class * {
	... *JRI*(...);
}

-keep class **JNI* {*;}

#------------------  下方是android平台自带的排除项，这里不要动         ----------------

-keep public class * extends android.app.Activity{
	public <fields>;
	public <methods>;
}
-keep public class * extends android.app.Application{
	public <fields>;
    public <methods>;
}
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
-keep public class * extends android.app.backup.BackupAgentHelper
-keep public class * extends android.preference.Preference

-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

-keepclasseswithmembers class * {
	public <init>(android.content.Context, android.util.AttributeSet);
}

-keepclasseswithmembers class * {
	public <init>(android.content.Context, android.util.AttributeSet, int);
}

-keepattributes *Annotation*

-keepclasseswithmembernames class *{
	native <methods>;
}

-keep class * implements android.os.Parcelable {
  public static final android.os.Parcelable$Creator *;
}

# Addidional for x5.sdk classes for apps
#加dontwarn这句是为了解决打包出错Warning:com.tencent.smtt.export.external.DexLoader: can't find referenced class dalvik.system.VMStack
-dontwarn com.tencent.smtt.export.external.**
-keep class com.tencent.smtt.export.external.**{ *;}
-keep class com.tencent.tbs.video.interfaces.IUserStateChangedListener { *;}
-keep class com.tencent.smtt.sdk.CacheManager {
public *;
}
-keep class com.tencent.smtt.sdk.CookieManager {
public *;
}
-keep class com.tencent.smtt.sdk.WebHistoryItem {
public *;
}
-keep class com.tencent.smtt.sdk.WebViewDatabase {
public *;
}
-keep class com.tencent.smtt.sdk.WebBackForwardList {
public *;
}
-keep public class com.tencent.smtt.sdk.WebView {
public <fields>;
public <methods>;
}
-keep public class com.tencent.smtt.sdk.WebView$HitTestResult {
public static final <fields>;
public java.lang.String getExtra();
public int getType();
}
-keep public class com.tencent.smtt.sdk.WebView$WebViewTransport {
public <methods>;
}
-keep public class com.tencent.smtt.sdk.WebView$PictureListener {
public <fields>;
public <methods>;
}
-keepattributes InnerClasses


-keep public enum com.tencent.smtt.sdk.WebSettings$** { *;}
-keep public enum com.tencent.smtt.sdk.QbSdk$** { *;}
-keep public class com.tencent.smtt.sdk.WebSettings { public *;}


-keep public class com.tencent.smtt.sdk.ValueCallback {
public <fields>;
public <methods>;
}
-keep public class com.tencent.smtt.sdk.WebViewClient {
public <fields>;
public <methods>;
}
-keep public class com.tencent.smtt.sdk.DownloadListener {
public <fields>;
public <methods>;
}
-keep public class com.tencent.smtt.sdk.WebChromeClient {
public <fields>;
public <methods>;
}
-keep public class com.tencent.smtt.sdk.WebChromeClient$FileChooserParams {
public <fields>;
public <methods>;
}
-keep class com.tencent.smtt.sdk.SystemWebChromeClient{
public *;}
# 1. extension interfaces should be apparent
-keep public class com.tencent.smtt.export.external.extension.interfaces.* {
public protected *;
}


# 2. interfaces should be apparent
-keep public class com.tencent.smtt.export.external.interfaces.* {
public protected *;
}


-keep public class com.tencent.smtt.sdk.WebViewCallbackClient {
public protected *;
}


-keep public class com.tencent.smtt.sdk.WebStorage$QuotaUpdater {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.WebIconDatabase {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.WebStorage {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.DownloadListener {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.QbSdk {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.QbSdk$PreInitCallback {
public <fields>;
public <methods>;
}
-keep public class com.tencent.smtt.sdk.CookieSyncManager {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.Tbs* {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.utils.LogFileUtils {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.utils.TbsLog {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.utils.TbsLogClient {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.CookieSyncManager {
public <fields>;
public <methods>;
}


# Added for game demos
-keep public class com.tencent.smtt.sdk.TBSGamePlayer {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.TBSGamePlayerClient* {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.TBSGamePlayerClientExtension {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.TBSGamePlayerService* {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.utils.Apn {
public <fields>;
public <methods>;
}
-keep class com.tencent.smtt.** {
*;
}
# end
-keep public class com.tencent.smtt.export.external.extension.proxy.ProxyWebViewClientExtension {
public <fields>;
public <methods>;
}


-keep class MTT.ThirdAppInfoNew { *;}


-keep class com.tencent.mtt.MttTraceEvent { *;}


# Game related
-keep public class com.tencent.smtt.gamesdk.* {
public protected *;}


-keep public class com.tencent.smtt.sdk.TBSGameBooter {
public <fields>;
public <methods>;
}


-keep public class com.tencent.smtt.sdk.TBSGameBaseActivity {
public protected *;}


-keep public class com.tencent.smtt.sdk.TBSGameBaseActivityProxy {
public protected *;}


-keep public class com.tencent.smtt.gamesdk.internal.TBSGameServiceClient {
public *;}













