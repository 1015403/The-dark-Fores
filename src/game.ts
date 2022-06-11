import * as PIXI from "pixi.js";
import { Player } from "./player";
import { Unicorn } from "./unicorn";

import harryImage from "./images/harry.png";
import backgroundImage from "./images/forest.png";
import unicornImage from "./images/unicorn.png";
import happyUnicornImage from "./images/happyUnicorn.png";

export class Game {
    pixi: PIXI.Application;
    loader: PIXI.Loader;
    player: Player;
    background: PIXI.Sprite;
    unicorns: Unicorn[] = [];

    constructor() {
        this.pixi = new PIXI.Application({ width: 600, height: 400 });
        document.body.appendChild(this.pixi.view);
    
        this.loader = new PIXI.Loader();
        this.loader
          .add("playerTexture", harryImage)
          .add("backgroundTexture", backgroundImage)
          .add("unicornTexture", unicornImage)
          .add("happyUnicornTexture", happyUnicornImage);
    
        this.loader.load(() => this.doneLoading());
      }

      doneLoading() {
        this.background = new PIXI.Sprite(
          this.loader.resources["backgroundTexture"].texture!
        );
        this.pixi.stage.addChild(this.background);
        
        for (let i = 0; i < 3; i++) {
            let unicorn = new Unicorn(
              this,
              this.loader.resources["unicornTexture"].texture!,
              this.loader.resources["happyUnicornTexture"].texture!
            );
            this.pixi.stage.addChild(unicorn);
            this.unicorns.push(unicorn);
          }

          this.player = new Player(
            this,
            this.loader.resources["playerTexture"].texture!
          );
          this.pixi.stage.addChild(this.player);
      
          this.pixi.stage.x = this.pixi.screen.width;
          this.pixi.stage.y = this.pixi.screen.height;
      
          this.pixi.ticker.add((delta) => this.update(delta));
          }
          
          update(delta: number) {
            this.player.update(delta);
        
            for (let unicorn of this.unicorns) {
              unicorn.update(delta);
        
              if (this.collision(unicorn, this.player)) {
                unicorn.rescued();
              }
            }
          }

          collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
            const bounds1 = sprite1.getBounds();
            const bounds2 = sprite2.getBounds();
        
            return (
              bounds1.x < bounds2.x + bounds2.width &&
              bounds1.x + bounds1.width > bounds2.x &&
              bounds1.y < bounds2.y + bounds2.height &&
              bounds1.y + bounds1.height > bounds2.y
            );
          }
        }
