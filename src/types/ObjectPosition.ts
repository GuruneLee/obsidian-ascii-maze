import {Coordinate} from 'src/types/Coordinate';

export class ObjectPosition {
	posX: number;
	posY: number;

	constructor(location: Coordinate) {
		this.posX = location.coordX
		this.posY = location.coordY
	}

	updatePosition(location: Coordinate) {
		this.posX = location.coordX
		this.posY = location.coordY
	}
}
