var mouse={x: 0, y:0};
var sentryAngle=0;
var sentryType="sentry1";
var sentrySize={sentry1: 55};
const player=document.getElementById("player");
const proj=document.getElementById("projectiles");
const projCtx=proj.getContext("2d");
var wepAmmo={};
var bullets=[];
var bulletSize={bullet1: [20, 20]};
var img={bullet1: new Image()};
img.bullet1.setAttribute("src", "img/bullet1.png");
proj.width=innerWidth;
proj.height=innerHeight;
window.addEventListener("mousemove", function(e){
    mouse.x=e.clientX;
    mouse.y=e.clientY;
});
function rotatePlayer(){
    let angle=Math.atan2(mouse.y-innerHeight/2, mouse.x-innerWidth/2);
    sentryAngle=(180/Math.PI*angle+90)%360;
    player.style.transform="translate(-50%, -50%) rotate("+sentryAngle+"deg)";
}
function newBullet(type, ours){
    let start;
    if(ours){
        start={
            x: innerWidth/2+Math.cos(sentryAngle/(180/Math.PI)-Math.PI/2)*sentrySize[sentryType],
            y: innerHeight/2+Math.sin(sentryAngle/(180/Math.PI)-Math.PI/2)*sentrySize[sentryType]
        }
    }
    else{
        
    }
    bullets.push({
        x: start.x,
        y: start.y,
        angle: sentryAngle/(180/Math.PI)-Math.PI/2,
        type: type,
        ours: ours
    });
}
function moveProjectiles(){
    projCtx.clearRect(-30, -30, proj.width+60, proj.height+60);
    bullets.forEach((item, index)=>{
        item.x+=Math.cos(item.angle)*10;
        item.y+=Math.sin(item.angle)*10;
        projCtx.drawImage(img[item.type], item.x-bulletSize[item.type][0]/2, item.y-bulletSize[item.type][1]/2);
        //if'y, czy trafilismy
        if(item.x+bulletSize[item.type][0]<0 || item.x>proj.width || item.y+bulletSize[item.type][1]<0 || item.y>proj.height){
            bullets.splice(index, 1);
        }
    });
}