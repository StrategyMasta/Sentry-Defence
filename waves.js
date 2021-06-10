var wave=1;
function Wave(tick){
	if(wave<5 && tick>=60){
		enemies.push(new Enemy("turret1", false));
		return 0
	}
	else return tick;
}