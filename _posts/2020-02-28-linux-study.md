---
layout:       post
title:        "linux常用软件与命令备份"
date:         2020-02-28 12:00:00
catalog:      true
tags:
    - linux
---

## crond 任务调度

 http://cron.qqe2.com/

crontab进行 定时任务的设置

任务调度：是指系统在某个时间执行特定的命令或程序

任务调度分类:

1. 系统工作，有些重要的工作必须周而复始的执行
2. 个别用户工作：个别用户可能希望执行某些程序，比如mysql数据库的备份

crontab [选项]
```
-e: 编辑定时任务

-l：显示定时任务

-r：删定时任务
```


### 案例

1. 如果只是简单的任务，可以不用写脚本，执行在crontab中加入任务即可。
2. 对于比较复杂的任务，需要写脚本（Shell编写）

设置任务调度文件：/etc/ctrontab

crontab -e

*/1 * * * *  ls -l /etc >> /tmp/to.txt

每分钟执行ls -l /etc > /tmp/to.txt

\*代表任何时间

，代表不连续的时间。 比如“0 8,12,16 * 代表8点整、12点整、16点整，都执行一次命令

\- 代表连续的时间范围。比如 0 5 * * 1-6 代表周一到周六的凌晨5点执行命令

*/n 代表每隔多少时间执行



### 任务调度实例

先编写一个文件mytask1.sh

 date >> /tmp/mydate

cal >> /tmp/mydate

给mytask1.sh一个可执行权限

crontab -e 

*/1 * * * *  /home/mytask1.sh



**相关指令**

conrtab -r 终止任务指令

crontab -l  

service crond restart 重启任务调度



## 磁盘分区和挂载

分区模式：

1) mbr

最多4个主分区 系统只能安装在主分区，扩展分区要展一个主分区， mbr最大支持2T，好的兼容性

2） gtp分区 

无限主分区 

hdx~  hd表示表示IDE类型的硬盘，x表示第几个硬盘a,b,c ......，~ 表示1~4,主分区

sdx~   sd表示saciis银盘，   eg. sda1、sda2、sda3



### 查看当前系统的分区情况 

lsblk -f  或者 lsblk 看的更清楚



### 增加硬盘

增加硬盘sdb1挂到home目录下

如何增加一块硬盘

1）虚拟机添加硬盘  需要重启才能看到 lsblk

2）分区 fdisk /dev/sdb   、n、p、1、.....、w

3）格式化 mkfs -t ext4  /dev/sdb1  

4）挂载 先创建一个目录 /home/newdisk、mount /dev/sdb1 /home/newdisk

5）设置可以自动挂载(永久)  

vim /etc/fstab

/dev/sdb1     /home/newdisk     ext4  default  0 0

然后执行mount -a 就生效



### 断掉分区

umount /dev/sdb1

error: device is busy.  表示你在那个目录下



## 磁盘情况查询

### 查询系统磁盘整体使用情况

df -lh

### 查询指定目录的磁盘占用情况

du -h /目录

-s 指定目录占用大小汇总

-h 带计量单位

-a 含文件 

-max-depth=1 子目录深度

-c 列出明细的同时，增加汇总值

查询 /opt 目录的磁盘占用情况， 深度为1

du -ach --max-depth=1

### 统计有多少个文件

ls -l | grep "^-" | wc -l

ls -l | grep "^d" | wc -l

ls -lR /home | grep "^-" | wc -l 

ls -lR /home | grep "^d" | wc -l



### 树状显示目录

tree



### Linux网路配置

1. 修改虚拟网卡的配置
2. 查看网关，并编辑
3. ping

### Linux网络环境配置

在管理里面的网络连接编辑，网络连接

2）指定固定IP

vi  /etc/sysconfig/network-scripts/ifcfg-eth0

BOOTPROTO=static  //静态的方式获取固定的IP

ONBOOT=yes   //一定写成yes

网关和dns写成一样

IPADDR="ip地址"

GATEWAY=“网关地址”

DNS1="网管地址"



## 进程管理

 ### 显示系统执行的进程

说明：查看进程使用的指令是 ps ,一般使用的参数a当前终端的所有进程u x

ps -aux | more

VSZ 虚拟内存的情况

RSS 物理内存的情况

TTY终端是哪一个

STAT 当前进程状态  S代表休眠， R表示正在运行、D短期等待，z僵尸进程，

