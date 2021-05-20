export interface Operation {
	eval(): { result: any; label: string; numbers: number[] };
}

export class RollOperation implements Operation {
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
		let result = 0;
		return {
			numbers: [...Array(this.count)].map((_) => {
				const res = Math.floor(Math.random() * (this.number - 1) + 1);
				result += res;
				return res;
			}),
			result,
			label: "sum",
		};
	}
}

export const operators = ["==", "!=", ">=", "<=", ">", "<"] as const;
export type Operator = typeof operators[number];
export class CalcOperation implements Operation {
	constructor(
		private exp: string,
		private op: Operator,
		private comp: number,
	) {}

	eval(): { result: any; label: string; numbers: number[] } {
		const { numbers, result } = new RollOperation(this.exp).eval();
		const judge = (() => {
			switch (this.op) {
				case "==":
					return result == this.comp;
				case "!=":
					return result != this.comp;
				case "<":
					return result < this.comp;
				case "<=":
					return result <= this.comp;
				case ">":
					return result > this.comp;
				case ">=":
					return result >= this.comp;
				default:
					throw new Error("fuck");
			}
		})();
		return {
			label: "judge",
			numbers,
			result: judge,
		};
	}
}
