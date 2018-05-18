1.添加物理引擎模块 chipmunk
project.json中，"modules" : ["cocos2d","chipmunk"],

2.根据背景图修改 main.js 中的 分辨率， 本图为 1024x631
cc.view.setDesignResolutionSize(1024, 631, cc.ResolutionPolicy.SHOW_ALL);

3.将图片资源添加至resource.js

