/*
 * TiledScrollingDemo.ts - demonstrates how tiled layers can be rendered
 * and scrolled using a viewport. 
 */
import { Game } from '../wolfie2d/Game'
import { AnimatedSprite } from '../wolfie2d/scene/sprite/AnimatedSprite'
import { AnimatedSpriteType } from '../wolfie2d/scene/sprite/AnimatedSpriteType'
import { TiledLayer } from '../wolfie2d/scene/tiles/TiledLayer'
import { SceneGraph } from '../wolfie2d/scene/SceneGraph'
import { Viewport } from '../wolfie2d/scene/Viewport'
import { TextToRender, TextRenderer } from '../wolfie2d/rendering/TextRenderer'
import { AIBehavior } from '../wolfie2d/AI/AIBehavior'
import { RandomWalkAI } from '../wolfie2d/AI/RandomWalkAI'
import { PaceRunAI } from '../wolfie2d/AI/PaceRunAI'
import { PlayerAI } from '../wolfie2d/AI/PlayerAI'

// THIS IS THE ENTRY POINT INTO OUR APPLICATION, WE MAKE
// THE Game OBJECT AND INITIALIZE IT WITH THE CANVASES
let game = new Game("game_canvas", "text_canvas");

// WE THEN LOAD OUR GAME SCENE, WHICH WILL FIRST LOAD
// ALL GAME RESOURCES, THEN CREATE ALL SHADERS FOR
// RENDERING, AND THEN PLACE ALL GAME OBJECTS IN THE SCENE.
// ONCE IT IS COMPLETED WE CAN START THE GAME
const DESERT_SCENE_PATH = "resources/scenes/ScrollableDesert.json";
game.getResourceManager().loadScene(DESERT_SCENE_PATH,
    game.getSceneGraph(),
    game.getRenderingSystem(),
    function () {



        // ADD ANY CUSTOM STUFF WE NEED HERE, LIKE TEXT RENDERING
        // LET'S ADD A BUNCH OF RANDOM SPRITES
        let world: TiledLayer[] = game.getSceneGraph().getTiledLayers();
        let worldWidth: number = world[0].getColumns() * world[0].getTileSet().getTileWidth();
        let worldHeight: number = world[0].getRows() * world[0].getTileSet().getTileHeight();
        // let randomX: number = Math.random() * worldWidth;
        // let randomY: number = Math.random() * worldHeight;
        for (let i = 0; i < 50; i++) {
            let type: AnimatedSpriteType = game.getResourceManager().getAnimatedSpriteType("COCKROACH");
            let ai: AIBehavior = new RandomWalkAI(game.getSceneGraph());
            let randomSprite: AnimatedSprite = new AnimatedSprite(type, "IDLE");
            randomSprite.setAI(ai);
            let randomX: number = Math.random() * worldWidth;
            let randomY: number = Math.random() * worldHeight;
            randomSprite.getPosition().set(randomX, randomY, 0, 1);
            randomSprite.setDirection(90 * Math.floor(Math.random() * 4));
            game.getSceneGraph().addAnimatedSprite(randomSprite);
        }
        for (let i = 0; i < 50; i++) {
            let type: AnimatedSpriteType = game.getResourceManager().getAnimatedSpriteType("CAMEL_SPIDER");
            let ai: AIBehavior = new PaceRunAI(game.getSceneGraph()); // make other AI and change class
            let randomSprite: AnimatedSprite = new AnimatedSprite(type, "IDLE");
            console.log(randomSprite.getSpriteType().getSpriteSheetTexture().webGLTextureId);
            randomSprite.setAI(ai);
            let randomX: number = Math.random() * worldWidth;
            let randomY: number = Math.random() * worldHeight;
            randomSprite.getPosition().set(randomX, randomY, 0, 1);
            randomSprite.setDirection(90 * Math.floor(Math.random() * 4));
            game.getSceneGraph().addAnimatedSprite(randomSprite);
        }


        let type: AnimatedSpriteType = game.getResourceManager().getAnimatedSpriteType("FUNNEL_WEB_SPIDER");
        let ai: AIBehavior = new PlayerAI(game.getSceneGraph());
        let player: AnimatedSprite = new AnimatedSprite(type, "IDLE");
        player.setAI(ai);
        player.setIgnoreViewport();
        player.getPosition().set(worldWidth / 5, worldHeight / 8, 0, 1);
        player.setDirection(90 * Math.floor(Math.random() * 4));
        game.getSceneGraph().addAnimatedSprite(player);
        game.getSceneGraph().setPlayer(player)
        // console.log(randomSprite.getSpriteType().getSpriteSheetTexture().webGLTextureId);



        // NOW ADD TEXT RENDERING. WE ARE GOING TO RENDER 3 THINGS:
        // NUMBER OF SPRITES IN THE SCENE
        // LOCATION IN GAME WORLD OF VIEWPORT
        // NUMBER OF SPRITES IN VISIBLE SET (i.e. IN THE VIEWPORT)
        let sceneGraph: SceneGraph;
        sceneGraph = game.getSceneGraph();
        let spritesInSceneText: TextToRender = new TextToRender("Sprites in Scene", "", 20, 50, function () {
            spritesInSceneText.text = "Sprites in Scene: " + sceneGraph.getNumSprites();
        });
        let viewportText: TextToRender = new TextToRender("Viewport", "", 20, 70, function () {
            let viewport: Viewport = sceneGraph.getViewport();
            viewportText.text = "Viewport (w, h, x, y): (" + viewport.getWidth() + ", "
                + viewport.getHeight() + ", "
                + viewport.getX() + ", "
                + viewport.getY() + ")";
        });
        let spritesInViewportText: TextToRender = new TextToRender("Sprites in Viewport", "", 20, 90, function () {
            spritesInViewportText.text = "Sprites in Viewport: " + sceneGraph.scope().length;
        });
        let worldDimensionsText: TextToRender = new TextToRender("World Dimensions", "", 20, 110, function () {
            worldDimensionsText.text = "World Dimensions (w, h): (" + worldWidth + ", " + worldHeight + ")";
        });
        let textRenderer = game.getRenderingSystem().getTextRenderer();
        textRenderer.addTextToRender(spritesInSceneText);
        textRenderer.addTextToRender(viewportText);
        textRenderer.addTextToRender(spritesInViewportText);
        textRenderer.addTextToRender(worldDimensionsText);

        // AND START THE GAME LOOP
        game.start();
    });