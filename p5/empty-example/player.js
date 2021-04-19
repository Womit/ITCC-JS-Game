class Player {
    constructor () {
        this.r = 80;
        this.x = 50;
        this.y = height - this.r;
        this.vy = 0;
        this.gravity = 1;
    }

    jump() {
        if (this.y == height - this.r) {
            this.vy = - 20; 
        }
        
    }

    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.r);
    }

    show () {
        if (level == 1) {
           image(pImg, this.x, this.y, this.r, this.r); 
        } else if (level == 2) {
            image(ppImg, this.x, this.y, this.r, this.r); 
        }
        
    }

    passes(spike) {
        if (this.x > spike.x + spike.r && !spike.passed) {
            spike.passed = true;
            return true;
        }
    }


}