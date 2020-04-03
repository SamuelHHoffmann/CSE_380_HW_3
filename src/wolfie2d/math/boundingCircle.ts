import { Vector3 } from "./Vector3";
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";

/**
 * boudingCircle 
 * 
 * This class decorates the vector3 class using the fields to store x, y, and radius of a circle.
 * 
 */
export class BoundingCircle {
    private vec3: Vector3;

    public constructor(sprite: AnimatedSprite) {
        this.vec3 = new Vector3();

        this.vec3.setX(sprite.getPosition().getX() + (sprite.getSpriteType().getSpriteWidth() / 2));
        this.vec3.setY(sprite.getPosition().getY() - (sprite.getSpriteType().getSpriteHeight() / 2));

        let spriteWidth: number = sprite.getSpriteType().getSpriteWidth();
        let spriteHeight: number = sprite.getSpriteType().getSpriteHeight();

        this.vec3.setZ(Math.sqrt((spriteWidth / 2 * spriteWidth / 2) + (spriteHeight / 2 * spriteHeight / 2)));
    }

    public getRadius(): number {
        return this.vec3.getZ();
    }

    public getX(): number {
        return this.vec3.getX();
    }

    public getY(): number {
        return this.vec3.getY();
    }

    public setRadius(spriteWidth: number, spriteHeight: number): void {
        this.vec3.setZ(Math.sqrt((spriteWidth / 2 * spriteWidth / 2) + (spriteHeight / 2 * spriteHeight / 2)));
    }

    public setX(x: number): void {
        this.vec3.setX(x);
    }

    public setY(y: number): void {
        this.vec3.setY(y);
    }

    public intersects(bv2: BoundingCircle): boolean {

        let deltaX: number = this.getX() - bv2.getX();
        let deltaY: number = this.getY() - bv2.getY();
        let m: number = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

        if (m < this.getRadius() + bv2.getRadius()) {
            return true;
        }
        return false;
    }

    public print(): void {
        let text = "[X_POSITION: " + this.vec3.getX() + ", Y_POSITION: " + this.vec3.getY() + ", RADIUS: " + this.vec3.getZ() + "]";
        console.log(text);
    }
}