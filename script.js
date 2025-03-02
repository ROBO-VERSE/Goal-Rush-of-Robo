let ball = document.getElementById("ball");
let keeper = document.getElementById("keeper");
let message = document.getElementById("message");
let scoreDisplay = document.getElementById("score");
let goalSound = document.getElementById("goalSound");
let missSound = document.getElementById("missSound");

let score = 0;
let shots = 0;
let gameOver = false;
let startX, startY, endX, endY;

ball.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

ball.addEventListener("touchend", (e) => {
    if (gameOver) return;
    
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;

    let deltaX = endX - startX;
    let deltaY = endY - startY;

    if (deltaY < -30) {
        let finalX = Math.max(0, Math.min(270, 135 + deltaX));
        ball.style.transition = "bottom 0.5s linear, left 0.5s linear";
        ball.style.left = finalX + "px";
        ball.style.bottom = "320px";

        let keeperPosition = Math.random() * 200;
        keeper.style.left = keeperPosition + "px";

        setTimeout(() => {
            let keeperWidth = 100; // গোলকিপারের নতুন width
            let ballWidth = 30; // বলের প্রস্থ

            let keeperCenter = keeperPosition + (keeperWidth / 2);
            let ballCenter = finalX + (ballWidth / 2);

            if (Math.abs(ballCenter - keeperCenter) < keeperWidth / 2) {
                message.innerText = "মিস করছো,,,মনু😏";
                missSound.play();
            } else {
                message.innerText = "গোল অইছে🙄😒";
                goalSound.play();
                score++;
            }

            shots++;
            scoreDisplay.innerText = `Score: ${score}`;

            if (shots >= 10) {
                gameOver = true;
                message.innerText = `Game Over(খেলা খতম🙂)! Final Score: ${score}/10`;
                setTimeout(() => {
                    ball.style.bottom = "20px";
                    ball.style.left = "135px";  
                }, 1000);
            } else {
                setTimeout(() => {
                    ball.style.bottom = "20px";
                    ball.style.left = "135px"; 
                    message.innerText = "পরের শটের জন্য প্রস্তুত হও🙂!";
                }, 1000);
            }
        }, 700);
    }
});

document.getElementById("reset").addEventListener("click", () => {
    score = 0;
    shots = 0;
    gameOver = false;
    scoreDisplay.innerText = `Score: 0`;
    message.innerText = "সুইপ করে শট নাও,বেবি🫣!";
    ball.style.bottom = "20px";
    ball.style.left = "135px";
});