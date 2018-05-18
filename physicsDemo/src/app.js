// 是否绘制调试遮盖层开启debug
var DEBUGE_SHOW = false;
// 碰撞检测类型
var COLLISION_TYPE = 1;
var SPRITE_WIDTH = 64;
var SPRITE_HEIGHT = 64;

var HelloWorldLayer = cc.Layer.extend({
    space:null,//物理空间
    ctor:function () {
        this._super();
        var size = cc.winSize;
        this.sprite = new cc.Sprite(res.Background_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        //初始化物理引擎
        this.initPhysics();
        this.scheduleUpdate()
        return true;
    },
    //设置场景
    update:function(){
        var timeStep = 0.04;
        this.space.step(timeStep);
    },
    initPhysics:function(){
        var size = cc.winSize;
        this.space = new cp.Space();
        
        //开启调试空间描绘的线
        this.setupDebugNode();
        
        //设置重力加速度 -100表示沿y轴下降
        this.space.gravity = cp.v(0, -100);

        // 获取物理空间内的静态物体 一个回路
        var staticBody = this.space.staticBody;
        var s1 = new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(size.width, 0), 0);
        var s2 = new cp.SegmentShape(staticBody, cp.v(size.width - 100, 0), cp.v(size.width, size.height), 20);
        var s3 = new cp.SegmentShape(staticBody, cp.v(size.width - 300, size.height - 400), cp.v(0, size.height - 200), 20);
        var s4 = new cp.SegmentShape(staticBody, cp.v(0, size.height), cp.v(0, 0), 20);

        var walls = [s1, s2, s3, s4];
        cc.log(s1);
        for(var i=0;i<walls.length;i++){
            //弹性系数 和 摩擦系数
            var shape = walls[i];
            //设置当前墙面的弹性系数为1
            shape.setElasticity(1);
            //设置当前墙面的摩擦系数为1
            shape.setFriction(1);

            this.space.addStaticShape(shape);
        }

        //设置检测碰撞
        this.space.addCollisionHandler(
            COLLISION_TYPE, 
            COLLISION_TYPE, 
            this.addCollisionBegin.bind(this),
            this.addCollisionPre.bind(this),
            this.addCollisionPost.bind(this),
            this.addCollisionSeparate.bind(this)
        );
    },
    addCollisionBegin: function () {
        return true;
    },
    addCollisionPre: function () {
        return true;
    },
    addCollisionPost: function () {
        return true;
    },
    addCollisionSeparate: function(arbiter, space) {
        //结束的时候 给大家展示一个效果
        var shapes = arbiter.getShapes();
        var bodya = shapes[0].getBody();
        var bodyb = shapes[1].getBody();
        var spritea = bodya.data;
        var spriteb = bodyb.data;
        if (spritea != null && spriteb != null) {
            this.showEffect(spritea);
        }
    },
    showEffect:function(spritea){
        this._parSystem = new cc.ParticleSystem(res.First_plist);
        this._parSystem.setAutoRemoveOnFinish(true);
        var size = spritea.getPosition();
        this._parSystem.setPositionX(size.x - 10);
        this._parSystem.setPositionY(size.y);
        this.addChild(this._parSystem);
    },
    setupDebugNode: function(){
        // 启动调试
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = DEBUGE_SHOW;//是否开启
        this.addChild(this._debugNode);
    },
    onEnter: function(){
        this._super();
        cc.log('enter');
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this._onTouchBegan
        }, this);
    },
    onExit: function(){
        this._super();
        cc.log('exit');
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
    },
    _onTouchBegan: function(touch, event){
        cc.log('触摸成功');
        var target = event.getCurrentTarget();
        var location = touch.getLocation();
        //点击添加精灵的位置
        target.addNewSpriteAtPosition(location);
        return false;
    },
    addNewSpriteAtPosition: function(p){
        cc.log('准备添加精灵，将两个精灵连接起来');
        var body1 = this._createBody(res.Head_png, p);
        var body2 = this._createBody(res.Body_png, cc.pAdd(p, cc.p(80, -80)));
        //空间为精灵添加约束，也就是用线连接起来
        this.space.addConstraint(new cp.PinJoint(body1, body2, cp.v(0,0), cp.v(0, SPRITE_HEIGHT/2)));
    },
    _createBody: function(filename, p){
        var body = new cp.Body(1, cp.momentForBox(1, SPRITE_WIDTH, SPRITE_HEIGHT));
        body.p = p;
        this.space.addBody(body);

        // 将物体和形状相互绑定 形状设置摩擦系数和弹性系数
        var shape = new cp.BoxShape(body, SPRITE_WIDTH, SPRITE_HEIGHT);
        shape.setElasticity(0.5);
        shape.setFriction(0.5);
        //是指碰撞类型
        shape.setCollisionType(COLLISION_TYPE);
        this.space.addShape(shape);
        
        // 形状
        var sprite = new cc.PhysicsSprite(filename);
        sprite.setBody(body);
        sprite.setPosition(cc.p(p.x, p.y));
        this.addChild(sprite);
        // 将精灵对象放到物体的data数据中，碰撞检测时可以取出来
        body.data = sprite;
        return body;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});