import forestImage from "./images/forest.jpg"

//
// STAP 1 - maak een pixi canvas
//
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)

//
// STAP 2 - preload alle afbeeldingen
//
const loader = new PIXI.Loader()
loader.add('backgroundTexture', forestImage)
loader.load(()=>loadCompleted())

//
// STAP 3 - maak een sprite als de afbeeldingen zijn geladen
//
function loadCompleted() {
    let fish = new PIXI.Sprite(loader.resources["backgroundTexture"].texture!)
    pixi.stage.addChild(background)
}