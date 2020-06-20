---
layout: post
title: "使用GitHub和Hexo搭建免费博客(全)"
data: 2013-03-05 22:20:00
catalog: true
tags: 
    - 版本控制
    - 博客
---

### 一、引言

　　最近想搭建一个独立的个人博客，可以将自己在工作学习中的一些知识及经验记录下来。不断积累知识，不断总结经验，让自己可以不断的进步、成长。<br/>
　　目前搭建独立的个人博客有很多种方式，你可以用CSDN博客，163等门户博客，这些博客一般是免费的维护起来方便，但是发现限制太多，所以就考虑搭建独立博客。我选择了现在很热门的Github Pages + Hexo 的方式来搭建独立的个人博客。





### 二、准备工作

【**注意**】本教程是针对Windows平台和Hexo
在搭建个人博客的过程中，你可能会使用到下面几个网站。在这几个网站中都有相应的官方文档及教程。如果官方文档不能满足你，那么请[Google](https://www.google.com)。

#### 2.1 参考文献

[使用Hexo搭建个人博客](http://dkylin.com/archives/2016/build-personal-blog-by-hexo.html)<br/>
[使用GitHub和Hexo搭建免费静态Blog](https://segmentfault.com/a/1190000003101692)

### 三、安装软件

要安装的软件有GitHub,Node.JS

#### 3.1 安装GitHub

  [GitHub Windows](https://desktop.github.com/)
双击一步一步的完成超级简单

#### 3.2 安装Node.JS

双击即可打开链接[Node.JS](https://nodejs.org/en/)<br/>
**注** 如果是新版就不用配置环境变量了，切记切记否则安装完成后添加Path环境变量，使npm命令生效,<br/>
` ;C:\Program Files\nodejs\node_modules\npm `(这个是默认安装路径)

### 四、注册Github帐号

进入[Github](http://www.github.com) 网站，按照提示进行注册，然后登录。
<br/>
<img src="/images/2013/github_register.png"/>
<br/>
登录完成之后，在你的主页点击图标 New Repository 创建一个新的版本库，因为我们是使用 Github Pages 去搭建我们的静态博客，所以版本库的名称应该是你的用户名+.github.io。如：我的用户名是：cpudream，那么版本库的名字应该是： cpudream.github.io ，这个是一定不能出错的。切记切记，因为之后你将要访问的你的博客地址就是： [https://cpudream.github.io](https://cpudream.github.io) 。
<img src="/images/2013/github_new.png"/>
<img src="/images/2013/github_new_name.png"/>

**到此为止，，Github账号创建完成，GIthub Pages 所需要的版本库也创建好了。**

### 配置SSH

这一步也很重要！！！<br/>
打开 Git Bash ，执行下面的命令生成 SSH 访问私钥及公钥。<br/>
`ssh-keygen -t rsa -C "email@email.com"
`<b/>
【**注**】： email@email.com换成你自己的email，比如我的是cpudream@live.com（与你github绑定的那个邮箱）
效果如图片<img src="/images/2013/github_checked_ssh.png"/>!
输入命令回车之后会提示你输入一些东西，不用管。一直回车到底就好了。然后你的 ~/.ssh 文件下就会生成两个文件 `id_rsa` 和 `id_rsa.pub` 。

打开你的 Github -> setting -> SSH Keys 。然后点击 New SSH Key 创建一个新的SSH Key。Title 可以用你的计算机名，可以用以区分。将文件 id_rsa.pub 中的所以内容复制粘贴到 Key 下面。
<img src="/images/2013/github_show_ssh.png"/>

然后使用下面的命令测试是否可以连接上 Github 。<br/>
` ssh -T git@github.com
`<br/>
如果出现下图所示内容则证明连接成功。
<img src="/images/2013/github_ssh_success.png"/>

### 五、安装Hexo

#### 5.1 创建Hexo文件夹

创建的Hexo文件夹就是自己的本地博客文件夹，根据自己喜好建立目录（如D:\GitHubBlog），进入Git Shell切换到该路径下D:\GitHubBlog,**最好先切换，记住了** 切换的命令是cd
然后执行指令完成初始化：<br/>
> `hexo init`

#### 5.2 安装Hexo插件

安装Hexo插件代码如下(可以一次性把下面的代码复制进去也可以分开复制)
npm install hexo-generator-index --save <br/>
npm install hexo-generator-archive --save<br/>
npm install hexo-generator-category --save<br/>
npm install hexo-generator-tag --save<br/>
npm install hexo-server --save<br/>
npm install hexo-deployer-git --save<br/>
npm install hexo-deployer-heroku --save<br/>
npm install hexo-deployer-rsync --save<br/>
npm install hexo-deployer-openshift --save<br/>
npm install hexo-renderer-marked@0.2 --save<br/>
npm install hexo-renderer-stylus@0.2 --save<br/>
npm install hexo-generator-feed@1 --save<br/>
npm install hexo-generator-sitemap@1 --save<br/>

#### 5.3 本地效果

继续执行以下命令，成功后可登录[localhost:4000](http://localhost:4000)查看效果<br/>
`hexo server`<br/><img src="/images/2013/github_show_success.png"/>

**以上把本地部部署完成了**

#### 5.4 部署到GitHub

先使用下面的命令对Github进行初始配置。下面引号里面的内容填写成你的名字和email<br/>
`git config --global user.name "your name"`
`git config --global user.email "email@email.com"`<br/>
然后打开Hexo主文件夹下的`_config.yml`，设置其中的`deploy` 参数，详细请查看Hexo官方文档中[部署部分](https://hexo.io/zh-cn/docs/deployment.html)。<br/>
我的设置如下所示**切记冒号后面有一个空格**：
<img src="/images/2013/github_setting_repo.png"/>
<br/>
设置完成之后执行下列命令<br>

> `hexo g`    #生成静态文件<br/>
> `hexo d`     #部署到github<br/>
**以上博客就搭建完成**在浏览器中输入你的网站就可以了比如我的[http://cpudream/github.io](http://cpudream/github.io)

### 六、更换主题

默认主题不是所有人都喜欢，所以我就说一下怎么更换主题

#### 6.1 选择主题

选择适合自己的[主题](https://github.com/hexojs/hexo/wiki/Themes)点击每个主题后面的Demo就可以预览主题了

#### 6.2 安装主题 

1. 进入选择主题的源码部分（也就是点击标题的第一个高度部分），你会发现的源码安装方法就在里面，一般的安装方法如下：
`git clone 主题地址`
2. 打开Hexo主文件夹下的_config.yml，修改其中的theme 属性。theme: 后面要加空格<br/>**注**下图中hexo替换成你自己选择主题的名字<br/><img src="/images/2013/gihub_setting_theme.png"/>
3. 在gitBash（博客本地目录）执行
> `hexo g`#生成静态网页
> `hexo d`#发布到github上

### 七、创建和发布文章

#### 7.1 创建

首先创建，cd到Hexo文件夹<br/>
`hexo new "文章标题"`<br/>
你可以在Hexo->Source->_post目录下看到你新创建的那个文章，还有一个配套的文件夹，里面放这边博文的图片资源,然后进行编辑，使用MarkDown编辑器打开新创建的文件如果没有可以联系我，就可以写文章了，要根据MarkDown语法写出来的文章才会好看,MarkDown基本用法请看我的另一篇文章[Markdown基本使用及语法](https://cpudream.github.io/2013/04/01/Markdown%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E8%AF%AD%E6%B3%95/),编辑完成执行命令：

> `hexo g #生成静态网页`<br/>
> `hexo d #发布到服务器上`

#### 7.2 发布错误解决

如果发布时候出现错误，执行下面命令：
`ERROR Deployer not found: git`<br/>
那么执行下面命令再发布一次<br/>
`npm install hexo-deployer-git --save`



