START：启动时间 

TIME：占用CPU的总计时间 

COMMAND ：表示进程启动的时候的命令行

1）指令的父进程

ps -ef | more     //ppid  父进程

-e 显示所有进程  -f全格式

如果查看sshd的父进程号

ps -ef | grep sshd



### 终止进程

kill [选项] 进程号

killall 进程名称 支持通配符

-9 表示强迫进程立即停止



ps -aux | grep sshd   //找到对应的进程号

kill 4010  

终止远程登陆服务sshd, 重启sshd

终止多个gedit编辑器

killall gedit

强制杀掉一个终端

ps -aux | grep bash

kill -9 4090

### 查看进程树 pstree

-p: 显示进程的pid

-u: 显示进程的所属用户

## 服务管理 

服务本质是后台进程， sshd、mysql、防火墙， 进程都会监听一个端口、

service 服务名  [start | stop | restart | reload | status ]

在 centos7.0后不再使用service,页是systemctl

查看防火强

service iptables status

关闭防火强：

service iptables stop

通过 telnet指令检查linux某个端口是不是监听 ，并可以访问

telnet ip 端口

### 查看所有服务

使用setup ->系统服务

ls -l /etc/init.d/    //这个目录中就是所有的有服务

服务的运行级别对应开机的运行级别

查看或者修改默认级别： vi /etc/inittab

Linux系统有7种运行级别

0：系统停机状态，

1： 单用户工作状态，root权限、用于系统维护，禁止远程登陆

2:多用户状态，不支持网络

3： 完作的多用户，登陆后进入控制台命令模式

4：系统没有使用，保留

5： x11控制台，登陆后进入图形模式

6： 系统正常关bi，并重启，默认不能设为6，否则不能正常启动



### 开机流程

开机-> bios -> /boot-> init进程->运行级别（读取里面的一句话）-> 运行级对应的服务

sshd 在0级别是手动还是自启动，在1......6是否自启动，防火墙也是一样的道理

每个服务对应的每个级别都会对应一个自启动

1) chkconfig 

可以给每个服务的各个运行级别设置自启动/关闭

+ 查看服务    chkconfig  --list | grep xxx
+ 查看服务   chkconfig 服务名 --list
+ 修改某个级别自启动   chkconfig --level 5 服务名 on/off

chkconfig --list 

自启动和永久生效



service sshd status

chkconfig --level 5 sshd off

chkconfig --level 5 iptables off

chkconfig iptables off

chkconfig iptables on

设置完之后需要重新启动

### 进程的监控

netstat

动态监控进程

top与ps相识，但是他会动态更新,像windows任务管理器

-d

-i

-p

交互操作说明 

P, 按CPU使用排序 

M, 按内存排序

N, 按 pid 排序 

q

监视特定用户

top 命令显示出来的各列含义， 输入u 就可以监控指定用户

终止指定进程输入k

指定系统更新的时间默认是3s

top -d 10



### 查看网络情况 netstat

netstat [选项]

netstat 

-an 按一定顺序排列输出

-p 显示哪个进程在调用 

## RPM包和yum包

RPM(RedHat Package Manager )类似于setup.exe

查询已经安装的rpm列表

rpm -qa | grep xx

rpm -qi | grep firefox   //查看firefox的软件信息

firefox-45.0.1-1.el6



rpm -ql firefox  //装了哪些文件 并且目录

rpm -qf /etc/passwd   // passwd是哪个软件包的文件 

#### 卸载

rpm -e 包的名称

rpm -e --nodes 

#### 安装

rpm -ivh RPM包的全路径

i = install 安装 

v= verbose 提示

h = hash 进度条

1) 先找到firefox的安装rpm包，你需要挂载上我们的安装光驱ios文件 ，然后到/media目录下去找

2） cp firefox-45.0.1-el6 .rpm /opt/

3） rpm -ivh firefox-....rpm



#### yum

yum是一个Shell前端软件包管理器，基于RPM包管理，能够从指定服务器自动下载RPM包并安装，可以自动处理依赖性关系，并且一次安装所有的依赖包



1） 查询

yum list | grep xx软件

2）安装

yum install xxx 下载安装



-----



先查一下firefox rpm在yu服务器有没有

yum list | grep firefox

yum install firefox    //会安装最新版本



































































































