
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var center_x = size.width / 2;
        var center_y = size.height / 2;

        //转盘
        var zp_sprite = new cc.Sprite(res.zhuan_pan_png);
        zp_sprite.x = center_x;
        zp_sprite.y = center_y;
        this.addChild(zp_sprite);

        //数据初始化
        var zp_cx = zp_sprite.width / 2;
        var zp_cy = zp_sprite.height*0.5;
        var zp_len = 135;
        var e_rot = 2 * Math.PI / 8;

        var data=[
            {"img":res.asset1_png,"name":"樱桃"},
            {"img":res.asset2_png,"name":"番茄"},
            {"img":res.asset3_png,"name":"红萝卜"},
            {"img":res.asset4_png,"name":"包菜"},
            {"img":res.asset5_png,"name":"南瓜"},
            {"img":res.asset6_png,"name":"草莓"},
            {"img":res.asset7_png,"name":"花菜"},
            {"img":res.asset8_png,"name":"胡萝卜"}
        ];

        var len=data.length;
        for(var i=0;i<len;i++){
            var item = data[i]
            var asset = new cc.Sprite(item.img);
            asset.tag = 100 + i;
            var rot = i * e_rot + 0.5 * e_rot;
            asset.x = zp_cx + zp_len * Math.sin(rot);
            asset.y = zp_cy + zp_len * Math.cos(rot);
            zp_sprite.addChild(asset);
        }

        //提示
        var infoLabel = new cc.LabelTTF("请滑动转盘", "Arial", 21);
        infoLabel.x = 50 + infoLabel.width * 0.5;
        infoLabel.y = center_y;
        this.addChild(infoLabel);

        //手
        var shou_spr = new cc.Sprite(res.shou_png);
        var org_shou_x = infoLabel.x;
        var org_shou_y = size.height-80;
        shou_spr.x = org_shou_x;
        shou_spr.y = org_shou_y;
        this.addChild(shou_spr);

        //箭头
        var jt_spr = new cc.Sprite(res.jian_tou_png);
        jt_spr.x = center_x;
        jt_spr.y = center_y;
        this.addChild(jt_spr);

        //指针指向的动画
        var cur_tex = cc.textureCache.addImage(res.asset1_png);
        var cur_spr = new cc.Sprite(cur_tex);
        cur_spr.x = center_x;
        cur_spr.y = center_y;
        this.addChild(cur_spr);

        //滑动侦听
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                //do something
                cc.log("=====onTouchBegan======");
                touch_x = touch.getLocation().y;
                return true;
            },
            onTouchEnded:function(touch,event){
                cc.log("=====onTouchEnded======");
                var pos = touch.getLocation();
                speed = Math.floor(Math.abs(pos.y-touch_x)*0.5);
                acc = -speed*0.03;
                cc.log("speed:"+speed+"|acc:"+acc)
            }
        });

        cc.eventManager.addListener(listener, shou_spr)

        //手滑动动画
        ani_shou_handler = function(){
            shou_spr.setPositionY(shou_spr.getPositionY()-21);
            if(shou_spr.getPositionY() < 100){
                shou_spr.setPositionY(org_shou_y)
            }
        }

        //转盘转动动画
        var touch_x = 0;
        var rot = 0;
        var speed = 0;
        var acc = 0;
        var ani_zp_handler=function(){
            speed += acc;
            if(speed < 0){
                acc = 0.1;            
            }else if(speed > 0 && speed < 0.2){
                speed = 0;
                acc = 0;
            }
            zp_sprite.setRotation(zp_sprite.getRotation()+speed);   
            
            var p = zp_sprite.convertToNodeSpace(cc.p(center_x,center_y+zp_len));
            var len = data.length;
            var temp_tag = 0;
            var temp_distance = 10000;
            for(var i=0;i<len;i++){
                var child = zp_sprite.getChildByTag(i+100)
                var distance = (child.x-p.x)*(child.x-p.x)+(child.y-p.y)*(child.y-p.y)
                if(distance < temp_distance){
                    temp_distance = distance;
                    temp_tag = i;
                }
            }

            cur_tex = cc.textureCache.addImage(data[temp_tag].img);
            cur_spr.setTexture(cur_tex)
            
        }
        
        cc.director.getScheduler().scheduleCallbackForTarget(shou_spr,ani_shou_handler,0.1,cc.REPEAT_FOREVER,0,false)

        cc.director.getScheduler().scheduleCallbackForTarget(zp_sprite,ani_zp_handler,0.1,cc.REPEAT_FOREVER,0,false);
        
        return true;
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var menu_layer = new MenuLayer();
        this.addChild(menu_layer);
    }
});

