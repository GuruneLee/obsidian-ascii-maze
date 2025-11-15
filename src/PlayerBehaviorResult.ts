export class PlayerBehaviorResult {
	action: string; // move, jump
	result: boolean;
	reason: string;
	isFirstSuccessfulAction: boolean;

	constructor(
		action: string,
		result: boolean,
		reason: string,
		isFirstSuccessfulAction: boolean,
	) {
		this.action = action
		this.result = result
		this.reason = reason
		this.isFirstSuccessfulAction = isFirstSuccessfulAction
	}

	static success(action: string, isFirstSuccessfulAction: boolean): PlayerBehaviorResult {
		return new PlayerBehaviorResult(
			action,
			true,
			'',
			isFirstSuccessfulAction
		)
	}

	static fail(action: string, reason: string): PlayerBehaviorResult {
		return new PlayerBehaviorResult(
			action,
			false,
			reason,
			false,
		)
	}
}
