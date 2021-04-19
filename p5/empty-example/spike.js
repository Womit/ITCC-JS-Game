class Spike {

    constructor() { //determine size of enemy
        this.r = 40;
        this.x = width;
        this.y = height - this.r; 
    }
    
    move() { //determine move speeds; eg. level 2 is faster than level 1
        if (level == 1) {
           this.x -= 14; 
        } else if (level == 2) {
            this.x -=18;
        }
        
    }   
    
    show() { //show different background depending on level
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

    hits(player) { //collide rule for collide library
        return collideRectRect(this.x, this.y, this.r, this.r, player.x, player.y, player.r, player.r);
    }
}