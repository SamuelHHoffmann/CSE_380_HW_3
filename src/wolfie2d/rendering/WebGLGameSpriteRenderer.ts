import { WebGLGameRenderingComponent } from './WebGLGameRenderingComponent'
import { MathUtilities } from '../math/MathUtilities'
import { AnimatedSprite } from '../scene/sprite/AnimatedSprite'
import { AnimatedSpriteType } from '../scene/sprite/AnimatedSpriteType'
import { WebGLGameTexture } from './WebGLGameTexture'
import { Viewport } from '../scene/Viewport'
import { Vector3 } from '../math/Vector3'

export class WebGLGameSpriteRenderer extends WebGLGameRenderingComponent {

    public constructor() {
        super();
    }

    public getVertexData(): Float32Array {
        return new Float32Array([
            -0.5, 0.5, 0.0, 0.0,
            -0.5, -0.5, 0.0, 1.0,
            0.5, 0.5, 1.0, 0.0,
            0.5, -0.5, 1.0, 1.0
        ]);
    }
    public getShaderAttributeNames(): string[] {
        return [this.A_POSITION, this.A_TEX_COORD];
    }
    public getShaderUniformNames(): string[] {
        return [this.U_MESH_TRANSFORM, this.U_SAMPLER, this.U_TEX_COORD_FACTOR, this.U_TEX_COORD_SHIFT];
    }

    public render(webGL: WebGLRenderingContext,
        viewport: Viewport,
        visibleSprites: Array<AnimatedSprite>): void {
        // SELECT THE ANIMATED SPRITE RENDERING SHADER PROGRAM FOR USE
        let shaderProgramToUse = this.shader.getProgram();
        webGL.useProgram(shaderProgramToUse);

        // AND THEN RENDER EACH ONE
        for (let sprite of visibleSprites) {
            this.renderAnimatedSprite(webGL, viewport, sprite);
        }
    }

