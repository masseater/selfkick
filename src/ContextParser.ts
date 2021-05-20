import {
	CalcOperation,
	Operator,
	operators,
	RollOperation as RollOperation,
} from "./Operations";

export class ContextParser {
	static parse(context: string[]) {
		const [exp, op, comp] = context;
		console.log({ exp, op, comp });
		if (exp === undefined) {
			throw new Error("exp not found");
		}
		if (op !== undefined && comp === undefined) {
			throw new Error("op found but comp not found");
		}

		if (op === undefined && comp === undefined) {
			return new RollOperation(exp);
		}

		if (!(operators as Readonly<string[]>).includes(op)) {
			throw new Error("op not supported");
		}

		return new CalcOperation(exp, op as Operator, parseInt(comp));
	}
}
