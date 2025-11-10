// src/main.ts

import { Plugin } from 'obsidian';
import { RoguelikeView, VIEW_TYPE_ROGUE } from 'src/RoguelikeView';

export default class RoguelikePlugin extends Plugin {

	async onload() {
		this.registerView(
			VIEW_TYPE_ROGUE,
			(leaf) => new RoguelikeView(leaf)
		);

		this.addCommand({
			id: 'open-roguelike-game',
			name: 'Open Roguelike Game Dungeon',
			callback: () => {
				this.activateView();
			}
		});

		this.addRibbonIcon('dice', 'Start Roguelike Game', () => {
			this.activateView();
		});
	}

	onunload() {
		console.log('로그라이크 플러그인 언로드.');
	}

	// Custom View 활성화 함수
	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_ROGUE); // 기존 뷰 닫기 (선택적)

		await this.app.workspace.getRightLeaf(false)?.setViewState({
			type: VIEW_TYPE_ROGUE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_ROGUE)[0]
		);
	}
}
