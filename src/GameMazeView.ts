import {ItemView, WorkspaceLeaf} from 'obsidian';
import {GameMazeField} from 'src/GameMazeField';

export const VIEW_TYPE_MAZE = "maze-view";

export class GameView extends ItemView {
	mazeField: GameMazeField;
	mazeContainer: HTMLElement;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.mazeField = new GameMazeField();
	}

	getViewType(): string {
		return VIEW_TYPE_MAZE;
	}

	getDisplayText(): string {
		return "ASCII MAZE";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.addClass('maze-field-container');

		// 맵을 표시할 <pre> 요소 생성 (ASCII 맵에 적합)
		this.mazeContainer = container.createEl('pre', {cls: 'maze-map'});

		// 키보드 이벤트 리스너 추가
		this.registerDomEvent(document, 'keydown', this.handleKeyDown.bind(this));

		// game view 초기화
		this.mazeField.initMap(7, 10)
		this.renderMap();
	}

	handleKeyDown(evt: KeyboardEvent) {
		let dx = 0;
		let dy = 0;

		switch (evt.key.toLowerCase()) {
			case 'w':
			case 'arrowup':
				dx = -1;
				break;
			case 's':
			case 'arrowdown':
				dx = 1;
				break;
			case 'a':
			case 'arrowleft':
				dy = -1;
				break;
			case 'd':
			case 'arrowright':
				dy = 1;
				break;
			default:
				return;
		}

		evt.preventDefault();

		this.mazeField.movePlayer(dx, dy);
		this.renderMap();
	}

	renderMap() {
		let output = '';

		output += this.informationField.getInformationRenderOutput()
		output += this.mazeField.getMazeRenderOutput()

		this.mazeContainer.innerText = output;
	}
}
