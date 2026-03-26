import {categories} from "./data/index.js";
const textDisplay=document.getElementById("textDisplay");
const romaji=document.getElementById("romaji");
const meaning=document.getElementById("meaning");
const inputBox=document.getElementById("inputBox");
const accuracy=document.getElementById("accuracy");
const wpm=document.getElementById("wpm");
const timeEl=document.getElementById("time");
const scoreEl=document.getElementById("score");

const categorySelect = document.getElementById("category");

// เติม dropdown
categorySelect.innerHTML = `<option value="all">Random All</option>` +
Object.keys(categories).map(c=>`<option value="${c}">${c}</option>`).join("");

let current="",startTime=null,totalTyped=0,totalCorrect=0,score=0;

function getRandomWord(){
const selected=categorySelect.value;
if(selected==="all"){
let all=[];
for(let k in categories){all=all.concat(categories[k]);}
return all[Math.floor(Math.random()*all.length)];
}
const list=categories[selected];
return list[Math.floor(Math.random()*list.length)];
}

function nextWord(){
const w=getRandomWord();
current=w.jp;
textDisplay.innerText=w.jp;
romaji.innerText=w.romaji;
meaning.innerText=w.th;
inputBox.value="";
startTime=new Date();
}

inputBox.addEventListener("input",function(){
const input=this.value;
let result="",correctCount=0;

for(let i=0;i<current.length;i++){
if(input[i]===current[i]){result+=`<span class="correct">${current[i]}</span>`;correctCount++;}
else if(input[i]){result+=`<span class="wrong">${current[i]}</span>`;}
else{result+=current[i];}
}

textDisplay.innerHTML=result;

totalTyped+=input.length;
totalCorrect+=correctCount;

accuracy.innerText=(totalTyped?Math.floor((totalCorrect/totalTyped)*100):100)+"%";

if(startTime){
let time=(new Date()-startTime)/1000;
timeEl.innerText=Math.floor(time);
wpm.innerText=Math.floor((input.length/5)/(time/60))||0;
}

if(input===current){score+=10;scoreEl.innerText=score;}
});

inputBox.addEventListener("keydown",function(e){
if(e.key==="Enter"){
e.preventDefault();
if(this.value===current){nextWord();}
}
});

categorySelect.addEventListener("change",nextWord);

// refs


nextWord();