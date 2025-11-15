import {formatDuration, intervalToDuration} from "date-fns";
import {ko} from "date-fns/locale";

export class TimerModule {
	startTime: Date
	endTime: Date

	init(startTime: Date) {
		this.startTime = startTime
		this.endTime = startTime
	}

	getDuration(): string {
		const duration = intervalToDuration({start: this.startTime, end: this.endTime});

		return formatDuration(duration, {
			format: ['hours', 'minutes', 'seconds'],
			locale: ko
		});
	}
}
