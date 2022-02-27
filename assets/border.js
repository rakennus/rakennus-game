function Border(x, y, width, height, material) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.material = material;

    this.dirt = document.getElementById('dirt');
    this.floor = document.getElementById('floor');

    this.draw = function () {
        if (this.material == "stone") {
            ctx.drawImage(this.dirt, 0, 0, 8, 8, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.floor, 0, 0, this.floor.width, this.floor.height, this.x, this.y, this.width, this.height);
        }
    }
}