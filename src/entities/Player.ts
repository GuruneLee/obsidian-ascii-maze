import {ObjectPosition} from 'src/types/ObjectPosition';
import {Coordinate} from 'src/types/Coordinate';

export class Player {
	position: ObjectPosition

	constructor(location: Coordinate) {
		this.position = new ObjectPosition(location)
	}

	getCharacter(): string {
		return "@"
	}
}
