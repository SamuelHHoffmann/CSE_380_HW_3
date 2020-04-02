import { AnimatedSprite } from "../scene/sprite/AnimatedSprite";
import { SceneGraph } from "../scene/SceneGraph";

export enum State {
    WALK = "WALK",
    RUN = "RUN",
    TURN_NORTH = "TURN_NORTH",
    TURN_SOUTH = "TURN_SOUTH",
    TURN_EAST = "TURN_EAST",
    TURN_WEST = "TURN_WEST",
    TURN_RAND = "TURN_RAND",
    TURN_AROUND = "TURN_AROUND",
    NONE = "NONE",
}

export abstract class AIBehavior {

    protected stateIndex: number;
    protected pattern: State[];
    protected scene: SceneGraph;


    constructor(scene: SceneGraph) {
        this.stateIndex = 0;
        this.pattern = [];
        this.scene = scene;
    }

    public setBehavior(pattern: State[]): void {
        this.pattern = pattern;
        this.stateIndex = 0;
    }

    public update(): State {
        // console.group("AIBehavior.update()")
        // console.log("inital stateIndex", this.stateIndex);
        let state = this.pattern[this.stateIndex];
        // console.log("state", state);
        this.stateIndex++;
        // console.log("incremented stateIndex", this.stateIndex)
        if (this.stateIndex >= this.pattern.length) {
            // console.log("no more states");
            this.stateIndex = 0;
            // console.log("resetting stateIndex", this.stateIndex)
        }
        // console.groupEnd();
        return state;
    }

    abstract resolveState(sprite: AnimatedSprite): void;

    abstract generatePattern(): State[];
}

