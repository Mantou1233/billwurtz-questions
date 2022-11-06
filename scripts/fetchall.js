const fs = require("fs/promises");
const axios = require("axios");

async function fn() {
	for (let [name, url] of Object.entries(require("./url.json"))) {
		console.log(`doin ${name}, ${url}`);
		const d = await uh(url);
		fs.writeFile(`./bill/${name}.json`, JSON.stringify(d, null, 4));
	}
}
fn();

async function uh(url) {
	const ctx = (await axios.get(url)).data;
	return ctx
		.split(/\<font color\=\#E9EC54\>|<dco>|\<font color\=\#EFAA01\>/)
		.filter((v, i) => !v.length == 0)
		.slice(1)
		.map((v, i) => {
			const splitg = v.split(/<\/font>|<\/dco>/);
			const date = splitg[0]
				.replaceAll("&nbsp;", "")
				.replaceAll("\r", "")
				.replaceAll("\n", "");
			const ctx = [...splitg]
				.slice(1)
				.join("")
				.split(/\<\/?h3\>/)
				.map(v => {
					return v
						.replaceAll(/<a href="(.{0,})">/g, (_, u) => {
							return `(ref: ${u})`;
						})
						.replaceAll(
							/<A HREF="(.{0,})"/gi,
							(_, u) => {
								return `(ref: ${u})`;
							} //<A HREF=\"http://billwurtz.com/yes.mp4\"
						)
						.replaceAll(/\<font color\=\#[0-9A-Fa-f]{6,6}\>/g, "")
						.replaceAll("&nbsp;", "")
						.replaceAll("\n", "")
						.replaceAll("\r", "")
						.replaceAll(/\<\/?[h][3-4]\/?\>/gi, "")
						.replaceAll(/\<\/?[a]\/?\>/gi, "")
						.replaceAll(/\<\/?br\/?\>/gi, "\n")
						.replaceAll(/\<\/?qco\>/gi, "")
						.replaceAll(/\<a name\=\"bottom\"\>/gi, "")
						.replaceAll(
							/\n{0,}\((ref: .{0,})\)PREVIOUS QUESTIONS\<\/a\>/g,
							""
						)
						.replaceAll(/\<\/?body\/?\>|\<\/?html\/?\>/g, "")
						.trim();
				})
				.filter(v => v.length);
			return { date, ctx };
		});
}

//https://billwurtz.com/questions/questions-2016-05.html
