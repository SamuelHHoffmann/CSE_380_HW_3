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
            sceneGraph.getPlayer().getPosition().getX() - sceneGraph.getPlayer().getSpriteType().getSpriteWidth(),
            sceneGraph.getPlayer().getPosition().getY() + sceneGraph.getPlayer().getSpriteType().getSpriteHeight(),
            sceneGraph.getPlayer().getSpriteType().getSpriteWidth() * 3);
        nonPlayerSprites.splice(nonPlayerSprites.indexOf(sceneGraph.getPlayer()), 1);

        let playerBoundingVolume: BoundingCircle = new BoundingCircle(sceneGraph.getPlayer());
        let spriteBoundingCircle: BoundingCircle = new BoundingCircle(sceneGraph.getPlayer());

        nonPlayerSprites.forEach(sprite => {
            spriteBoundingCircle.setX(sprite.getPosition().getX());
            spriteBoundingCircle.setY(sprite.getPosition().getY());
            spriteBoundingCircle.setRadius(sprite.getSpriteType().getSpriteWidth() / 2, sprite.getSpriteType().getSpriteHeight() / 2);

            if (spriteBoundingCircle.intersects(playerBoundingVolume)) {
                if (sprite.getSpriteType().getSpriteSheetTexture().webGLTextureId == 4) {
                    sprite.setState("DYING");
                    if (sprite ? sprite.hasAI : false) {
                        sprite.getAI().setBehavior([State.NONE]);
                    }
                }
            }
        });


    }
}