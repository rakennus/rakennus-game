function intersecting(r1) {
    let a = true;
    for (var i = 0; i < borders.length; i++) {
        let r2 = {
            x: borders[i].x,
            y: borders[i].y,
            width: borders[i].width,
            height: borders[i].height
        }
        if (r1.x <= r2.x + r2.width && r1.x + r1.width >= r2.x && r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y) {
            a = false;
        }
    } return a;
}

function checkIntersection(r1, r2) {
    if (r1.x >= r2.x + r2.width) {
        return false;
    } else if (r1.x + r1.width <= r2.x) {
        return false;
    } else if (r1.y >= r2.y + r2.height) {
        return false;
    } else if (r1.y + r1.height <= r2.y) {
        return false;
    } else {
        return true;
    }
}

function groundCheck(r1, r2) {
    if (r1.y + r1.height <= r2.y + 1) {
        return true;
    }
}