import {ObjectPosition} from "./ObjectPosition";

import {Coordinate} from "./Coordinate";

export class Player {
	position: ObjectPosition

	constructor(location: Coordinate) {
		this.position = new ObjectPosition(location)
	}

	getCharacter(): string {
		return "@"
	}
}
