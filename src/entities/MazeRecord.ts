import {getDuration} from "src/util/DateTime";

export class MazeRecord {
	sequenceNumber: number;
	startTime: Date;
	endTime: Date;

	constructor(sequenceNumber: number, startTime: Date, endTime: Date) {
		this.sequenceNumber = sequenceNumber;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	render(): string {
		return `${this.sequenceNumber}: ${getDuration(this.startTime, this.endTime)}`
	}
}
