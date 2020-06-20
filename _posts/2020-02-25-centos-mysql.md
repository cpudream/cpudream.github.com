---
layout:       post
title:        "CentOS7安装mysql8数据库"
subtitle:     ""
header-style: text
catalog:      true
date:         2020-02-25
tags:
              - linux
---

## 卸载系统自带的mariadb-lib

查看mariadb版本
```shell
rpm -qa|grep mariadb
```
卸载mariadb
```shell
rpm -e mariadb-libs-5.5.56-2.el7.x86_64 --nodeps
```

## 安装上传下载工具
参考链接 https://www.cnblogs.com/jellyabd/p/11388041.html

## 准备安装包

1. 下载离线安装包， 选择redhat    https://dev.mysql.com/downloads/mysql/
2. 解压挨着运行下面命令
```shell
sudo rpm -ivh mysql-community-common-8.0.19-1.el7.x86_64.rpm --nodeps --force
sudo rpm -ivh mysql-community-libs-8.0.19-1.el7.x86_64.rpm --nodeps --force
sudo rpm -ivh mysql-community-devel-8.0.19-1.el7.x86_64.rpm --nodeps --force
sudo rpm -ivh mysql-community-libs-compat-8.0.19-1.el7.x86_64.rpm --nodeps --force
sudo rpm -ivh mysql-community-client-8.0.19-1.el7.x86_64.rpm --nodeps --force
sudo rpm -ivh mysql-community-server-8.0.19-1.el7.x86_64.rpm --nodeps --force
下面这两个包没有安装
mysql-community-embedded-compat-8.0.19-1.el7.x86_64.rpm
mysql-community-test-8.0.19-1.el7.x86_64.rpm
```

## 修改配置
1. 停止数据库命令`service mysqld stop`
2. 编辑/etc/my.cnf 
```shell
port=8306  #指定端口号
skip-grant-tables  # 不要校验密码登录
```
3. mysql -u root -p      # 密码直接回车就好
4. 给root设置密码   https://blog.csdn.net/yegaomin/article/details/79671000
5. 远程测试连接，如果报错，参考下面加密方式修改。和分配权限

## 创建用户与分配权限

+ 创建账户
`create user 'root'@'%' identified by  'password'`

+ 赋予权限，with grant option这个选项表示该用户可以将自己拥有的权限授权给别人
`grant all privileges on *.* to 'root'@'%' with grant option`

+ 改密码&授权超用户，flush privileges 命令本质上的作用是将当前user和privilige表中的用户信息/权限设置从mysql库(MySQL数据库的内置库)中提取到内存里
`flush privileges;`

## 加密方式修改

ALTER USER 'root'@'%' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; #更改加密方式

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password'; #更新用户密码

FLUSH PRIVILEGES; #刷新权限

---
参考： 
mysql8.0 新建用户到权限分配 https://blog.csdn.net/shenhonglei1234/article/details/84786443
mysql 8.0以上加密方式变化https://www.cnblogs.com/lifan1998/p/9177731.html



