## Obsidian Roguelike Dungeon Explorer (Prototype)

이 저장소는 **옵시디언 플러그인** 환경에서 구동되는 **텍스트 기반 턴제 로그라이크 게임**의 프로토타입입니다. 옵시디언의 **Custom View** 기능을 활용하여 HTML 텍스트로 게임 화면을 구현합니다.

---

### 핵심 기능

* **Custom View:** 게임 화면을 옵시디언 사이드바나 탭에 독립적으로 표시합니다.
* **ASCII 맵:** `#`(벽), `.`(바닥), `@`(플레이어)로 구성된 맵을 텍스트로 렌더링합니다.
* **턴제 이동:** **WASD** 또는 **화살표 키**를 통한 기본적인 플레이어(`@`) 이동 및 벽 충돌 감지 기능을 제공합니다.

---

### 설치 및 시작

1.  **플러그인 폴더 복사:** 이 저장소의 컴파일된 파일(**`main.js`**, **`manifest.json`**, **`styles.css`**)을 옵시디언 볼트 내 `.obsidian/plugins/[플러그인 이름]/` 폴더에 복사합니다.
2.  **활성화:** 옵시디언 설정의 **Community plugins**에서 플러그인을 **활성화**합니다.
3.  **실행:** 명령어 팔레트(**`Cmd/Ctrl + P`**)를 열고 **`Open Roguelike Game Dungeon`** 명령을 실행하여 게임 뷰를 엽니다.

---

### 조작법

| 키 | 동작 |
| :--- | :--- |
| **W, A, S, D** / **화살표** | 턴제 이동 |

---

### 기술 스택

* **TypeScript**
* **Obsidian Plugin API** (`ItemView`, `registerView`, `addCommand`)
* **HTML/CSS** (ASCII 렌더링)
