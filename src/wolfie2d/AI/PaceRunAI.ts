import { AIBehavior, State } from "./AIBehavior";
import { SceneGraph } from "../scene/SceneGraph";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";




export class PaceRunAI extends AIBehavior {

    private pacingBehavior: State[] = [State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.WALK, State.TURN_AROUND];

    constructor(scene: SceneGraph) {
        super(scene);
        this.setBehavior(this.pacingBehavior);
    }


    public generatePattern(): State[] {
        let pattern: State[] = [State.NONE];
        return pattern;
    }

    public resolveState(sprite: AnimatedSprite): void {
        let state = this.pattern[this.stateIndex];

        let player: AnimatedSprite;
        let playerInRange: boolean = false;
        let nearSprites: AnimatedSprite[] = this.scene.spritesInRange(sprite.getPosition().getX() - 178, sprite.getPosition().getY() - 178, 178);
        for (let tempSprite of nearSprites) {
            console.log(tempSprite.getSpriteType().getSpriteSheetTexture().webGLTextureId);
            if (tempSprite.getSpriteType().getSpriteSheetTexture().webGLTextureId == 3) {

                player = tempSprite;
                playerInRange = true;
            }
        }

        // console.log(playerInRange);

        if (playerInRange == true) {
            if (player.getPosition().getX() < sprite.getPosition().getX()) {
                sprite.setDirection(270);
            }
            if (player.getPosition().getX() > sprite.getPosition().getX()) {
                sprite.setDirection(90);
            }
            if (player.getPosition().getY() < sprite.getPosition().getY()) {
                sprite.setDirection(180);
            }
            if (player.getPosition().getY() > sprite.getPosition().getY()) {
                sprite.setDirection(0);
            }
            this.setBehavior([State.RUN]);
            state = this.pattern[this.stateIndex];
        }



        if (state == State.WALK) {
            if (sprite.getState() != "WALKING") {
                sprite.setState("WALKING");
            }
            if (sprite.getPosition().getX() <= 0) {
                sprite.getPosition().setX(sprite.getPosition().getX() + 10)
            }
            if (sprite.getPosition().getX() >= 3200) {
                sprite.getPosition().setX(sprite.getPosition().getX() - 10)
            }
            if (sprite.getPosition().getY() <= 0) {
                sprite.getPosition().setY(sprite.getPosition().getY() + 10)
            }
            if (sprite.getPosition().getY() >= 3200) {
                sprite.getPosition().setY(sprite.getPosition().getY() - 10)
            }

            switch (sprite.getDirection()) {
                case 0:
                    sprite.getPosition().setY(sprite.getPosition().getY() - 1);
                    break;
                case 90:
                    sprite.getPosition().setX(sprite.getPosition().getX() - 1);
                    break;
                case 180:
                    sprite.getPosition().setY(sprite.getPosition().getY() + 1);
                    break;
                case 270:
                    sprite.getPosition().setX(sprite.getPosition().getX() + 1);
                    break;
                default:
                    // console.error("illegal sprite direction", sprite.getDirection());
                    break;
            }
        } else if (state == State.TURN_AROUND) {
            sprite.setDirection(sprite.getDirection() + 180);
        } else if (state == State.RUN) {
            switch (sprite.getDirection()) {
                case 0:
                    sprite.getPosition().setY(sprite.getPosition().getY() - 10);
                    break;
                case 90:
                    sprite.getPosition().setX(sprite.getPosition().getX() - 10);
                    break;
                case 180:
                    sprite.getPosition().setY(sprite.getPosition().getY() + 10);
                    break;
                case 270:
                    sprite.getPosition().setX(sprite.getPosition().getX() + 10);
                    break;
                default:
                    // console.error("illegal sprite direction", sprite.getDirection());
                    break;
            }
            if (playerInRange == false) {
                sprite.setDirection(sprite.getDirection() + 90);
                this.setBehavior(this.pacingBehavior);
            }
        }
    }
}