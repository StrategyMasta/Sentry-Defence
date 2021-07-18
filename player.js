var mouse={x: 0, y:0};
var sentryAngle=0;
var sentryType="sentry1";
var sentrySize={
    sentry1: 55,
    sentry2: 38,
    sentry3: 44,
    sentry4: 54,
    sentry5: 63,
    sentry6: 65,
    sentry7: 60
};
const player=document.getElementById("player");
const proj=document.getElementById("projectiles");
const projCtx=proj.getContext("2d");
var wepAmmo={};
var bullets=[];
var bulletSize={
    bullet1: [20, 20],
    bullet2: [20, 20],
    bullet3: [10, 49],
    bullet4: [15, 51],
    bullet5: [9, 46],
    bullet6: [11, 57],
    bullet7: [19, 48]
};
var img={};
var animations=[];
var dmg=26;
var ammo="bullet1";
var homing=0;
for(var i=1; i<8; i++) img["bullet"+i]=new Image();
for(var i=1; i<8; i++) img["bullet"+i].setAttribute("src", "img/bullet"+i+".png");
img.bullet4.width=15;
img.bullet4.height=51;
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
    fire.currentTime=0;
    fire.play();
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
        num: 20,
        bulletAngle: sentryAngle,
        type: type,
        ours: ours
    });
}
function drawRotatedImage(image, x, y, angle){
    projCtx.save();
    projCtx.translate(x, y);
    projCtx.rotate(angle * Math.PI/180);
    projCtx.drawImage(image, -(image.width/2), -(image.height/2));
    projCtx.restore();
}
function moveProjectiles(){
    projCtx.clearRect(-30, -30, proj.width+60, proj.height+60);
    bullets.forEach((item, index)=>{
        if(enemies!=0x0){
            let closestEnemy=enemies.map(enemy=>[enemy, Math.sqrt(Math.abs(enemy.x+enemySize[enemy.type][0]/2-item.x+bulletSize[item.type][0]/2)**2+Math.abs(enemy.y+enemySize[enemy.type][1]/2-item.y+bulletSize[item.type][1]/2)**2)])
            .reduce((total, item)=>total=item[1]<total[1] ? item : total);
            /*let value=(homing*(item.angle-Math.atan2(closestEnemy[0].y+enemySize[closestEnemy[0].type][1]/2-item.y+bulletSize[item.type][1]/2, closestEnemy[0].x+enemySize[closestEnemy[0].type][0]/2-item.x+bulletSize[item.type][0]/2))%(Math.PI*2)/50);
            let test=item.angle-Math.atan2(closestEnemy[0].y+enemySize[closestEnemy[0].type][1]/2-item.y+bulletSize[item.type][1]/2, closestEnemy[0].x+enemySize[closestEnemy[0].type][0]/2-item.x+bulletSize[item.type][0]/2);
            let test2=(item.angle-Math.atan2(closestEnemy[0].y+enemySize[closestEnemy[0].type][1]/2-item.y+bulletSize[item.type][1]/2, closestEnemy[0].x+enemySize[closestEnemy[0].type][0]/2-item.x+bulletSize[item.type][0]/2))/item.num;
            console.log(value+" "+test);*/
            let test3=(Math.atan2(closestEnemy[0].y+enemySize[closestEnemy[0].type][1]/2-item.y+bulletSize[item.type][1]/2, closestEnemy[0].x+enemySize[closestEnemy[0].type][0]/2-item.x+bulletSize[item.type][0]/2));
            if(test3<0) test3+=Math.PI*2;
            test3=item.angle-test3;
            if(test3>0.015*homing) test3=0.015*homing;
            if(test3<-0.015*homing) test3=-0.015*homing;
            item.angle-=test3;
            if(item.angle<0) item.angle=Math.PI*2+item.angle;
            item.angle=item.angle%(Math.PI*2)
            item.bulletAngle=item.angle*180/Math.PI+90;
        }
        item.x+=Math.cos(item.angle)*10;
        item.y+=Math.sin(item.angle)*10;
        drawRotatedImage(img[item.type], item.x, item.y, item.bulletAngle);
        //projCtx.drawImage(img[item.type], item.x-bulletSize[item.type][0]/2, item.y-bulletSize[item.type][1]/2);
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
		hitEnemy.hp-=dmg;
        let num=Math.floor(Math.random()*2);
        hit[num].currentTime=0;
        hit[num].play();
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
        hitEnemy.cooldown=knockback;
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