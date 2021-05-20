import { Client } from "discord.js";
import { setting } from "./src/Setting";
import { RollOperation } from "./src/RollOperation";

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
		const [prefix, context] = content.split(" ");
		if (prefix !== "/r") {
			return;
		}

		try {
			const roll = new RollOperation(context);
			const { numbers, sum } = roll.eval();
			await msg.channel.send(`sum => ${sum}\nvalues => ${numbers}`);
		} catch (error) {
			msg.react("🤔");
		}
	});
};

main();
