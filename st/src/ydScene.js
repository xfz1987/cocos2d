var YdLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		var size = cc.winSize;
		var img = new YdNode();
		img.setPosition(size.width / 2, size.height / 2);
		this.addChild(img);
		return true;
	}
});

var YdScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new YdLayer();
        this.addChild(layer);
    }
});