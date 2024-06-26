let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let h2 = document.querySelector("h2");
let highScore = localStorage.getItem("highScore") || 0;
let originalBackgroundColor = getComputedStyle(document.body).backgroundColor;


document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started");
        started=true;
        levelUp();
    }
    
}); 

function gameFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
},250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
    }

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    h2.innerHTML = `Level ${level} <br> High Score: ${highScore}`;

    //random btn choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);

}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
           setTimeout(levelUp,1000);
        }
     
    } else
    {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }
        h2.innerHTML=`Game Over! Your Score Was <b>${level}</b><br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        document.body.classList.add("shake");
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = originalBackgroundColor;
            document.body.classList.remove("shake");
        },150);
        reset();
    }
}

function btnPress(){

 let btn=this;
userFlash(btn);
userColor =  btn.getAttribute("id");
userSeq.push(userColor);

checkAns(userSeq.length-1);

}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress );
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}