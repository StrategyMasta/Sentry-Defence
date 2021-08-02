var upgrades=[0, 0, 0, 0, 0, 0, 0, 0];
var cost=[500, 300, 400, 350, 400, 300, 400, 1000];
const price=document.getElementsByClassName("price");
function upgrade(index){
    upgrades[index]++;
    if(upgrades[index]<4) document.getElementsByClassName("dots")[index].children[upgrades[index]-1].style.backgroundColor="white";
    else document.getElementsByClassName("dots")[index].children[upgrades[index]-4].style.backgroundColor="yellow";
    if(upgrades[index]==6){
        document.getElementsByClassName("upgradeButton")[index].setAttribute("src", "img/addDisabled.png");
        document.getElementsByClassName("upgradeButton")[index].style.pointerEvents="none";
    }
    if(index==0) dmg+=15;
    if(index==1) lives+=10;
    if(index==2) knockback+=2;
    if(index==3) ammo="bullet"+(upgrades[3]+1);
    if(index==4) homing++;
    if(index==7) {sentryType="sentry"+(upgrades[7]+1); player.setAttribute("src", "img/"+sentryType+".png");}
    price[index].innerText=price[index].innerText*1+50;
    cost[index]+=50;
}
const particlesMenu=document.getElementById("particlesMenu");
const particlesMenuCtx=particlesMenu.getContext("2d");
const particleArray = [];
const edge = 120;
var selectedNode = document.getElementById("start");
particlesMenu.width=300;
particlesMenu.height=250;
function particleHover(node){
    selectedNode = node;
    particlesMenu.style.visibility = "visible";
    particlesMenu.style.top = (node.getBoundingClientRect().top + node.getBoundingClientRect().height/2 - 125) + "px";
    particlesMenu.style.left = (node.getBoundingClientRect().left + node.getBoundingClientRect().width/2 - 150) + "px";
    animate();
}
function particleOut(){
    selectedNode = null;
    particlesMenu.style.visibility = "hidden";
    cancelAnimationFrame(animationLoop);
    particlesMenuCtx.clearRect(-1, -1, particlesMenu.width + 2, particlesMenu.height + 2);
}
class Particle{
    constructor(num){
        this.x = 150;
        this.y = 125;
        this.speed = 1;
        this.angle = Math.random() * Math.PI * 2;
        this.strokeCol = num ? "black" : "white";
        this.fillCol = num ? "white" : "black";
    }
    update(){
        this.speed += .1;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.draw();
    }
    draw(){
        this.speed += .1;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        let direction = Math.sqrt((this.x - 150) ** 2 + (this.y - 125) ** 2);
        let radius = (-direction / edge + 1) * edge / 10;
        if(radius > 0){
            requestAnimationFrame(this.draw.bind(this));
            particlesMenuCtx.fillStyle = this.fillCol;
            particlesMenuCtx.strokeStyle = this.strokeCol;
            particlesMenuCtx.beginPath();
            particlesMenuCtx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            particlesMenuCtx.fill();
            particlesMenuCtx.stroke();
        }
    }
}
var animationLoop;
function animate(){
    particlesMenuCtx.fillStyle = "rgba(105, 105, 105, 0.15)";
    particlesMenuCtx.fillRect(0, 0, particlesMenu.width, particlesMenu.height);
    let particle = new Particle(Math.floor(Math.random() * 2));
    particle.draw();
    animationLoop = requestAnimationFrame(animate);
}