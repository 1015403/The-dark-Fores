// start knop
let startButton = document.getElementById("start");

if(startButton) {
    startButton.addEventListener("click", function() {
        console.log("click button");
        window.location.href = "game.ts";
        document.body.style.backgroundImage = 'url("forest.jpg")'
    })
}
