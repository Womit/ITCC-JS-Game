class Spike {

    constructor() {
        this.r = 40;
        this.x = width;
        this.y = height - this.r; 
    }
    
    move() {
        if (level == 1) {
           this.x -= 14; 
        } else if (level == 2) {
            this.x -=20;
        }
        
    }   
    
    show() {
        if (level == 1) {
            image(sImg, this.x, this.y, this.r, this.r);
        } else if (level == 2) {
            image(ssImg, this.x, this.y, this.r, this.r);
        }
        
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