const categories = {
greetings:[
{jp:"こんにちは",romaji:"konnichiwa",th:"สวัสดี"},
{jp:"ありがとう",romaji:"arigatou",th:"ขอบคุณ"},
{jp:"おはよう",romaji:"ohayou",th:"อรุณสวัสดิ์"},
{jp:"こんばんは",romaji:"konbanwa",th:"สวัสดีตอนเย็น"},
{jp:"さようなら",romaji:"sayounara",th:"ลาก่อน"}
],
fruits:[
{jp:"りんご",romaji:"ringo",th:"แอปเปิล"},
{jp:"みかん",romaji:"mikan",th:"ส้ม"},
{jp:"バナナ",romaji:"banana",th:"กล้วย"},
{jp:"ぶどう",romaji:"budou",th:"องุ่น"},
{jp:"いちご",romaji:"ichigo",th:"สตรอว์เบอร์รี"}
],
animals:[
{jp:"ねこ",romaji:"neko",th:"แมว"},
{jp:"いぬ",romaji:"inu",th:"หมา"},
{jp:"とり",romaji:"tori",th:"นก"},
{jp:"うま",romaji:"uma",th:"ม้า"},
{jp:"さかな",romaji:"sakana",th:"ปลา"}
],
colors:[
{jp:"あか",romaji:"aka",th:"แดง"},
{jp:"あお",romaji:"ao",th:"น้ำเงิน"},
{jp:"きいろ",romaji:"kiiro",th:"เหลือง"},
{jp:"くろ",romaji:"kuro",th:"ดำ"},
{jp:"しろ",romaji:"shiro",th:"ขาว"}
],
numbers:[
{jp:"いち",romaji:"ichi",th:"1"},
{jp:"に",romaji:"ni",th:"2"},
{jp:"さん",romaji:"san",th:"3"},
{jp:"よん",romaji:"yon",th:"4"},
{jp:"ご",romaji:"go",th:"5"}
],
verbs:[
{jp:"たべる",romaji:"taberu",th:"กิน"},
{jp:"のむ",romaji:"nomu",th:"ดื่ม"},
{jp:"いく",romaji:"iku",th:"ไป"},
{jp:"みる",romaji:"miru",th:"ดู"},
{jp:"ねる",romaji:"neru",th:"นอน"}
],
family:[
{jp:"ちち",romaji:"chichi",th:"พ่อ"},
{jp:"はは",romaji:"haha",th:"แม่"},
{jp:"あに",romaji:"ani",th:"พี่ชาย"},
{jp:"あね",romaji:"ane",th:"พี่สาว"},
{jp:"こども",romaji:"kodomo",th:"เด็ก"}
],
food:[
{jp:"ごはん",romaji:"gohan",th:"ข้าว"},
{jp:"パン",romaji:"pan",th:"ขนมปัง"},
{jp:"にく",romaji:"niku",th:"เนื้อ"},
{jp:"さかな",romaji:"sakana",th:"ปลา"},
{jp:"やさい",romaji:"yasai",th:"ผัก"}
]
};

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
const textDisplay=document.getElementById("textDisplay");
const romaji=document.getElementById("romaji");
const meaning=document.getElementById("meaning");
const inputBox=document.getElementById("inputBox");
const accuracy=document.getElementById("accuracy");
const wpm=document.getElementById("wpm");
const timeEl=document.getElementById("time");
const scoreEl=document.getElementById("score");

nextWord();
