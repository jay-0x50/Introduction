# Introduction

박재영의 프로필과 게임 개발 작업을 정리하는 정적 웹사이트 저장소입니다. 콘텐츠 수정과 GitHub Pages 배포에 사용합니다.

## 구성

- `index.html` — 웹사이트 진입점
- `index_com.html` — 프로필과 이력
- `Portfolio/` — 프로젝트 소개, 스타일, 이미지와 코드 기록
- `projects.html` — 프로젝트 기술서
- `output/pdf/` — 인쇄용 PDF
- `docs/` — 학습 노트와 작업 근거

HTML·CSS로 구성되어 있으며 별도 빌드 과정이 필요하지 않습니다.

## 로컬 실행

저장소 루트에서 다음 명령을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.

## 배포와 출력

GitHub Pages는 `main` 브랜치의 루트를 사용합니다. 배포 제외 항목은 `_config.yml`에서 관리합니다.

브라우저 인쇄 시 프로젝트 소개는 A4 가로, 이력과 기술서는 A4 세로로 출력됩니다. 내용을 수정하면 `output/pdf/`의 해당 파일도 함께 갱신합니다.

## 개발 기록

- [게임 개발 학습 노트](./docs/game-developer-study-notes.md)
- [설명 근거와 작성 범위](./docs/portfolio-evidence.md)
- [구현 위치](./Portfolio/CODE_SOURCES.md) · [구현 데이터](./Portfolio/code-excerpts.json)
- [Exception 이미지](./Portfolio/img/exception/README.md) · [Error Dungeon 이미지](./Portfolio/img/error-dungeon/README.md)
