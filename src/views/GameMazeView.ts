import {ItemView, WorkspaceLeaf} from 'obsidian';
import {GameInformationField} from 'src/fields/GameInformationField';
import {PlayerBehaviorResult} from 'src/types/PlayerBehaviorResult';
import {GameMazeField} from "src/fields/GameMazeField";

export const VIEW_TYPE_MAZE = "maze-view";

export class GameMazeView extends ItemView {
	informationField: GameInformationField;
	mazeField: GameMazeField;
	mazeContainer: HTMLElement;
	rendering = false
	isFinished = false

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.informationField = new GameInformationField();
		this.mazeField = new GameMazeField();
	}

	async onload() {
		this.registerInterval(
			window.setInterval(() => {
				if (this.rendering) this.renderMap()
			}, 10)
		)

		this.registerInterval(
			window.setInterval(() => {
				if (this.informationField.isTimerRunning) {
					this.informationField.timerField.endTime = new Date()
				}
			}, 10)
		)
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
		this.informationField.initInformation()
		this.mazeField.initMap(7, 10)
		this.rendering = true
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

		const result = this.mazeField.movePlayer(dx, dy);
		this.handlePlayerMove(result)
	}

	renderMap() {
		let output = '';

		output += this.informationField.getInformationRenderOutput()
		output += this.mazeField.getMazeRenderOutput()

		this.mazeContainer.innerText = output;
	}

	private handlePlayerMove(result: PlayerBehaviorResult) {
		if (result.action == 'move' && result.isFirstSuccessfulAction) {
			this.informationField.startTimer(new Date())
		}

		if (this.mazeField.isPlayerFinished()) {
			this.informationField.stopTimer()
		}
	}
}
