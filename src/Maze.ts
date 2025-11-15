import {Coordinate} from "./Coordinate";

export class Maze {
	field: string[]
	wallHeight: number
	wallWidth: number
	startCoord: Coordinate
	finishCoord: Coordinate

	constructor(field: string[], wallHeight: number, wallWidth: number, startCoord: Coordinate, finishCoord: Coordinate) {
		this.field = field;
		this.wallHeight = wallHeight;
		this.wallWidth = wallWidth;
		this.startCoord = startCoord;
		this.finishCoord = finishCoord;
	}

	getObject(location: Coordinate): string {
		return this.field[location.coordX][location.coordY]
	}

	isWall(location: Coordinate): boolean {
		return this.getObject(location) === '#'
	}

	isInsideWall(location: Coordinate): boolean {
		return 1 <= location.coordX && location.coordX <= this.wallHeight - 2
			&& 1 <= location.coordY && location.coordY <= this.wallWidth - 2
	}
}
