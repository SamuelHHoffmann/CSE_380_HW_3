/*
 * This provides responses to UI input.
 */
import { AnimatedSprite } from "../scene/sprite/AnimatedSprite"
import { SceneGraph } from "../scene/SceneGraph"
import { State } from "../AI/AIBehavior";

export class UIController {
    private spriteToDrag: AnimatedSprite;
    private scene: SceneGraph;
    private dragOffsetX: number;
    private dragOffsetY: number;

    private keys: string[];

    public constructor(canvasId: string, initScene: SceneGraph) {
        this.spriteToDrag = null;
        this.scene = initScene;
        this.dragOffsetX = -1;
        this.dragOffsetY = -1;

        this.keys = [];

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        canvas.tabIndex = 1;
        // canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        // canvas.addEventListener("mouseup", this.mouseUpHandler);
        // canvas.addEventListener("keydown", this.keybaordPress);
        canvas.addEventListener("keypress", this.keybaordPressHeld);
        canvas.addEventListener("keydown", this.keybaordPressDown);
        canvas.addEventListener("keyup", this.keybaordPressUp);
    }

    // public mouseDownHandler = (event: MouseEvent): void => {
    //     let mousePressX: number = event.clientX;
    //     let mousePressY: number = event.clientY;
    //     let sprite: AnimatedSprite = this.scene.getSpriteAt(mousePressX, mousePressY);
    //     console.log("mousePressX: " + mousePressX);
    //     console.log("mousePressY: " + mousePressY);
    //     console.log("sprite: " + sprite);
    //     if (sprite != null) {
    //         // START DRAGGING IT
    //         this.spriteToDrag = sprite;
    //         this.dragOffsetX = sprite.getPosition().getX() - mousePressX;
    //         this.dragOffsetY = sprite.getPosition().getY() - mousePressY;
    //     }
    // }

    public mouseMoveHandler = (event: MouseEvent): void => {
        let player: AnimatedSprite = this.scene.getPlayer();

        // let targetX: number = event.clientX - (player.getSpriteType().getSpriteWidth() / 2);
        // let targetY: number = event.clientY - (player.getSpriteType().getSpriteHeight() / 2);

        // let deltaX: number = targetX - (player ? player.getPosition().getX() : 0);
        // let deltaY: number = targetY - (player ? player.getPosition().getY() : 0);
        // let behaviorPath: State[] = [];
        // player.getAI().setBehavior([State.NONE]);


        // player.getPosition().setX(player.getPosition().getX() + deltaX);
        // player.getPosition().setY(player.getPosition().getY() + deltaY);

        // console.log(deltaX);
        // console.log(deltaY);

        // player.setDirection(Math.atan(deltaY / deltaX) * (180 / Math.PI));

        // if (deltaX < 0) {
        //     deltaX = Math.abs(deltaX);
        //     behaviorPath.push(State.TURN_EAST);
        // } else {
        //     // behaviorPath.push(State.TURN_WEST);
        //     behaviorPath.push(State.TURN_WEST);
        // }
        // for (let i = 0; i < deltaX; i++) {
        //     behaviorPath.push(State.WALK);
        // }
        // if (deltaY < 0) {
        //     deltaY = Math.abs(deltaY);
        //     behaviorPath.push(State.TURN_NORTH);
        // } else {
        //     behaviorPath.push(State.TURN_SOUTH);
        // }
        // for (let i = 0; i < deltaY; i++) {
        //     behaviorPath.push(State.WALK);
        // }
        // behaviorPath.push(State.NONE);
        player.getAI().setBehavior([State.WALK]);
        this.scene.setMouse(event.clientX, event.clientY);
    }

    // public mouseUpHandler = (event: MouseEvent): void => {
    //     this.spriteToDrag = null;
    // }


    public keybaordPressDown = (event: KeyboardEvent): void => {
        if (event.code == "KeyA" || event.code == "KeyS" || event.code == "KeyW" || event.code == "KeyD") {
            let code = event.code;
            if (this.keys.indexOf(code) == -1) {
                this.keys.push(code);
            }
        }
    }


    public keybaordPressHeld = (event: KeyboardEvent): void => {
        if (event.code == "KeyA" || event.code == "KeyS" || event.code == "KeyW" || event.code == "KeyD") {
            let viewport = this.scene.getViewport();
            var xOffset = 0;
            var yOffset = 0;
            this.keys.forEach(letter => {

                if (letter == 'KeyW') {
                    console.log('KeyPress: W');
                    yOffset += 10;
                } else if (letter == 'KeyA') {
                    console.log('KeyPress: A');
                    xOffset -= 10;
                } else if (letter == 'KeyS') {
                    console.log('KeyPress: S');
                    yOffset -= 10;
                } else if (letter == 'KeyD') {
                    console.log('KeyPress: D');
                    xOffset += 10;
                }
            });

            viewport.setPosition(viewport.getX() + xOffset, viewport.getY() + yOffset);
        }
    }

    public keybaordPressUp = (event: KeyboardEvent): void => {
        let code = event.code;
        this.keys.splice(this.keys.indexOf(code), 1);
    }


}