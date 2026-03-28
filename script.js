import { categories } from "./data/index.js";

const textDisplay = document.getElementById("textDisplay");
const romaji = document.getElementById("romaji");
const meaning = document.getElementById("meaning");
const inputBox = document.getElementById("inputBox");
const accuracy = document.getElementById("accuracy");
const wpm = document.getElementById("wpm");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const categorySelect = document.getElementById("category");
const soundBtn = document.querySelector(".sound-btn");

// เติม dropdown
categorySelect.innerHTML = `<option value="all">Random All</option>` +
    Object.keys(categories).map(c => `<option value="${c}">${c}</option>`).join("");

let current = "", startTime = null, totalTyped = 0, totalCorrect = 0, score = 0;

// โหลด voices (สำคัญมากสำหรับ Safari)
let voices = [];
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};

// ฟังก์ชันเสียง (แก้แล้ว)
function speakJapaneseOnly(text) {
    const jpText = text.match(/[\u3040-\u30FF\u4E00-\u9FFF]+/g);
    if (!jpText) return;

    const utterance = new SpeechSynthesisUtterance(jpText.join(" "));
    utterance.rate = 0.9;

    // เลือกเสียงญี่ปุ่น
    const jpVoice = voices.find(v => v.lang === "ja-JP");

    if (jpVoice) {
        utterance.voice = jpVoice;
    } else {
        utterance.lang = "ja-JP"; // fallback
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

// ปุ่มเสียง (กดเท่านั้นถึงมีเสียง)
soundBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    speakJapaneseOnly(current);
});

// สุ่มคำ
function getRandomWord() {
    const selected = categorySelect.value;

    if (selected === "all") {
        let all = [];
        for (let k in categories) {
            all = all.concat(categories[k]);
        }
        return all[Math.floor(Math.random() * all.length)];
    }

    const list = categories[selected];
    return list[Math.floor(Math.random() * list.length)];
}

// เปลี่ยนคำ (ไม่ auto เสียง)
function nextWord(playSound = false) {
    const w = getRandomWord();
    current = w.jp;

    textDisplay.innerText = w.jp;
    romaji.innerText = w.romaji;
    meaning.innerText = w.th;

    inputBox.value = "";
    startTime = new Date();
    inputBox.focus();

    if (playSound) {
        speakJapaneseOnly(current);
    }
}

// พิมพ์
inputBox.addEventListener("input", function () {
    const input = this.value;
    let result = "", correctCount = 0;

    for (let i = 0; i < current.length; i++) {
        if (input[i] === current[i]) {
            result += `<span class="correct">${current[i]}</span>`;
            correctCount++;
        } else if (input[i]) {
            result += `<span class="wrong">${current[i]}</span>`;
        } else {
            result += current[i];
        }
    }

    textDisplay.innerHTML = result;

    totalTyped += input.length;
    totalCorrect += correctCount;

    accuracy.innerText =
        (totalTyped ? Math.floor((totalCorrect / totalTyped) * 100) : 100) + "%";

    if (startTime) {
        let time = (new Date() - startTime) / 1000;
        timeEl.innerText = Math.floor(time);
        wpm.innerText = Math.floor((input.length / 5) / (time / 60)) || 0;
    }

    if (input === current) {
        score += 10;
        scoreEl.innerText = score;
    }
});

// กด Enter
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        if (this.value === current) {
            nextWord(false); // ไม่เล่นเสียง
        }
    }
});

// เปลี่ยนหมวด (ไม่เล่นเสียง)
categorySelect.addEventListener("change", function () {
    nextWord(false);
});

// โหลดหน้า
nextWord(false);