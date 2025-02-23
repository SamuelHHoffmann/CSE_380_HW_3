import { SceneGraph } from '../scene/SceneGraph'
import { AnimatedSprite } from '../scene/sprite/AnimatedSprite'
import { SceneObject } from '../scene/SceneObject';
import { Vector3 } from '../math/Vector3';
import { BoundingCircle } from '../math/boundingCircle';
import { State } from '../AI/AIBehavior';

export class GamePhysics {
    constructor() {

    }

    update(sceneGraph: SceneGraph): void {
        // UPDATE ALL OBJECT POSITIONS ACCORDING TO THEIR VELOCITIES
        // BUT MAKE SURE TO PERFORM COLLISION DETECTION AS WELL
        // NOTE, FOR THIS YOU SHOULD MAKE SURE EACH SCENE OBJECT
        // HAS A BOUNDING VOLUME LIKE EITHER AN AABB OR A CIRCLE

        let nonPlayerSprites: AnimatedSprite[] = sceneGraph.spritesInRange(
            sceneGraph.getPlayer().getPosition().getX(),
            sceneGraph.getPlayer().getPosition().getY(),
            sceneGraph.getPlayer().getSpriteType().getSpriteWidth());
        nonPlayerSprites.splice(nonPlayerSprites.indexOf(sceneGraph.getPlayer()), 1);

        let playerBoundingVolume: BoundingCircle = new BoundingCircle(sceneGraph.getPlayer());
        let spriteBoundingCircle: BoundingCircle = new BoundingCircle(sceneGraph.getPlayer());

        nonPlayerSprites.forEach(sprite => {
            spriteBoundingCircle.setX(sprite.getPosition().getX() - sprite.getSpriteType().getSpriteWidth() / 2);
            spriteBoundingCircle.setY(sprite.getPosition().getY() + sprite.getSpriteType().getSpriteHeight() / 2);
            spriteBoundingCircle.setRadius(sprite.getSpriteType().getSpriteWidth() / 2, sprite.getSpriteType().getSpriteHeight() / 2);
            // These bounding Circles are not being used becuase boundign boxes worked better since my sprites only rotate 90 degrees

            if (sprite.getSpriteType().getSpriteSheetTexture().webGLTextureId == 4) {
                if (sprite.getState() != "DYING" && sprite.getState() != "DEAD") {
                    sprite.setState("DYING");
                    sprite.kill();
                    if (sprite ? sprite.hasAI : false) {
                        sprite.getAI().setBehavior([State.NONE]);
                    }
                }
            } else if (sprite.getSpriteType().getSpriteSheetTexture().webGLTextureId == 5) {
                switch (sprite.getDirection()) {
                    case 0:
                        sprite.getPosition().setY(sprite.getPosition().getY() - 40);
                        break;
                    case 90:
                        sprite.getPosition().setX(sprite.getPosition().getX() - 40);
                        break;
                    case 180:
                        sprite.getPosition().setY(sprite.getPosition().getY() + 40);
                        break;
                    case 270:
                        sprite.getPosition().setX(sprite.getPosition().getX() + 40);
                        break;
                    default:
                        // console.error("illegal sprite direction", sprite.getDirection());
                        break;
                }
            }


        });


    }
}