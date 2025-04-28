export default class Player {
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    dinoRunImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 20 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5;
        this.yStandingPostition = this.y;

        this.standingStillImage = new Image();
        this.standingStillImage.src = "/Game/images/crab.png";
        this.image = this.standingStillImage;

        const runImage1 = new Image();
        const runImage2 = new Image();

        runImage1.src = "/Game/images/crab_walk.png";
        runImage2.src = "/Game/images/crab_speed.png";

        this.dinoRunImages.push(runImage1);
        this.dinoRunImages.push(runImage2);

        // Keyboard
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);

        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);

        // Touch
        window.removeEventListener("touchstart", this.touchstart);
        window.removeEventListener("touchend", this.touchend);

        window.addEventListener("touchstart", this.touchstart);
        window.addEventListener("touchend", this.touchend);
    }

    keydown = (event)=>{
        if(event.code === "Space") {
            this.jumpPressed = true;
        }
    }

    keyup = (event)=>{
        if(event.code === "Space") {
            this.jumpPressed = false;
        }
    }

    touchstart = ()=> {
        this.jumpPressed = true;
    }

    touchend = ()=> {
        this.jumpPressed = false;
    }

    update(gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta);

        this.jump(frameTimeDelta);
    }

    jump(frameTimeDelta) {
        if(this.jumpPressed) {
            this.jumpInProgress = true;
        }

        if(this.jumpInProgress && !this.falling) {
            if(this.y > this.canvas.height - this.minJumpHeight || (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else {
            if (this.y < this.yStandingPostition) {
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if (this.y + this.height > this.canvas.height) {
                    this.y = this.yStandingPostition;
                }
            } else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    run(gameSpeed, frameTimeDelta) {
        if(this.walkAnimationTimer <= 0) {
            if(this.image === this.dinoRunImages[0]) {
                this.image = this.dinoRunImages[1];
            } else {
                this.image = this.dinoRunImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}