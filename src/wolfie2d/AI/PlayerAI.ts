import { AIBehavior, State } from "./AIBehavior";
import { SceneGraph } from "../scene/SceneGraph";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";




export class PlayerAI extends AIBehavior {

    // private flip: boolean = false;

    constructor(scene: SceneGraph) {
        super(scene);
        this.setBehavior([State.WALK]);
    }


    public generatePattern(): State[] {
        let pattern: State[] = [State.NONE];
        return pattern;
    }

    public resolveState(sprite: AnimatedSprite): void {
        let state = this.pattern[this.stateIndex];

        let targetX: number = this.scene.getMouse()[0] - (sprite.getSpriteType().getSpriteWidth() / 2);
        let targetY: number = this.scene.getMouse()[1] - (sprite.getSpriteType().getSpriteHeight() / 2);

        let deltaX: number = targetX - sprite.getPosition().getX();
        let deltaY: number = targetY - sprite.getPosition().getY();

        let worldWidth: number = this.scene.getTiledLayers()[0].getColumns() * this.scene.getTiledLayers()[0].getTileSet().getTileWidth();
        let worldHeight: number = this.scene.getTiledLayers()[0].getRows() * this.scene.getTiledLayers()[0].getTileSet().getTileHeight();

        if (Math.abs(deltaX) <= 6 && Math.abs(deltaY) <= 6) {
            state = State.NONE;
        }

        if (state == State.WALK) {
            if (sprite.getState() != "WALKING") {
                sprite.setState("WALKING");
            }
            if (sprite.getPosition().getX() <= 0) {
                sprite.getPosition().setX(sprite.getPosition().getX() + 10)
            }
            if (sprite.getPosition().getX() >= worldWidth) {
                sprite.getPosition().setX(sprite.getPosition().getX() - 10)
            }
            if (sprite.getPosition().getY() <= 0) {
                sprite.getPosition().setY(sprite.getPosition().getY() + 10)
            }
            if (sprite.getPosition().getY() >= worldHeight) {
                sprite.getPosition().setY(sprite.getPosition().getY() - 10)
            }

            let delta1: number = deltaX;
            let delta2: number = deltaY;

            if (delta1 > 6) {
                sprite.setDirection(270);
                sprite.getPosition().setX(sprite.getPosition().getX() + 3);
            } else if (delta1 < -6) {
                sprite.setDirection(90);
                sprite.getPosition().setX(sprite.getPosition().getX() - 3);
            } else if (delta2 > 6) {
                sprite.setDirection(180);
                sprite.getPosition().setY(sprite.getPosition().getY() + 3);
            } else if (delta2 < -6) {
                sprite.setDirection(0);
                sprite.getPosition().setY(sprite.getPosition().getY() - 3);
            }



        } else if (state == State.NONE) {
            this.setBehavior([State.NONE]);
            if (sprite.getState() != "IDLE") {
                sprite.setState("IDLE");
            }
            // this.flip = (Math.floor(Math.random() * 3) == 1);
        }
    }
}