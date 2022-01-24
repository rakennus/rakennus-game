function Border(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.floor = document.getElementById('floor');
    
    this.draw = function() {
        ctx.drawImage(this.floor, 0, 0, 16, 16, this.x, this.y, this.width, this.height);            
    }
}