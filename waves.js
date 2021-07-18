var wave=1;
var wavePause=false;
var enemiesLeft=20;
var enemiesAlive=20;
var spawnSpeed=fps;
function Wave(tick){
	if(enemiesLeft<=0){
		enemiesLeft=Math.round(20*wave/2);
        spawnSpeed-= wave>10 ? 0.5 : 1.5;
		wavePause=true;
		return 0;
	} else if(wave<5 && tick>=spawnSpeed){
		enemies.push(new Enemy("turret1", false));
		enemiesLeft--;
		return 0;
	} else if(wave>=5 && tick>=40){
		enemies.push(new Enemy("turret1", false));
		enemiesLeft--;
		return 0;
	}
	else return tick;
}