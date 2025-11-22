import {TimerModule} from "src/modules/TimerModule";

export class GameInformationField {
	stage: number
	timerModule: TimerModule
	isTimerRunning: boolean = false

	initInformation() {
		this.stage = 1
		this.timerModule = new TimerModule()
	}

	startRound(now: Date) {
		this.timerModule.init(now)
		this.isTimerRunning = true
	}

	finishRound() {
		this.isTimerRunning = false
	}

	getFieldString(): string {
		if (this.isTimerRunning) {
			return `현재 소모된 시간: ${this.timerModule.getDuration()}`
		} else {
			return `기록: ${this.timerModule.getDuration()}`
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

