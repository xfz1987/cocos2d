var YdNode = cc.Node.extend({
	ctor: function(){
		this._super();
		var monkey = new cc.Sprite(res.Monkey_png);
        this.addChild(monkey);
        return true;
	}
});