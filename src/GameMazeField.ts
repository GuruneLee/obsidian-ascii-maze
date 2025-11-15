// src/game/Game.ts
import {Player} from "./Player";
import {Coordinate} from "./Coordinate";
import {Maze} from "./Maze";

export class GameMazeField {
	maze: Maze;
	player: Player

	initMap(wallHeight: number, wallWidth: number) {
		this.maze = this.generateMaze(wallHeight, wallWidth);
		this.player = new Player(this.maze.startCoord)
	}

	private generateMaze(wallHeight: number, wallWidth: number): Maze {
		const field = [
			"##########",
			"#........#",
			"#.###.##.#",
			"#...#..#.#",
			"##.####.##",
			"#........#",
			"##########",
		];

		return new Maze(field, wallHeight, wallWidth,
			{coordX: 1, coordY: 1},
			{coordX: wallHeight - 2, coordY: wallWidth - 2}
		);
	}

	movePlayer(dx: number, dy: number): boolean {
		const newLocation = {
			coordX: this.player.position.posX + dx,
			coordY: this.player.position.posY + dy,
		}

		// 맵 경계 및 벽(#) 충돌 검사
		if (this.isValidLocationForPlayer(newLocation)) {
			this.player.position.updatePosition(newLocation)
			return true; // 이동 성공
		}
		return false; // 이동 실패 (벽 또는 경계)
	}

	isPlayerHere(location: Coordinate): boolean {
		return location.coordX === this.player.position.posX && location.coordY === this.player.position.posY
	}

	isValidLocationForPlayer(coordinate: Coordinate): boolean {
		return this.maze.isInsideWall(coordinate)
			&& !this.maze.isWall(coordinate)
	}

	getMazeRenderOutput(): string {
		let output = '';

		for (let x = 0; x < this.maze.wallHeight; x++) {
			let row = '';
			for (let y = 0; y < this.maze.wallWidth; y++) {
				let currentLocation = {coordX: x, coordY: y};
				try {
					if (this.isPlayerHere(currentLocation)) {
						row += this.player.getCharacter();
					} else {
						if (this.isStartLocation(currentLocation)) {
							row += this.maze.getStartObject();
						} else if (this.isFinishLocation(currentLocation)) {
							row += this.maze.getFinishObject();
						} else {
							row += this.maze.getObject(currentLocation);
						}
					}
				} catch (e) {
					console.error(e)
					row += '/'
				}
			}
			output += row + '\n';
		}

		return output
	}
}
