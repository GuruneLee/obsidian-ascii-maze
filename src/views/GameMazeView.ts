import {ItemView, WorkspaceLeaf} from 'obsidian';
import {GameInformationField} from 'src/fields/GameInformationField';
import {PlayerBehaviorResult} from 'src/types/PlayerBehaviorResult';
import {GameMazeField} from "src/fields/GameMazeField";
import {GameMazeRecordField} from "src/fields/GameMazeRecordField";

export const VIEW_TYPE_MAZE = "maze-view";

export class GameMazeView extends ItemView {
	informationField: GameInformationField;
	mazeField: GameMazeField;
	recordField: GameMazeRecordField;

	mazeContainer: HTMLElement;
	rendering = false

	gameRoundNumber: number;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.informationField = new GameInformationField();
		this.mazeField = new GameMazeField();
		this.recordField = new GameMazeRecordField();
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
					this.informationField.timerModule.endTime = new Date()
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
		this.gameRoundNumber = 1
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
		output += this.recordField.render()

		this.mazeContainer.innerText = output;
	}

	private handlePlayerMove(result: PlayerBehaviorResult) {
		if (result.action == 'move' && result.isFirstSuccessfulAction) {
			this.informationField.startRound(new Date())
		}

		if (this.mazeField.isPlayerFinished()) {
			this.informationField.finishRound()
			this.recordField.finishRound(
				this.gameRoundNumber,
				this.informationField.getTimeInformation().startTime,
				this.informationField.getTimeInformation().endTime
			)
		}
	}
}
