---
layout:       post
title:        "linux 四剑客"
date:         2020-05-01 12:00:00
header-style: text
catalog:      true
tags:
    - linux
---

## Linux 四剑客

Awk

 sed

 grep

 find

正则表达式用于 grep ,vim 等文本处理

通配符用于命令

文件默认权限 644

目录默认权限

## 一、find

使用场景：查找文件名或目录

```powershell
find /home/ -name "test.txt"
find /home/ -name "*.txt" | more
## 查找文件
find /home/ -name "filename" -type f  
## 查找路径
find . -name "filename" -type d

## 查找30天前的文件
find . -name "filename" -type d -mtime +30

## 一天以内的文件
find . -name "filename" -type d -mtime -1

## 查找大于 10k 的文件
find . -name "filename" -type f -mtime +30 -size +10k

## 权限
find . -name "filename" -type f -mtime +30 -size -perm 755

## 修改文件755
find . name "filename" -type f -exec chmod -R 755 {} \;


```



xargs 与 find结合使用（用的少）不支持 mv, chmod, cp, chown

```shell
find . -name "filename" -type d -mtime -1 |xargs rm -rf {} \;
## {} 是前面的结果  \;是一个固定格式与 find 结合使用
```

-exec

```shell
find . -name "filename" -type f -mtime -1 -exec cp -r {} \temp\
```

## grep

用来做匹配，查找文件内容

```powershell
## 显示行号，查找 root,高亮展示
grep -n --color "root" /etc/passwd
```

```powershell
## -v 取反，
grep -v "#" \filepath | grep -v "^$"
```

grep 后面接正则表达式

```powershell
#在文件中列出所有的 ip
grep 不支持的用 egrep
egrep --color "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$" text.txt
egrep --color "([0-9]{1,3}\.){3}[0-9]{1,3}$" text.txt  //与上面等价


```

## awk

处理文本，列

```shell
awk {print $1} /etc/passwd
# 以：分割，显示最后一列
awk -F: {print $NF} /etc/passwd  

### 
awk -F: {print $1"------"$NF} /etc/passwd
```

## 提取 ip

```
Ifconfig | grep "inet addr:" | awk -F  //完善一下
```

自动配置 java,配置环境变量脚本

## sed



`sed 's/liucoder.com/baidu.com/g' test.txt`





