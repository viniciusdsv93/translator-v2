const { parentPort, workerData } = require("node:worker_threads");
const { Cluster } = require("puppeteer-cluster");
const fs = require("node:fs");

(async () => {
	const { wordList, idioma } = workerData;
	const { abrev, nome } = idioma;
	console.log(`Traduzindo para o ${nome}`);
	console.time(`thread-${nome}`);
	const cluster = await Cluster.launch({
		concurrency: Cluster.CONCURRENCY_CONTEXT,
		maxConcurrency: 4,
	});

	let jsonResult = {};

	await cluster.task(async ({ page, data }) => {
		await page.goto(
			`https://translate.google.com.br/?hl=pt-BR&sl=pt&tl=${abrev}&text=${data}&op=translate`,
			{ waitUntil: "domcontentloaded" }
		);

		let element = await page.waitForSelector(".ryNqvb");
		let result = await element.evaluate((el) => el.innerText);
		jsonResult[data] = result;
	});

	Object.keys(wordList).forEach((word) => {
		cluster.queue(word);
	});

	await cluster.idle();
	await cluster.close();
	fs.writeFileSync(`${abrev}.json`, JSON.stringify(jsonResult));
	console.timeEnd(`thread-${nome}`);
	parentPort.postMessage(`Traducao concluida com sucesso para o idioma ${nome}`);
})();
