# onboarding_vite

## todo app

### 파일구조

```text
onboarding_todo-todo
├─ .storybook                   # Storybook 설정
├─ cypress                      # E2E 테스트
│  └─ e2e
├─ public
│  └─  assets
│     └─ css                    # 전체 적용될 css
│        ├─ global
│        │  ├─ common.css
│        │  ├─ reset.css
│        │  └─ variable.css
│        ├─ dnd.ui.css
│        └─ global.css
├─ src
│  ├─ components                # Component html, css
│  │  ├─ form
│  │  └─ todo
│  ├─ const                     # 상수
│  │  ├─ dnd.const.js
│  │  └─ todo.const.js
│  ├─ mockup                    # Mockup 데이터
│  ├─ pages                     # 페이지 html, css
│  │  └─ todo
│  ├─ service                   # 데이터 통신 함수
│  │  └─ todo.service.js
│  ├─ store                     # 데이터 조작 함수
│  │  ├─ dnd.store.js
│  │  └─ todo.store.js
│  ├─ stories                   # Storybook 스토리, unit 테스트
│  │  ├─ components
│  │  └─ pages
│  ├─ ui                        # DOM 조작 및 렌더 함수
│  │  ├─ dnd
│  │  └─ todo
│  ├─ utils                     # todo, dnd 클래스
│  │  ├─ todo
│  │  └─ dnd.js
│  └─ main.js
├─ README.md
└─ index.html
```

### 설치 & 실행

#### 노드버전

- node v20.10.0

#### 의존성 설치

```bash
npm install
```

#### 개발 서버 실행

```bash
npm run dev
```

#### storybook 실행

```bash
npm run storybook
```

#### unit test

- jset 사용

```bash
npm run test:unit
```

#### e2e test

- cypress 사용

### 실행

```bash
npm run test:e2e
```