    private renderAnimatedSprite(webGL: WebGLRenderingContext,
        viewport: Viewport,
        sprite: AnimatedSprite): void {
        // YOU'LL NEED TO UPDATE THIS METHOD TO MAKE SURE SPRITES SCROLL AND ROTATE

        let canvasWidth: number = webGL.canvas.width;
        let canvasHeight: number = webGL.canvas.height;
        let spriteType: AnimatedSpriteType = sprite.getSpriteType();
        let texture: WebGLGameTexture = spriteType.getSpriteSheetTexture();

        // CALCULATE HOW MUCH TO TRANSLATE THE QUAD PER THE SPRITE POSITION
        let spriteWidth: number = spriteType.getSpriteWidth();
        let spriteHeight: number = spriteType.getSpriteHeight();
        let spriteXInPixels: number = sprite.getPosition().getX() + (spriteWidth / 2) - (viewport.getX());
        let spriteYInPixels: number = sprite.getPosition().getY() + (spriteHeight / 2) + (viewport.getY());
        let spriteXTranslate: number = (spriteXInPixels - (canvasWidth / 2)) / (canvasWidth / 2);
        let spriteYTranslate: number = (spriteYInPixels - (canvasHeight / 2)) / (canvasHeight / 2);
        this.meshTranslate.setX(spriteXTranslate);
        this.meshTranslate.setY(-spriteYTranslate);



        var tempRotation: number = sprite.getDirection();
        var rotationDegrees: number = tempRotation * (Math.PI / 180);
        var rotationSin: number = Math.sin(rotationDegrees);
        var rotationCos: number = Math.cos(rotationDegrees);


        // CALCULATE HOW MUCH TO SCALE THE QUAD PER THE SPRITE SIZE
        let defaultWidth: number = canvasWidth;
        let defaultHeight: number = canvasHeight;
        let scaleX: number = 2 * spriteWidth / defaultWidth;
        let scaleY: number = 2 * spriteHeight / defaultHeight;
        let flipAngleWidth = Math.atan(defaultWidth / defaultHeight) * (180 / Math.PI);
        let filpAngleHeight = Math.atan(defaultHeight / defaultWidth) * (180 / Math.PI);
        // console.log(flipAngle);
        // console.log(filpAngle2);
        // console.log(defaultHeight);
        // console.log(defaultWidth);
        // let scaleX: number;
        // let scaleY: number;



        // let otherRotation: number = tempRotation;
        // // if (tempRotation > 180) {
        // //     otherRotation -= 180;
        // // }

        // <testing>
        // rotationDegrees %= 90;

        // if (rotationDegrees <= flipAngleWidth) {
        //     scaleX = 2 * spriteWidth / (2 * ((defaultWidth / 2) / Math.cos(rotationDegrees)));
        // } else {
        //     scaleX = 2 * spriteWidth / (2 * ((defaultHeight / 2) / Math.cos(90 - rotationDegrees)));
        // }

        // if (rotationDegrees <= filpAngleHeight) {
        //     scaleY = 2 * spriteHeight / (2 * ((defaultHeight / 2) / Math.cos(rotationDegrees)));
        // } else {
        //     scaleY = 2 * spriteWidth / (2 * ((defaultWidth / 2) / Math.cos(90 - rotationDegrees)))
        // }

        // this.meshScale.set(scaleX, scaleY, 0.0, 0.0);
        // </Testing>

        // if (otherRotation >= 0 && otherRotation <= flipAngle) {
        //     scaleX = 2 * spriteWidth / (2 * ((defaultWidth / 2) / Math.cos(rotationDegrees)));
        //     scaleY = 2 * spriteHeight / (2 * ((defaultHeight / 2) / Math.cos(rotationDegrees)));
        // } else if (otherRotation > flipAngle && otherRotation < 90) {
        //     scaleY = 2 * spriteWidth / (2 * ((defaultHeight / 2) / Math.cos((Math.PI / 2) - rotationDegrees)));
        //     scaleX = 2 * spriteHeight / (2 * ((defaultHeight / 2) / Math.cos(rotationDegrees)));
        // } else if (otherRotation >= 90 && otherRotation <= filpAngle2 + 90) {
        //     scaleY = 2 * spriteWidth / (2 * ((defaultHeight / 2) / Math.cos((Math.PI) - rotationDegrees)));
        //     scaleX = 2 * spriteHeight / (2 * ((defaultHeight / 2) / Math.cos((Math.PI / 2) - (Math.PI) - rotationDegrees)));
        // } else {
        //     scaleX = 2 * spriteWidth / (2 * ((defaultWidth / 2) / Math.cos((Math.PI) - rotationDegrees)));
        //     scaleY = 2 * spriteHeight / (2 * ((defaultHeight / 2) / Math.cos((Math.PI) - rotationDegrees)));
        // }


        this.meshScale.set(Math.abs(rotationCos * scaleX) + Math.abs(rotationSin * scaleY), Math.abs(rotationCos * scaleY) + Math.abs(rotationSin * scaleX), 0.0, 0.0);

        this.meshRotate.set(0.0, 0.0, tempRotation * 0.0174533, 0.0); // rotate on z axis


        // @todo - COMBINE THIS WITH THE ROTATE AND SCALE VALUES FROM THE SPRITE
        MathUtilities.identity(this.meshTransform);
        MathUtilities.model(this.meshTransform, this.meshTranslate, this.meshRotate, this.meshScale);

        // FIGURE OUT THE TEXTURE COORDINATE FACTOR AND SHIFT
        let texCoordFactorX: number = spriteWidth / texture.width;
        let texCoordFactorY: number = spriteHeight / texture.height;
        let spriteLeft: number = sprite.getLeft();
        let spriteTop: number = sprite.getTop();
        let texCoordShiftX: number = spriteLeft / texture.width;
        let texCoordShiftY: number = spriteTop / texture.height;

        // USE THE ATTRIBUTES
        webGL.bindBuffer(webGL.ARRAY_BUFFER, this.vertexDataBuffer);
        webGL.bindTexture(webGL.TEXTURE_2D, texture.webGLTexture);

        // HOOK UP THE ATTRIBUTES
        let a_PositionLocation: GLuint = this.webGLAttributeLocations.get(this.A_POSITION);
        webGL.vertexAttribPointer(a_PositionLocation, this.FLOATS_PER_TEXTURE_COORDINATE, webGL.FLOAT, false, this.TOTAL_BYTES, this.VERTEX_POSITION_OFFSET);
        webGL.enableVertexAttribArray(a_PositionLocation);
        let a_TexCoordLocation: GLuint = this.webGLAttributeLocations.get(this.A_TEX_COORD);
        webGL.vertexAttribPointer(a_TexCoordLocation, this.FLOATS_PER_TEXTURE_COORDINATE, webGL.FLOAT, false, this.TOTAL_BYTES, this.TEXTURE_COORDINATE_OFFSET);
        webGL.enableVertexAttribArray(a_TexCoordLocation);

        // USE THE UNIFORMS
        let u_MeshTransformLocation: WebGLUniformLocation = this.webGLUniformLocations.get(this.U_MESH_TRANSFORM);
        webGL.uniformMatrix4fv(u_MeshTransformLocation, false, this.meshTransform.getData());

        let u_SamplerLocation: WebGLUniformLocation = this.webGLUniformLocations.get(this.U_SAMPLER);
        webGL.uniform1i(u_SamplerLocation, texture.webGLTextureId);

        let u_TexCoordFactorLocation: WebGLUniformLocation = this.webGLUniformLocations.get(this.U_TEX_COORD_FACTOR);
        webGL.uniform2f(u_TexCoordFactorLocation, texCoordFactorX, texCoordFactorY);

        let u_TexCoordShiftLocation: WebGLUniformLocation = this.webGLUniformLocations.get(this.U_TEX_COORD_SHIFT);
        webGL.uniform2f(u_TexCoordShiftLocation, texCoordShiftX, texCoordShiftY);

        // Rotation
        // let u_RotationLocation: WebGLUniformLocation = this.webGLAttributeLocations.get(this.U_ROTATION);
        // webGL.uniform2fv(u_RotationLocation, rotation);


        // DRAW THE SPRITE AS A TRIANGLE STRIP USING 4 VERTICES, STARTING AT THE START OF THE ARRAY (index 0)
        webGL.drawArrays(webGL.TRIANGLE_STRIP, this.INDEX_OF_FIRST_VERTEX, this.NUM_VERTICES);
    }
}