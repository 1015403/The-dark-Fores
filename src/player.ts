import * as PIXI from "pixi.js"
import { Game } from "./game"

export class Player extends PIXI.Sprite {

    xspeed = 0
    yspeed = 0
    game:Game

    constructor(game:Game, texture: PIXI.Texture) {
        super(texture)

        this.game = game
        this.anchor.set(0.5,0.5)
        this.x = game.pixi.screen.width
        this.y = game.pixi.screen.height

        window.addEventListener("keydown", (e: KeyboardEvent) => this.pressKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.pressKeyUp(e))
    } 

    update(delta: number) {
        let mapwidth = 1920
        let mapheight = 1080
        let centerx = 350
        let centery = 250

        // beweeg het karakter over de map maar niet buiten beeld
        this.x = this.clamp(this.x + this.xspeed, 0, mapwidth)
        this.y = this.clamp(this.y + this.yspeed, 0, mapheight)

        // centreer het hele level onder het karakter, gebruik clamp om bij de randen niet te scrollen
        let mapx = this.clamp(this.x, centerx, mapwidth - centerx)
        let mapy = this.clamp(this.y, centery, mapheight - centery)
        this.game.pixi.stage.pivot.set(mapx, mapy)        
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }

    // druk event aan het toetsenbord koppelen
    pressKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -5
                this.scale.set(1, 1)
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 5
                this.scale.set(-1, 1)
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -5
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 5
                break
        }
    }

    //Event aan toetsen koppelen wanneer toets losgelaten word
    pressKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}
