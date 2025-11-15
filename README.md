# Obsidian ASCII Maze

Obsidian 플러그인 기반 ASCII 미로 게임. 

---
## 타이머 측정 기준

타이머는 플레이어가 처음 이동했을 때 시작되며, 종료점 도달 시 정지

---
## 설치 방법

1. 프로젝트 빌드
```bash
npm install
npm run build
```

2. 컴파일된 파일(`main.js`, `manifest.json`, `styles.css`)을 옵시디언 볼트의 `.obsidian/plugins/obsidian-ascii-maze/` 폴더에 복사

3. Obsidian 설정에서 Community plugins 활성화

---
## 조작법

| 키 | 동작 |
| --- | --- |
| W / ↑ | 위로 이동 |
| S / ↓ | 아래로 이동 |
| A / ← | 왼쪽으로 이동 |
| D / → | 오른쪽으로 이동 |

## 컴포넌트 구조
- Field 와 Module 로 구성된 게임 화면
```
┌─────────────────────────────────────────┐
│ Field (ROW 단위)                         │
│ ┌─────────┬─────────┬─────────┬───────┐ │
│ │ Module  │ Module  │ Module  │ ...   │ │
│ │ (COL 1) │ (COL 2) │ (COL 3) │       │ │
│ └─────────┴─────────┴─────────┴───────┘ │
└─────────────────────────────────────────┘
```
