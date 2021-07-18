var enemySize={turret1: [41, 62]};
var enemies=[];
var enemiesInt;
var knockback=12;
class Enemy{
    constructor(type, baby){
        this.type=type;
        this.baby=baby;
        this.x=0;
        this.y=0;
        this.hp=100;
        this.direction="moveToPlayer";
        this.cooldown=knockback;
        if(!baby){
            let random=Math.floor(Math.random()*4)+1;
            if(random==1){
                this.x=Math.floor(Math.random()*innerWidth)-enemySize[type][0]/2;
                this.y=0-enemySize[type][1];
            } else if(random==2){
                this.x=innerWidth;
                this.y=Math.floor(Math.random()*innerHeight)-enemySize[type][1]/2;
            } else if(random==3){
                this.x=Math.floor(Math.random()*innerWidth)-enemySize[type][0]/2;
                this.y=innerHeight;
            } else if(random==4){
                this.x=0-enemySize[type][0];
                this.y=Math.floor(Math.random()*innerHeight)-enemySize[type][1]/2;
            }
        }
        else{
            this.x=baby.x-enemySize[type][0];
            this.y=baby.y-enemySize[type][1];
        }
        this.enemy=document.createElement("IMG");
        document.body.appendChild(this.enemy);
        this.enemy.setAttribute("src", "img/"+type+".png");
        let angle=Math.atan2(innerHeight/2-this.y, innerWidth/2-this.x);
        this.angle=(180/Math.PI*angle+90)%360;
        this.enemy.style.transform="rotate("+this.angle+"deg)";
        this.enemy.style.position="absolute";
        this.enemy.style.top=this.y+"px";
        this.enemy.style.left=this.x+"px";
    }
    move(){
        this[this.direction]();
    }
    moveToPlayer(){
        this.x+=Math.cos(this.angle/(180/Math.PI)-Math.PI/2)*6;
        this.y+=Math.sin(this.angle/(180/Math.PI)-Math.PI/2)*6;
        this.enemy.style.top=this.y+"px";
        this.enemy.style.left=this.x+"px";
        /*if(this.y+enemySize[this.type][1]<0 || this.x>proj.width || this.y>proj.height || this.x+enemySize[this.type][0]<0){
            enemiesAlive--;
            document.body.removeChild(this.enemy);
            enemies.splice(enemies.indexOf(this), 1);
        }*/
        if(Math.abs(this.x+enemySize[this.type][0]/2-innerWidth/2)<50 && Math.abs(this.y+enemySize[this.type][1]/2-innerHeight/2)<50){
            let num=Math.floor(Math.random()*2);
            die[num].currentTime=0;
            die[num].play();
            lives--;
            enemiesAlive--;
            document.body.removeChild(this.enemy);
            enemies.splice(enemies.indexOf(this), 1);
        }
    }
    knockback(){
        this.x-=Math.cos(this.angle/(180/Math.PI)-Math.PI/2)*this.cooldown;
        this.y-=Math.sin(this.angle/(180/Math.PI)-Math.PI/2)*this.cooldown;
        this.enemy.style.top=this.y+"px";
        this.enemy.style.left=this.x+"px";
        this.cooldown--;
        if(this.cooldown<=0) this.direction="moveToPlayer";
        /*if(this.y+enemySize[this.type][1]<0 || this.x>proj.width || this.y>proj.height || this.x+enemySize[this.type][0]<0){
            enemiesAlive--;
            document.body.removeChild(this.enemy);
            enemies.splice(enemies.indexOf(this), 1);
        }*/
        if(Math.abs(this.x+enemySize[this.type][0]/2-innerWidth/2)<50 && Math.abs(this.y+enemySize[this.type][1]/2-innerHeight/2)<50){
            let num=Math.floor(Math.random()*2);
            die[num].currentTime=0;
            die[num].play();
            lives--;
            enemiesAlive--;
            document.body.removeChild(this.enemy);
            enemies.splice(enemies.indexOf(this), 1);
        }
    }
};