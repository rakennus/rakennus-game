function Border(x, y, width, height, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;

    this.floor = document.getElementById('floor');

    this.update = function() {
        this.draw();
    }
    
    this.draw = function() {
        let ctx = myGameArea.context;
        if (this.type == "spawn") {
            ctx.fillStyle = "blue";            
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.type == "floor") {
            ctx.drawImage(this.floor, 0, 0, 16, 16, this.x, this.y, this.width, this.height);            
        }
    }
}