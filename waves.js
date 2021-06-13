var wave=1;
var wavePause=false;
var enemiesLeft=20;
function Wave(tick){
	if(enemiesLeft<=0){
		wave++;
		enemiesLeft=Math.round(20*wave*0.7);
		wavePause=true;
		return tick;
	} else if(wave<5 && tick>=60){
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