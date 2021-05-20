export class RollOperation {
	private number: number;
	private count: number;
	constructor(context: string) {
		const [count, number] = context.split("d").map((s) => parseInt(s));
		if (count === undefined || number === undefined) {
			throw new Error("undefined");
		}
		if (count > 100 || number > 1000) {
			throw new Error("too large");
		}
		this.count = count;
		this.number = number;
	}

	eval() {
		let sum = 0;
		return {
			numbers: [...Array(this.count)].map((_) => {
				const res = Math.floor(Math.random() * (this.number - 1) + 1);
				sum += res;
				return res;
			}),
			sum,
		};
	}
}
