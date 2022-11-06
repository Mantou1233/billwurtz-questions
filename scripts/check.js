const fs = require("fs/promises");

async function fn() {
	const ctx = await fs.readFile("./.json", { encoding: "utf-8" });
	console.log(JSON.parse(ctx).filter(v => v?.e));
}
fn();
