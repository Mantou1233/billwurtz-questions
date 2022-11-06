function toDateN(str){
	let g = /(?<month>[0-9]{1,2})\.(?<day>[0-9]{1,2})\.(?<year>[0-9]{1,2}) {0,}(?<hour>[0-9]{1,2}):(?<min>[0-9]{1,2}) {0,}(?<st>am|pm)/.exec(str)?.groups ?? -1;
	if(g === -1) throw new Error("fuck")
	with(g) return `20${+year}${k3(+month)}${k3(+day)}${k3(+hour+(st == "am" ? 0 : 12))}${k3(min)}`
}

console.log(toDateN("5.31.16  11:56 pm"))
function k3(r) {
	return `${r}`.length === 1 ? `0${r}` : `${r}`;
}