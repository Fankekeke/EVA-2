### 基于Spring + Vue的旅游景区项目

#### 介绍
## 系统功能
民宿管理员：订单数量统计，订单交易额统计，客房统计饼图，酒店信息修改，房间订单查询，房间入住状态修改，查看住宿订单详情，酒店房间管理，查看用户房间订单评价

超级管理员：景点民宿导航，公告管理，订单评价，民宿管理，民宿订单，论坛管理，消息回复，房间信息，景点管理，用户管理，景区订单

用户：邮箱注册，修改个人信息，订单支付，我的贴子，订单评价，发帖回复，修改密码


#### 项目截图

|  |  |
|---------------------|---------------------|
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/19cdd8902c7bfe98b09d68bfaf98f8f.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/ba5c5fff53c65a43b2f23c025a0a547.png) |
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/4dcc19ff60e2e6b8bd273ed4fa05f78.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/b8419f48a6cbb09c5b6407f63bc76dd.png) |
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/efb6b69ea9d388047c8d577d474f958.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/aa88009b005b782315efef594bb1daa.png) |
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/eed87da40340d9959518a49e29e32ff.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/52656293d7fdab487a9f6328416fb14.png) |
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/edbd46abf5196711972c5dbacaec0d9.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/4984aed0d5c9bd52671e397236892f1.png) |
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/e3d3c27c56607aea71d58de6340c105.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/79d53e9a9fb2002f6ea3aabf6b2b5b0.png) |
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/d406956ccb5decffb1753eceddcd49d.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/65e62461fe9da3b6c2328d85c56e5a2.png) |
|![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/c20e7f36c52b84facd02a3ebf4b0de2.png) | ![](https://fank-bucket-oss.oss-cn-beijing.aliyuncs.com/img/29fba70b80bd636fea365ec7f81c8a1.png)

#### 本地地址：http://localhost:8081/、http://localhost:8082/ （取决于node分配端口）


#### 安装环境
JAVA 环境 

Node.js环境 [https://nodejs.org/en/] 选择14.17

Yarn 打开cmd， 输入npm install -g yarn !!!必须安装完毕nodejs

Mysql 数据库 [https://blog.csdn.net/qq_40303031/article/details/88935262] 一定要把账户和密码记住

redis

Idea 编译器 [https://blog.csdn.net/weixin_44505194/article/details/104452880]

WebStorm OR VScode 编译器 [https://www.jianshu.com/p/d63b5bae9dff]

#### 前台启动方式
安装所需文件 yarn install 
运行 yarn run dev

#### 后端启动方式

1.首先启动redis，进入redis目录终端。输入redis-server回车
2.导入sql文件，修改数据库与redis连接配置
3.idea中启动后端项目

#### 默认后台账户密码
[管理员]
admin
1234qwer

[民宿管理员]
xierdun
1234qwer

[用户]
test
1234qwer

#### 获取方式

Email: fan1ke2ke@gmail.com

WeChat: `Storm_Berserker`

`附带部署与讲解服务，因为要恰饭资源非免费，伸手党勿扰，谢谢理解😭`

> 1.项目纯原创，不做二手贩子 2.一次购买终身有效 3.项目讲解持续到答辩结束 4.非常负责的答辩指导 5.黑奴价格

> 项目部署调试不好包退！功能逻辑没讲明白包退！

#### 其它资源

[2024年-答辩顺利通过-客户评价👻](https://berserker287.github.io/2024/06/06/2024%E5%B9%B4%E7%AD%94%E8%BE%A9%E9%A1%BA%E5%88%A9%E9%80%9A%E8%BF%87/)

[2023年-答辩顺利通过-客户评价🐢](https://berserker287.github.io/2023/06/14/2023%E5%B9%B4%E7%AD%94%E8%BE%A9%E9%A1%BA%E5%88%A9%E9%80%9A%E8%BF%87/)

[2022年-答辩通过率100%-客户评价🐣](https://berserker287.github.io/2022/05/25/%E9%A1%B9%E7%9B%AE%E4%BA%A4%E6%98%93%E8%AE%B0%E5%BD%95/)

[毕业答辩导师提问的高频问题](https://berserker287.github.io/2023/06/13/%E6%AF%95%E4%B8%9A%E7%AD%94%E8%BE%A9%E5%AF%BC%E5%B8%88%E6%8F%90%E9%97%AE%E7%9A%84%E9%AB%98%E9%A2%91%E9%97%AE%E9%A2%98/)

[50个高频答辩问题-技术篇](https://berserker287.github.io/2023/06/13/50%E4%B8%AA%E9%AB%98%E9%A2%91%E7%AD%94%E8%BE%A9%E9%97%AE%E9%A2%98-%E6%8A%80%E6%9C%AF%E7%AF%87/)

[计算机毕设答辩时都会问到哪些问题？](https://www.zhihu.com/question/31020988)

[计算机专业毕业答辩小tips](https://zhuanlan.zhihu.com/p/145911029)


#### 接JAVAWEB毕设，纯原创，价格公道，诚信第一

`网站建设、小程序、H5、APP、各种系统 选题+开题报告+任务书+程序定制+安装调试+项目讲解+论文+答辩PPT`

More info: [悲伤的橘子树](https://berserker287.github.io/)

#### 参与贡献

1.  国家一级保护废物
