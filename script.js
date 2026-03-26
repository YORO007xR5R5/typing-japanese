const words = [
{jp:"こんにちは", romaji:"konnichiwa", th:"สวัสดี"},
{jp:"ありがとう", romaji:"arigatou", th:"ขอบคุณ"},
{jp:"さくら", romaji:"sakura", th:"ซากุระ"},
{jp:"ねこ", romaji:"neko", th:"แมว"},
{jp:"いぬ", romaji:"inu", th:"หมา"},
{jp:"みず", romaji:"mizu", th:"น้ำ"},
{jp:"やま", romaji:"yama", th:"ภูเขา"}
];

let current = "";
let startTime = null;
let totalTyped = 0;
let totalCorrect = 0;
let score = 0;

function nextWord() {
    const rand = words[Math.floor(Math.random()*words.length)];
    current = rand.jp;

    document.getElementById("textDisplay").innerText = rand.jp;
    document.getElementById("romaji").innerText = rand.romaji;
    document.getElementById("meaning").innerText = rand.th;

    document.getElementById("inputBox").value = "";

    startTime = new Date();
}

const inputBox = document.getElementById("inputBox");

inputBox.addEventListener("input", function() {
    const input = this.value;
    const display = document.getElementById("textDisplay");

    let result = "";
    let correctCount = 0;

    for (let i=0;i<current.length;i++) {
        if (input[i] === current[i]) {
            result += "<span class='correct'>" + current[i] + "</span>";
            correctCount++;
        } else if (input[i]) {
            result += "<span class='wrong'>" + current[i] + "</span>";
        } else {
            result += current[i];
        }
    }

    display.innerHTML = result;

    totalTyped += input.length;
    totalCorrect += correctCount;

    let acc = totalTyped ? Math.floor((totalCorrect/totalTyped)*100) : 100;
    document.getElementById("accuracy").innerText = acc + "%";

    if (startTime) {
        let time = (new Date() - startTime)/1000;
        document.getElementById("time").innerText = Math.floor(time);

        let wpm = Math.floor((input.length/5)/(time/60));
        document.getElementById("wpm").innerText = wpm || 0;
    }

    if (input === current) {
        score += 10;
        document.getElementById("score").innerText = score;
    }
});

// กด Enter เพื่อเปลี่ยนคำ
inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();

        if (this.value === current) {
            nextWord();
        }
    }
});

nextWord();
