const fs = require("fs/promises");
const axios = require("axios");

async function fn() {
	const d = (
		await axios.get(
			"https://billwurtz.com/questions/questions-2016-05.html"
		)
	).data;
	console.log("done");
	await fs.writeFile("./r-2022.html", d);
}
fn();