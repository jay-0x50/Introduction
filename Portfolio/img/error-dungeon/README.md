# Error Dungeon 이미지 출처

2026-09-11, `jay-0x50/ErrorDungeon`의 커밋 `adde96a0f683874b9f53d86f499f576ca77d610d`를 별도 작업 복제본에서 실행해 촬영했습니다.

| 파일 | 내용 |
| --- | --- |
| gameplay.png | 시작 지역의 플레이어·불씨·탐험 동선 |
| boss.png | 보스와 전투 구역 |
| world.png | 월드 전경 |

`Main.unity`를 Play 모드로 실행해 `GameBootstrap`과 `ProceduralArt`가 생성한 실제 지형·캐릭터·월드를 `Camera.Render()`와 RenderTexture로 촬영했습니다. 1600×900 PNG이며 생성형 이미지나 재구성 이미지가 아닙니다. 촬영 카메라의 시점만 설정했으며 이미지 보정은 하지 않았습니다. IMGUI 기반 HUD는 이 촬영 방식에 포함되지 않습니다.

원래 프로젝트 버전은 Unity 2022.3.21f1이며, 촬영에는 설치된 Unity 6000.6.0f1을 사용했습니다. 촬영용 복제본에서만 아래 호환 설정을 적용했습니다.

- AI 파일의 `GetInstanceID()` 호출 3곳을 `GetEntityId().GetHashCode()`로 바꿨습니다.
- 촬영에 사용하지 않는 MCP·Linux 빌드·IDE 패키지와 관련 define을 비활성화했습니다.
- 보조 에디터 스크립트로 원본 카메라와 같은 FOV·클리핑·HDR·Skybox 설정을 적용해 촬영했습니다. 원본 코드는 batch 실행 시 게임 카메라를 만들지 않습니다.
- 외부 API 접속은 비활성화했습니다.

원본 저장소에는 위 변경을 적용하지 않았고, 포트폴리오의 코드 발췌는 변경 전 커밋과 일치합니다. 이 이미지는 원본 2022 에디터의 HUD 포함 플레이 화면이 아닌, 해당 코드로 실행한 런타임 월드 캡처입니다.

## 로컬 Linux VM 배포 기록

- `deployment-status.png`: 기존 리눅스 프로젝트 보고서의 image3.png. 로컬 상태 페이지 화면.
- `deployment-check.png`: 같은 보고서의 image21.png. 서비스 active/enabled 및 HTTP 200 응답 검증.

2026.09.01 보고서 캡처를 수정 없이 복사했습니다. 공개 서비스 접속이나 현재 운영 상태를 뜻하지 않습니다. 화면의 visits는 페이지 방문 집계이며 사용자 수·흥행 성과로 사용하지 않습니다. AI 도구의 코드·분석 보조와 사용자 VM 배포·검증 범위는 보고서에 기록되어 있습니다.
