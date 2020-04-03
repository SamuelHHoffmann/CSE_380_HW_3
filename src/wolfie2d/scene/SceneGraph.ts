import { SceneObject } from './SceneObject'
import { AnimatedSprite } from './sprite/AnimatedSprite'
import { TiledLayer } from './tiles/TiledLayer'
import { TileSet } from './tiles/TileSet'
import { Viewport } from './Viewport'
import { GamePhysics } from '../physics/GamePhysics';

export class SceneGraph {
    // AND ALL OF THE ANIMATED SPRITES, WHICH ARE NOT STORED
    // SORTED OR IN ANY PARTICULAR ORDER. NOTE THAT ANIMATED SPRITES
    // ARE SCENE OBJECTS
    private animatedSprites: Array<AnimatedSprite>;

    // SET OF VISIBLE OBJECTS, NOTE THAT AT THE MOMENT OUR
    // SCENE GRAPH IS QUITE SIMPLE, SO THIS IS THE SAME AS
    // OUR LIST OF ANIMATED SPRITES
    private visibleSet: Array<SceneObject>;

    // WE ARE ALSO USING A TILING ENGINE FOR RENDERING OUR LEVEL
    // NOTE THAT WE MANAGE THIS HERE BECAUSE WE MAY INVOLVE THE TILED
    // LAYERS IN PHYSICS AND PATHFINDING AS WELL
    private tiledLayers: Array<TiledLayer>;
    private tileSets: Array<TileSet>;

    // THE VIEWPORT IS USED TO FILTER OUT WHAT IS NOT VISIBLE
    private viewport: Viewport;


    private player: AnimatedSprite;

    private mouse: number[] = [0, 0];


    private physicsSystem: GamePhysics = new GamePhysics();


    public constructor() {
        // DEFAULT CONSTRUCTOR INITIALIZES OUR DATA STRUCTURES
        this.clear();
    }

    public clear(): void {
        this.animatedSprites = [];
        this.visibleSet = [];
        this.tiledLayers = [];
        this.tileSets = [];
    }

    public setMouse(x: number, y: number): void {
        this.mouse[0] = x;
        this.mouse[1] = y
    }

    public getMouse(): number[] {
        return this.mouse;
    }

    public setPlayer(sprite: AnimatedSprite): void {
        this.player = sprite;
    }

    public getPlayer(): AnimatedSprite {
        return this.player;
    }

    public addTileSet(tileSetToAdd: TileSet): number {
        return this.tileSets.push(tileSetToAdd) - 1;
    }

    public getNumTileSets(): number {
        return this.tileSets.length;
    }

    public getTileSet(index: number): TileSet {
        return this.tileSets[index];
    }

    public addLayer(layerToAdd: TiledLayer): void {
        this.tiledLayers.push(layerToAdd);
    }

    public getNumTiledLayers(): number {
        return this.tiledLayers.length;
    }

    public getTiledLayers(): Array<TiledLayer> {
        return this.tiledLayers;
    }

    public getTiledLayer(layerIndex: number): TiledLayer {
        return this.tiledLayers[layerIndex];
    }

    public getNumSprites(): number {
        return this.animatedSprites.length;
    }

    public setViewport(initViewport: Viewport): void {
        this.viewport = initViewport;
    }

    public getViewport(): Viewport {
        return this.viewport;
    }

    public addAnimatedSprite(sprite: AnimatedSprite): void {
        this.animatedSprites.push(sprite);
    }

    public getSpriteAt(testX: number, testY: number): AnimatedSprite {
        for (let sprite of this.animatedSprites) {
            if (sprite.contains(testX, testY))
                return sprite;
        }
        return null;
    }

    /**
     * update
     * 
     * Called once per frame, this function updates the state of all the objects
     * in the scene.
     * 
     * @param delta The time that has passed since the last time this update
     * funcation was called.
     */
    public update(delta: number): void {
        this.physicsSystem.update(this);
        for (let sprite of this.animatedSprites) {
            sprite.update(delta);
        }
    }

    public scope(): Array<SceneObject> {
        // CLEAR OUT THE OLD
        this.visibleSet = [];

        // PUT ALL THE SCENE OBJECTS INTO THE VISIBLE SET
        for (let sprite of this.animatedSprites) {
            // if (sprite.getPosition().getX() + sprite.getSpriteType().getSpriteWidth() >= this.viewport.getX()) {
            //     if (sprite.getPosition().getX() <= this.viewport.getX() + this.viewport.getWidth()) {
            //         if (sprite.getPosition().getY() + sprite.getSpriteType().getSpriteHeight() >= this.viewport.getY()) {
            //             if (sprite.getPosition().getY() <= this.viewport.getY() + this.viewport.getHeight()) {

            //             }
            //         }
            //     }
            // }
            this.visibleSet.push(sprite);
        }

        return this.visibleSet;
    }

    public spritesInRange(xPos: number, yPos: number, range: number): AnimatedSprite[] {
        let spritesInRange: AnimatedSprite[] = [];

        for (let sprite of this.animatedSprites) {
            if (sprite.getPosition().getX() + sprite.getSpriteType().getSpriteWidth() >= xPos && sprite.getPosition().getX() <= xPos + range) {
                if (sprite.getPosition().getY() - sprite.getSpriteType().getSpriteHeight() <= yPos && sprite.getPosition().getY() >= yPos - range) {
                    spritesInRange.push(sprite);
                }
            }
        }
        return spritesInRange;
    }


}