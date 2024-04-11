const { Worker } = require("node:worker_threads");
const fs = require("node:fs");

const rf = fs.readFileSync("source.json");
let wordList = JSON.parse(rf.toString());
let idiomas = [
	{ abrev: "en", nome: "ingles" },
	{ abrev: "es", nome: "espanhol" },
	{ abrev: "de", nome: "alemao" },
	{ abrev: "it", nome: "italiano" },
	{ abrev: "ru", nome: "russo" },
	{ abrev: "ja", nome: "japones" },
	{ abrev: "zh-CN", nome: "chines" },
];

idiomas.forEach((idioma) => {
	const child = new Worker("./worker.js", {
		workerData: {
			wordList,
			idioma,
		},
	});

	child.on("message", (msg) => {
		console.log(msg);
	});
});
