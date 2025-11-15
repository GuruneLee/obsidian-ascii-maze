// src/main.ts

import {Plugin} from 'obsidian';
import {GameMazeView, VIEW_TYPE_MAZE} from 'src/views/GameMazeView';

export default class AsciiMazePlugin extends Plugin {

	async onload() {
		this.registerView(
			VIEW_TYPE_MAZE,
			(leaf) => new GameMazeView(leaf)
		);

		this.addCommand({
			id: 'open-maze-game',
			name: 'Open Maze Game Dungeon',
			callback: () => {
				this.activateView();
			}
		});

		this.addRibbonIcon('dice', 'Start Maze Game', () => {
			this.activateView();
		});
	}

	onunload() {
		console.log('ASCII-MAZE 플러그인 언로드.');
	}

	// Custom View 활성화 함수
	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_MAZE); // 기존 뷰 닫기 (선택적)

		await this.app.workspace.getRightLeaf(false)?.setViewState({
			type: VIEW_TYPE_MAZE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_MAZE)[0]
		);
	}
}
