let startButton = document.getElementById("start");

if(startButton) {
    startButton.addEventListener("click", function() {
        console.log("click button");
        window.location.href = "index.html";
    })
}