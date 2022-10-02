function CNVS(parent, x, y, columns) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = x;
    this.canvas.height = y;
    if (parent) parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.columns = columns;
    this.state = { i: 0, y: 0, topToBtm: true };
}

Object.defineProperties(CNVS.prototype, {
    x: {
	get: function() {
	    return this.canvas.width;
	},
	set: function(v) {
	    this.canvas.width = v;
	}
    },
    y: {
	get: function() {
	    return this.canvas.height;
	},
	set: function(v) {
	    this.canvas.height = v;
	}
    }
});
