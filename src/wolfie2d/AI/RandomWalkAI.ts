import { AIBehavior } from "./AIBehavior";
import { SceneGraph } from "../scene/SceneGraph";
import { State } from "./AIBehavior";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";



export class RandomWalkAI extends AIBehavior {



    constructor(scene: SceneGraph) {
        super(scene);
        this.setBehavior(this.generatePattern());
    }


    public generatePattern(): State[] {
        let pattern: State[] = [];
        for (let x = 0; x < 25 + Math.floor(Math.random() * 175); x++) {
            pattern.push(State.WALK);
        }
        pattern.push(State.TURN_RAND);
        return pattern;
    }

    public resolveState(sprite: AnimatedSprite): void {
        let state = this.pattern[this.stateIndex];

        if (state == State.WALK) {
            if (sprite.getState() != "WALKING") {
                sprite.setState("WALKING");
            }


            switch (sprite.getDirection()) {
                case 0:
                    sprite.getPosition().setY(sprite.getPosition().getY() - 1);
                    break;
                case 90:
                    if (sprite.getLeft() == 0) {
                        sprite.setDirection(270);
                        sprite.getPosition().setX(sprite.getPosition().getX() + 1);
                    } else {
                        sprite.getPosition().setX(sprite.getPosition().getX() - 1);
                    }
                    break;
                case 180:
                    if (sprite.getTop() == 0) {
                        sprite.setDirection(0);
                        sprite.getPosition().setY(sprite.getPosition().getY() - 1);
                    } else {
                        sprite.getPosition().setY(sprite.getPosition().getY() + 1);
                    }
                    break;
                case 270:
                    sprite.getPosition().setX(sprite.getPosition().getX() + 1);
                    break;
                default:
                    // console.error("illegal sprite direction", sprite.getDirection());
                    break;
            }
        } else if (state == State.TURN_RAND) {
            let tempRandNum = Math.floor(Math.random() * 2);
            if (tempRandNum == 0) {
                sprite.setDirection(sprite.getDirection() + 90);
            } else {
                sprite.setDirection(sprite.getDirection() + 270);
            }
        }
    }


}