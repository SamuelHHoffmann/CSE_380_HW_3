import { SceneObject } from '../SceneObject'
import { AnimatedSpriteType } from './AnimatedSpriteType'
import { AIBehavior, State } from '../../AI/AIBehavior';

export class AnimatedSprite extends SceneObject {
    private spriteType: AnimatedSpriteType;
    private state: string;
    private animationFrameIndex: number;
    private frameCounter: number;
    private direction: number;
    private ai: AIBehavior;


    public constructor(initSpriteType: AnimatedSpriteType, initState: string, ai: AIBehavior) {
        super();
        this.spriteType = initSpriteType;
        this.ai = ai;

        // START RESET
        this.state = initState;
        this.animationFrameIndex = 0;
        this.frameCounter = 0;
        this.direction = 0;
    }

    public getDirection(): number {
        // this.direction += 1;
        // if (this.direction == 360) {
        //     this.direction = 0;
        // }
        return this.direction;

    }

    public setDirection(newDirection: number) {
        this.direction = (newDirection % 360);

    }



    public getAnimationFrameIndex(): number {
        return this.animationFrameIndex;
    }

    public getFrameCounter(): number {
        return this.frameCounter;
    }

    public getSpriteType(): AnimatedSpriteType {
        return this.spriteType;
    }

    public getState(): string {
        return this.state;
    }

    public setState(initState: string): void {
        this.state = initState;
        this.animationFrameIndex = 0;
        this.frameCounter = 0;
    }

    public update(delta: number): void {
        this.frameCounter++;

        // HAVE WE GONE PAST THE LAST FRAME IN THE ANIMATION?
        var currentAnimation = this.spriteType.getAnimation(this.state);
        var currentFrame = currentAnimation[this.animationFrameIndex];
        if (this.frameCounter > (currentFrame.duration)) {
            this.animationFrameIndex++;
            if (this.animationFrameIndex >= currentAnimation.length) {
                this.animationFrameIndex = 0;
            }
            this.frameCounter = 0;
        }



        console.log(this.ai.update());
        this.ai.resolveState(this);

    }

    public contains(pointX: number, pointY: number): boolean {
        let spriteWidth = this.getSpriteType().getSpriteWidth();
        let spriteHeight = this.getSpriteType().getSpriteHeight();
        let spriteLeft = this.getPosition().getX();
        let spriteRight = this.getPosition().getX() + spriteWidth;
        let spriteTop = this.getPosition().getY();
        let spriteBottom = this.getPosition().getY() + spriteHeight;
        if ((pointX < spriteLeft)
            || (spriteRight < pointX)
            || (pointY < spriteTop)
            || (spriteBottom < pointY)) {
            return false;
        }
        else {
            return true;
        }
    }

    /**RENAME THIS METHOD SO IT DENOTES PIXEL LOCATION IN TEXTURE */
    public getLeft(): number {
        return this.spriteType.getLeft(this.state, this.animationFrameIndex);
    }

    public getTop(): number {
        return this.spriteType.getTop(this.state, this.animationFrameIndex);
    }

    public toString(): string {
        let summary: string = "{ position: ("
            + this.getPosition().getX() + ", " + this.getPosition().getY() + ") "
            + "(state: " + this.getState() + ") "
            + "(animationFrameIndex: " + this.getAnimationFrameIndex() + ") "
            + "(frameCounter: " + this.getFrameCounter() + ") ";
        return summary;
    }



}