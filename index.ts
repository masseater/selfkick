import { Client } from "discord.js";
import { setting } from "./src/Setting";
import { RollOperation } from "./src/Operations";
import { ContextParser } from "./src/ContextParser";

const main = async () => {
	const client = new Client();
	await client.login(setting.token);

	client.on("ready", () => {
		console.log("Ready!");
	});

	client.on("message", (msg) => {
		if (msg.author.bot) {
			return;
		}
		console.log(`received: ${msg.content} author: ${msg.author}`);
	});
	client.on("message", async (msg) => {
		const { content } = msg;
		const [prefix, ...context] = content.split(" ");
		if (prefix !== "/r") {
			return;
		}

		try {
			const operation = ContextParser.parse(context);
			const { numbers, label, result } = operation.eval();
			await msg.channel.send(
				`${label} => ${result}\nvalues => ${numbers}`,
			);
		} catch (error) {
			console.log(error);
			msg.react("🤔");
		}
	});
};

main();
