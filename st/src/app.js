
/****************************** 对象缓冲池 ***************************/
var _ballId = 0;
var ballArr = ['B1_png', 'B2_png', 'B3_png', 'B4_png', 'B5_png'];
var Ball = cc.Sprite.extend({
    ctor: function(){
        this._super(res[ballArr[parseInt(Math.random()*ballArr.length)]]);
        _ballId++;
        this.ballId = _ballId;
        this.x = Math.random() * 400 + 100;
        this.scheduleUpdate();
    },
    update: function(){
        this.y++;
        if(this.y > cc.winSize.height){
            this.unscheduleUpdate();
            this.removeFromParent();
            cc.pool.putInPool(this);
        }
    }
});

Ball.reCreate = function(){
    if(cc.pool.hasObject(Ball)){
        return cc.pool.getFromPool(Ball);
    }else{
        return new Ball();
    }
};

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        /****************************** default ***************************/
        // var helloLabel = new cc.LabelTTF("Hello Cocos", "Arial", 38);
        // helloLabel.x = size.width / 2;
        // helloLabel.y = size.height / 2 + 200;
        // this.addChild(helloLabel, 5);
        // this.sprite = new cc.Sprite(res.Gfxm_png);
        // this.sprite.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.addChild(this.sprite, 0);

        /****************************** 运动 ***************************/
        //创建一个容器
        // var rect = new cc.DrawNode();
        // // 坐标(0,0)为页面左底角
        // //创建一个矩形 (起点，终点，填充颜色，边框大小， 边框颜色) color()表示没有颜色
        // rect.drawRect(cc.p(0,0), cc.p(300,300), cc.color(), 5, cc.color(255,0,0,255));
        // //设置矩形的大小
        // rect.setContentSize(300, 300);
        // //设置矩形的起点为中心点
        // rect.setPositionX(size.width / 2);
        // rect.setPositionY(size.height / 2);
        // //设置锚点坐标，让矩形处在最正中
        // rect.setAnchorPoint(cc.p(0.5, 0.5));

        // //创建一个点容器
        // var dot = new cc.DrawNode();
        // //圆点，半径 ，颜色
        // dot.drawDot(cc.p(0,0), 10, cc.color(255,255,255,255));
        // //调整一下圆点的位置
        // dot.setPositionX(10);
        // dot.setPositionY(10);

        // //圆点加入到矩形上
        // rect.addChild(dot);
        // //矩形加入到layer
        // this.addChild(rect);

        // //动画: 矩形绕圈，圆点绕圈
        // var angle = 0;
        // //schedule 类似于 requestAnimationFrame
        // this.schedule(function(){
        //     rect.setRotation(rect.getRotation() + 1);
        //     dot.setPositionX(rect.width / 2 + Math.sin(angle) * 100);
        //     dot.setPositionY(rect.height / 2 + Math.cos(angle) * 100);
        //     angle += 0.1;
        // });
        

        /****************************** 向量 ***************************/
        // var direction = cc.p(cc.randomMinus1To1(), cc.randomMinus1To1());
        // // cc.log(cc.randomMinus1To1());//打印
        // // 创建向量
        // cc.pNormalize(direction);

        // var dot = new cc.DrawNode();
        // dot.drawDot(cc.p(0,0), 10, cc.color(255,68,72,255));
        // dot.setPositionX(size.width / 2);
        // dot.setPositionY(size.height / 2);
        // this.addChild(dot);
        // this.schedule(function(){
        //     var p = dot.getPosition();
        //     if(p.x < 10 || p.x > size.width - 10){
        //         direction.x *= -1;
        //     }else if(p.y < 10 || p.y > size.height - 10){
        //         direction.y *= -1;
        //     }
        //     dot.setPositionX(p.x + direction.x * 10);
        //     dot.setPositionY(p.y + direction.y * 10);
        // });
        

        /****************************** 显示对象 ***************************/
        // var monkey = new cc.Sprite(res.Monkey_png);
        // monkey.setPositionX(size.width / 2);
        // monkey.setPositionY(size.height / 2);
        // this.addChild(monkey);

        // this.schedule(function(){
        //     var Scene2 = new cc.Scene();
        //     var Layer2 = new cc.Layer();
        //     Layer2.setPosition(size.width / 2, size.height / 2);
        //     var sb = new cc.Sprite(res.Gfxm_png);
        //     Layer2.addChild(sb);
        //     Scene2.addChild(Layer2);
        //     cc.director.runScene(Scene2);
        // }, 3, true)
        
        /****************************** 基本动作 ***************************/
        // var monkey = new cc.Sprite(res.Monkey_png);
        // monkey.setPosition(280, 280);
        // // 以什么移 (时间， 位置)
        // // var action1 = new cc.moveBy(3, cc.p(size.width - 100, size.height - 100))
        // // 跳跃到（时间，终点，每次跳多高，跳几次）
        // // var action1 = new cc.JumpTo(2, cc.p(size.width - 300, size.height - 300), 150, 3)
        // // 闪烁 (时间， 次数)
        // var action1 = new cc.Blink(1, 2);
        // monkey.runAction(action1);
        // // 变暗到(时间，透明度)
        // var action2 = new cc.FadeTo(2, 0)
        // monkey.runAction(action2);
        // this.addChild(monkey);
        
        /****************************** 动效,必须放在NodeGrid上 ***************************/
        // var layer1 = new cc.NodeGrid();
        // var monkey = new cc.Sprite(res.Monkey_png);
        // monkey.setPosition(size.width / 2, size.height / 2);
        // //晃动(时长， 波动大小, 范围 ，z轴是否突出
        // var w1 = new cc.Shaky3D(2, cc.size(10, 15), 2, true);
        // var w2 = new cc.shatteredTiles3D(2, cc.size(10, 15), 2, true);
        // var w3 = new cc.Liquid(2, cc.size(10, 15), 2, 1);

        // // layer1.runAction(w1);
        // layer1.runAction(new cc.Sequence(w1,w2,w3));
        // layer1.addChild(monkey);
        // this.addChild(layer1);
        

        /****************************** 场景切换 ***************************/
        // var scene1 = new cc.Sprite(res.A_jpg);
        // scene1.setPosition(size.width/2, size.height/2);
        // this.schedule(function(){
        //     var scene2 = new cc.Scene();
        //     var layer = new cc.Layer();
        //     layer.setPosition(size.width/2, size.height/2);
        //     var bg = new cc.Sprite(res.B_jpg);
        //     layer.addChild(bg);
        //     scene2.addChild(layer);
        //     //场景切换效果， 时间，场景，是否显示背面
        //     var trans = new cc.TransitionPageTurn(2, scene2, false);
        //     // cc.director.runScene(scene2);
        //     cc.director.runScene(trans);
        // }, 2, true)
        // this.addChild(scene1);
        
        /****************************** 事件管理器 ***************************/
        // var helloLabel = new cc.LabelTTF('Hello Cocos2d-x', 'Arail', 49);
        // helloLabel.x = size.width / 2;
        // helloLabel.y = size.height / 2;
        // this.addChild(helloLabel);
        // //创建事件监听器
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     onTouchBegan: function(touch, event){
        //         if(cc.rectContainsPoint(event.getCurrentTarget().getBoundingBox(), touch.getLocation())){
        //             cc.log(123);
        //         }
        //     }
        // }, helloLabel);
        
        /****************************** 自定义事件 ***************************/
        // var myListener = cc.EventListener.create({
        //     event: cc.EventListener.CUSTOM,
        //     eventName: 'MyEvent',
        //     callback: function(event){
        //         cc.log('aaa: ' + event.getUserData());
        //     }
        // });

        // cc.eventManager.addListener(myListener, 1);
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     onTouchBegan: function(touch, event){
        //         if(cc.rectContainsPoint(event.getCurrentTarget().getBoundingBox(), touch.getLocation())){
        //             cc.eventManager.dispatchCustomEvent('MyEvent', 'bbb');
        //         }
        //     }
        // }, helloLabel);

        /****************************** 对象缓冲池 ***************************/
        setInterval(function(){
            this.addChild(Ball.reCreate());
        }.bind(this), 1000);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

