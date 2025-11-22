// src/game/Game.ts
import {MazeRecord} from "src/entities/MazeRecord";


export class GameMazeRecordField {
	records: MazeRecord[];

	constructor() {
		this.records = []
	}

	finishRound(roundNumber: number, startTime: Date, endTime: Date) {
		this.addRecord(new MazeRecord(roundNumber, startTime, endTime))
	}

	addRecord(record: MazeRecord): MazeRecord[] {
		this.records.push(record)
		return this.records
	}

	popRecord(): MazeRecord {
		const record = this.records.pop()
		if (record == undefined) {
			throw Error("empty records")
		}
		return record;
	}

	getRecord(index: number): MazeRecord {
		return this.records[index]
	}

	render(): string {
		return this.records.map(value => value.render())
			.join('\n')
	}
}
