frameworks太大，没有上传
# 安装cocos
1.python 2.7.x
配置环境变量-系统变量 D:\Python27
2.cocos2d-x-3.13.1 解压放在一个目录 opt 下
命令执行: cd D:\opt\cocos2d-x-3.13.1 , python setup.py

3.ant 解压放在目录 opt下
配置环境变量-系统变量
新建 ANT_ROOT D:\opt\ant
添加到path中 %ANT_HOME%\bin

**注意:路径不能有中文**
# 创建项目
cocos new 项目名称 -l js  //web版本

# 运行项目（web版）
cocos run -p web
或者 直接放在服务器上