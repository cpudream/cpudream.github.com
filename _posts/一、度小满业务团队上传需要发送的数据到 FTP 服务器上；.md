hi，给位好：不好意思，今天实在忙的不行，我介绍一下大概的流程：

整个流程涉及到三个角色：外部机构、度小满业务团队、还有就是我这边也就是度小满安全团队（负责数据加密传输）

### 一、度小满业务团队上传需要发送的数据到 FTP 服务器上；

​        度小满业务团队推送给我的数据对具体内容无要求，只对文件名有要求，以前度小满其他业务团队给我这边的数据大概分为两种：
​       **1.1 按照一个星期推送**
​         每个数据文件为 csv 文件并且对应一个同名的 md5文件（内容为数据文件的 md5值），这两个文件放在一个文件夹下，文件夹的名字以推送日期命名例如下图

![0fb49ec413d719b185754c4191ef286b](/Users/liuyufeng/Library/Caches/BaiduMacHi/Share/images/0fb49ec413d719b185754c4191ef286b.png)数据文件和 md5文件如下图

![1c143da30e992f455cfee0e93037f738](/Users/liuyufeng/Library/Caches/BaiduMacHi/Share/images/1c143da30e992f455cfee0e93037f738.png)

​      **1.2 不定期推送**
​        每个数据文件为  txt 文件并且有个同名的 ok文件（内容为数据文件的 md5值）例如下图

![4cbe9f6a9b39357cb3690ed8f114c50f](/Users/liuyufeng/Library/Caches/BaiduMacHi/Share/images/4cbe9f6a9b39357cb3690ed8f114c50f.png)

### 二、安全团队通过网关系统定时拉取 FTP 上的数据加密后通过 SFTP 的方式传输给外部机构

外部机构需要提供公钥（用于数据加密），只需要从 SFTP 地址获取到数据解密就可以，我这边可以提供一个加解密 demo和测试的 sftp 地址

整个流程的流程图为下图

![639ac485e2ee7dc4e98d8de2b35c41d5](/Users/liuyufeng/Library/Caches/BaiduMacHi/Share/images/639ac485e2ee7dc4e98d8de2b35c41d5.png)上面就是大概的流程。有什么没说明白的随时 hi 我就可以

 