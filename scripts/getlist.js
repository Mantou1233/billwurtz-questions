const fs = require("fs/promises");

async function fn() {
	const a = {};
	let b = 2016,
		i = 5;
	year = new Date().getFullYear();
	for (; b < year + 1; b++) {
		console.log(b);
		let m = b == year ? /*new Date(Date.now()).getMonth() + 1*/ 8 : 12;
		for (; i < m + 1; i++) {
			a[`${b}-${i}`] =
				`${b}-${i}` == `2022-${k3(new Date().getMonth() + 1)}`
					? `https://billwurtz.com/questions/questions.html`
					: `https://billwurtz.com/questions/questions-${b}-${k3(
							i
					  )}.html`;
		}
		i = 1;
	}
	await fs.writeFile("d.json", JSON.stringify(a));
}
fn();

function k3(r) {
	return `${r}`.length === 1 ? `0${r}` : `${r}`;
}

//https://billwurtz.com/questions/questions-2016-05.html
