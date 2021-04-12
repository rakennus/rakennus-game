function Border(x, y, width, height, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;

    this.update = function() {
        this.draw();
    }
    
    this.draw = function() {
        let ctx = myGameArea.context;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}