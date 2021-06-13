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
var animations=[];
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
        collision(item);
        if(item.x+bulletSize[item.type][0]<0 || item.x>proj.width || item.y+bulletSize[item.type][1]<0 || item.y>proj.height){
            bullets.splice(index, 1);
        }
    });
}
function collision(bullet){
	let hitEnemy=enemies.filter((item, index)=>{
		if(item.x-bulletSize[bullet.type][0]<bullet.x && item.y-bulletSize[bullet.type][1]<bullet.y && item.x+enemySize[item.type][0]>bullet.x && item.y+enemySize[item.type][1]>bullet.y) return true;
	})[0];
	if(hitEnemy!=undefined) {
		hitEnemy.hp-=34;
		projCtx.clearRect(bullet.x-1, bullet.y-1, bulletSize[bullet.type][0]+2, bulletSize[bullet.type][1]+2);
		bullets.splice(bullets.indexOf(bullet), 1);
        animations.push({
            x: hitEnemy.x+enemySize[hitEnemy.type][0]/2,
            y: hitEnemy.y+enemySize[hitEnemy.type][1]/2,
            image: new Image(),
            currFrame: 0,
            frameCount: 9,
            type: "explosion",
            size: [64, 64]
        });
        hitEnemy.cooldown=12;
        hitEnemy.direction="knockback";
	}
}
function animation(){
    animations.forEach((item, index)=>{
        //anim1Ctx.clearRect(item[2]-item[6]/2-1, item[3]-item[6]/2-1, item[6]+2, item[6]+2);
        item.image.setAttribute("src", "img/"+item.type+"/"+item.currFrame+".png");
        projCtx.drawImage(item.image, item.x-item.size[0]/2, item.y-item.size[1]/2);
        item.currFrame++;
        if(item.frameCount!=item.currFrame) animations[index].image.setAttribute("src", "img/"+item.type+"/"+item.currFrame+".png");
        if(item.frameCount==item.currFrame) {/*setTimeout(function() {anim1Ctx.clearRect(item[2]-item[6]/2-1, item[3]-item[6]/2-1, item[6]+2, item[6]+2)}, 2000/60);*/ animations.splice(index, 1);}
    });
}