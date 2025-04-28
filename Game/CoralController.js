import Coral from "./Coral.js";

export default class CoralController {
    CORAL_INTERVAL_MIN = 500;
    CORAL_INTERVAL_MAX = 2000;

    nextCoralInterval = null;
    corals = [];

    constructor(ctx, coralImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.coralImages = coralImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextCoralTime();
    }

    setNextCoralTime() {
        const num = this.getRandomNumber(this.CORAL_INTERVAL_MIN, this.CORAL_INTERVAL_MAX);

        this.nextCoralInterval = num;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max-min+1) + min);
    }

    createCoral() {
        const index = this.getRandomNumber(0, this.coralImages.length-1);
        const coralImage = this.coralImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - coralImage.height;
        const coral = new Coral(this.ctx, x, y, coralImage.width, coralImage.height, coralImage.image);
        
        this.corals.push(coral);
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.nextCoralInterval <= 0) {
            this.createCoral();
            this.setNextCoralTime();
        }
        this.nextCoralInterval -= frameTimeDelta;

        this.corals.forEach((coral)=> {
            coral.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        this.corlas = this.corals.filter((coral) => coral.x > -coral.width);
    }

    draw() {
        this.corals.forEach((coral) => coral.draw());
    }

    collideWith(sprite) {
        return this.corals.some((coral) => coral.collideWith(sprite));
    }
    
    reset() {
        this.corals = [];
    }
}