(async()=>{
let tower = [
	[ 5, 4, 3, 2, 1 ],
	[ ],
	[ ],
];
let len = Math.max(...tower.map(e => Math.max(...e)));
const printTower = async () => {
	s = new Array(len+1).fill("");
	for (let j = 0; j < s.length; ++j) {
		let ring = s.length-1-j;
		for (let i = 0; i < tower.length; ++i) {
			let val = tower[i][ring] * 2 || 0;
			let str =
				" ".repeat(len - val/2 + 2 - (val?0:1)) +
				"─".repeat(val && Math.floor(val/2 - 1)) +
				["┼┴"[+!ring], "│╵╷"[+!ring + (j==0 && 2)]][+!val];
			s[j] += str + str.split("").reverse().splice(1).join("");
		}
	}
	for (let y = 0; y < s.length; ++y) {
		console.log(s[y]);
	}
	console.log();
}
const wait = (d) => new Promise(res => setTimeout(res, d));
const move = async (i, j) => {
	if (!tower[i]) throw `invalid tower ${i}`;
	if (!tower[j]) throw `invalid tower ${i}`;
	if (i == j) throw `towers can not be the same`;
	if (!tower[i].length) throw `tower ${i} is empty`;
	if (tower[j].length)
		if (tower[i][tower[i].length-1] >= tower[j][tower[j].length-1])
			throw `can not move a disk on a smaller disk`;
	tower[j].push(tower[i].pop());
	console.log(`move from ${i+1} to ${j+1}`);
	await printTower();
	await wait(50);
};
const solveHanoi = async (disk, from, to, aux) => {
	if (disk > 0) {
		await solveHanoi(disk - 1, from, aux, to);
		await move(from, to);
		await solveHanoi(disk - 1, aux, to, from);
	}
}
await printTower();
await wait(1000);
await solveHanoi(len, 0, 2, 1);
})();
