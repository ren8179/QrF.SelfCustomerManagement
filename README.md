# QrF.SelfCustomerManagement
基于Topshelf及Nancy构建的自托管Web小型客户信息管理平台，使用SQLite提供数据支持，不需要IIS的支持，可很方便的发布使用。



### Topshelf
>一个开源的跨平台的宿主服务框架，支持Windows和Mono，只需要几行代码就可以构建一个很方便使用的服务宿主。Topshelf通过将服务视为控制台应用程序并将其作为服务进行托管，简化了服务开发。在要部署时，Topshelf会将应用程序作为Windows服务自动处理它的安装和启动（完全免去了处理InstallUtil 的开销）；自动处理服务项目和服务组件的细微差别；以及在出错时将调试器附加到服务。Topshelf还允许在代码中指定多个参数或在通过命令行进行安装的过程中配置多个参数（如服务名称）

项目地址：https://github.com/Topshelf/Topshelf

### Nancy
>Nancy 是一个基于 .NET 和 Mono 平台用于构建轻量级基于 HTTP 的 Web 服务。Nancy和Asp.net MVC原理相似，但有自己的一套路由机制，在使用上更加易用，可以用Nancy快速开发一些网站。

项目地址：https://github.com/NancyFx/Nancy

### SQLite
>SQLite 是一个开源的嵌入式关系数据库，实现自包容、零配置、支持事务的SQL数据库引擎。 其特点是高度便携、使用方便、结构紧凑、高效、可靠。 与其他数据库管理系统不同，SQLite 的安装和运行非常简单，在大多数情况下 - 只要确保SQLite的二进制文件存在即可开始创建、连接和使用数据库。

官网地址：http://www.sqlite.org/index.html
