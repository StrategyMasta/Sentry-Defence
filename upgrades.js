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