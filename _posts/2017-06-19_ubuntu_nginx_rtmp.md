---
layout: post
title: "Ubuntu下搭建基于RTMP协议的流媒体服务器"
catalog: true
 date: 2017-06-19
tags: 
    - Ubuntu

---
linux下流媒体服务器的搭建耗费了我好长时间，主要是对命令的不熟悉，其次网上并没有一个完整的教程大部分全很雷同，现做出如下总结
### 安装依赖包
`sudo apt-get install build-essential libpcre3 libpcre3-dev libssl-dev`
在安装依赖包时就出了一个`问题`，解决方案当然是有的,费了老半天google的英文很重要，
`aptitude install libssl-dev` 然后会让你选反 y/n/p，选择 `n`，记住是n，下面会降级，其余选择`y`附上一张可能报错的图
<img src="http://of0xqj5p6.bkt.clouddn.com/2017/0619nginx.jpg"/>
<!--more-->

### 下载资料
首先新建一个工作目录，并进入
`mkdir ~/working`
`cd ~/working`
下载Nginx和Nginx-RTMP
`wget http://nginx.org/download/nginx-1.7.5.tar.gz`
`wget https://github.com/arut/nginx-rtmp-module/archive/master.zip`
当然可以不用命令下载的
接下来就是解压缩了，我们服务器上没有zip压缩软件只能安装了哦
`sudo apt-get install unzip`
然后解压缩
`tar -zxvf nginx-1.7.5.tar.gz`
`unzip master.zip`
### 配置
首先切换到nginx目录里
cd nginx-1.7.5
其次把Nginx-RTMP编译至Nginx里,两条命令
`./configure --with-http_ssl_module --add-module=../nginx-rtmp-module-master`
下一条make 命令又被坑死了
`make
sudo make install`
出现下面一种错直接上代码和问题
```java
安装 nginx 时出现 make: *** 没有规则可以创建“default”需要的目标“build” 提示，看nginx configure 时的提示是因为pcre没安装的问题，所以安装一下
在 ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/ 下载 pcre
tar xvzf pcre-**.tar.gz
cd nginx-**/
./configure --prefix=/usr/local/nginx --with-pcre=/usr/local/software/pcre-**
make && make install
```
### 初始化和启动
```
sudo wget https://raw.github.com/JasonGiedymin/nginx-init-ubuntu/master/nginx -O /etc/init.d/nginx
sudo chmod +x /etc/init.d/nginx
sudo update-rc.d nginx defaults
```
通过开启和关闭使生效
```
sudo service nginx start
sudo service nginx stop
```
### 安装FFmpeg进行编解码
```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:kirillshkrogalev/ffmpeg-next
sudo apt-get update
sudo apt-get install ffmpeg
```
### 配置参数
```
# 用编辑器打开
 sudo vim /usr/local/nginx/conf/nginx.conf
# sudo nano /usr/local/nginx/conf/nginx.conf
```
<font color="red">防火墙不能拦截端口1935</font>
```
rtmp {
    server {
            listen 1935;
            chunk_size 4096;

            application live {
                    live on;
                    record off;
                    exec ffmpeg -i rtmp://localhost/live/$name -threads 1 -c:v libx264 -profile:v baseline -b:v 350K -s 640x360 -f flv -c:a aac -ac 1 -strict -2 -b:a 56k rtmp://localhost/live360p/$name;
            }
            application live360p {
                    live on;
                    record off;
        }
    }
}
```
下面开启服务器
`sudo service nginx restart`
####
明天看更多配置相关的东西




参考English文献
https://www.vultr.com/docs/setup-nginx-rtmp-on-ubuntu-14-04
https://www.vultr.com/docs/setup-nginx-on-ubuntu-to-stream-live-hls-video

