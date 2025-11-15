import {TimerModule} from "src/modules/TimerModule";

export class GameInformationField {
	stage: number
	timerField: TimerModule
	isTimerRunning: boolean = false

	initInformation() {
		this.stage = 1
		this.timerField = new TimerModule()
	}

	startTimer(now: Date) {
		this.timerField.init(now)
		this.isTimerRunning = true
	}

	stopTimer() {
		this.isTimerRunning = false
	}

	getFieldString(): string {
		if (this.isTimerRunning) {
			return `현재 소모된 시간: ${this.timerField.getDuration()}`
		} else {
			return `기록: ${this.timerField.getDuration()}`
		}
	}

	getInformationRenderOutput(): string {
		let output = '';

		output += this.getFieldString()
		output += '\n'
		output += '\n'

		return output
	}
}

