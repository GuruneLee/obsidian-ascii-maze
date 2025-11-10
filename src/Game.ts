// src/game/Game.ts

export class Game {
	// TODO: random map generator
	// # 벽, . 바닥
	map: string[] = [
		"##########",
		"#........#",
		"#.###.##.#",
		"#...#..#.#",
		"##.####.##",
		"#........#",
		"##########",
	];
	initialPlayer= [1,1]

	playerX = this.initialPlayer[0];
	playerY = this.initialPlayer[1];

	getMapHeight(): number {
		return this.map.length;
	}

	getMapWidth(): number {
		return this.map[0].length;
	}

	movePlayer(dx: number, dy: number): boolean {
		const newX = this.playerX + dx;
		const newY = this.playerY + dy;

		// 맵 경계 및 벽(#) 충돌 검사
		if (
			newY >= 0 && newY < this.getMapHeight() &&
			newX >= 0 && newX < this.getMapWidth() &&
			this.map[newY][newX] !== '#'
		) {
			this.playerX = newX;
			this.playerY = newY;
			return true; // 이동 성공
		}
		return false; // 이동 실패 (벽 또는 경계)
	}
}
