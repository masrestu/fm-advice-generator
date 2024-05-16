const genBtn = document.querySelector(".generate-advice");
const overlay = document.querySelector(".overlay");
const diceSpan = document.querySelector(".overlay span");
const title = document.querySelector("h1");
const adviceId = document.querySelector("#advice-id");
const adviceText = document.querySelector("p");

const randomDice = async () => {
    const current = diceSpan.textContent
    let i = 0;
    while (diceSpan.textContent === current) {
        const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        const die = dice[Math.floor(Math.random() * dice.length)];
        diceSpan.textContent = die;
        i++
        if (i > 5) return
    }
}

const fetchData = async () => {
    const dice = setInterval(randomDice, 450);
    overlay.style.display = "flex";
    await fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
        adviceId.textContent = data.slip.id;
        adviceText.textContent = `“${data.slip.advice}”`;
    });
    await new Promise(r => setTimeout(r, 450));
    overlay.style.display = "none";
    clearInterval(dice);
}

genBtn.addEventListener("click", fetchData)

fetchData()
title.style.display = "block";
adviceText.style.display = "block";