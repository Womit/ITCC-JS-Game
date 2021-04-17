class Enemy {

    constructor() {
        this.r = 40;
        this.x = width;
        this.y = height - this.r;
    }

    move() {
        this.x -= 14;
    } 

    show() {
        image(eImg, this.x, this.y, this.r, this.r);
    }

    update() {
        this.x -=this.speed;
    }

    over() {
        return this.x <0;
    }

    hits(player) {
        return collideRectRect(this.x, this.y, this.r, this.r, player.x, player.y, player.r, player.r);
    }
}