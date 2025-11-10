import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Game } from 'src/Game';

export const VIEW_TYPE_ROGUE = "roguelike-view";

export class RoguelikeView extends ItemView {
	game: Game;
	mapContainer: HTMLElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.game = new Game();
	}

	getViewType(): string {
		return VIEW_TYPE_ROGUE;
	}

	getDisplayText(): string {
		return "ASCII 던전";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.addClass('roguelike-container');

		// 맵을 표시할 <pre> 요소 생성 (ASCII 맵에 적합)
		this.mapContainer = container.createEl('pre', { cls: 'roguelike-map' });

		// 키보드 이벤트 리스너 추가
		this.registerDomEvent(document, 'keydown', this.handleKeyDown.bind(this));

		this.renderMap();
	}

	handleKeyDown(evt: KeyboardEvent) {
		let dx = 0;
		let dy = 0;

		switch (evt.key.toLowerCase()) {
			case 'w':
			case 'arrowup':
				dy = -1;
				break;
			case 's':
			case 'arrowdown':
				dy = 1;
				break;
			case 'a':
			case 'arrowleft':
				dx = -1;
				break;
			case 'd':
			case 'arrowright':
				dx = 1;
				break;
			default:
				return;
		}

		evt.preventDefault();

		this.game.movePlayer(dx, dy);
		this.renderMap();
	}

	renderMap() {
		let output = '';
		const map = this.game.map;

		for (let y = 0; y < this.game.getMapHeight(); y++) {
			let row = '';
			for (let x = 0; x < this.game.getMapWidth(); x++) {
				if (x === this.game.playerX && y === this.game.playerY) {
					row += '@';
				} else {
					row += map[y][x];
				}
			}
			output += row + '\n';
		}

		this.mapContainer.innerText = output;
	}
}
