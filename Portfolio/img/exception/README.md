# Exception screenshots

2026-09-10에 로컬 Exception 프로젝트의 Unreal Editor에서 직접 캡처했습니다.
원본 화면을 수정하지 않고 WebP(quality 92)로 재인코딩했습니다.

| 파일 | 캡처 내용 | 방식 |
| --- | --- | --- |
| field-2026-09.webp | L_Runtime_Field 구조물과 탐험 경로 | Unreal MCP CaptureViewport |
| bosses-2026-09.webp | Python 듀얼 보스의 외형 및 배치 | Unreal MCP CaptureViewport |
| runtime-2026-09.webp | Hendel과 플레이어 HUD | PIE 뷰포트의 Slate Screenshot |
| inventory-2026-09.webp | 아이템 분류와 상세 정보 | PIE 뷰포트의 Slate Screenshot |
| pause-2026-09.webp | 메뉴와 레벨업 패널 | PIE 뷰포트의 Slate Screenshot |

에디터 뷰포트 이미지는 전투 장면이 아닌 배치 화면입니다. 메뉴 캡처 시 디버그 메시지를 잠시 숨긴 후 원래대로 복원했습니다. 게임 에셋과 코드는 변경하지 않았습니다.

포트폴리오의 구현 설명은 로컬 프로젝트의 `PlayerFight.cpp`, `BRBossBase`, `BRBossTeamCoordinator.cpp`, 플레이어 컨트롤러의 UI 바인딩, `BRSaveGameSubsystem.cpp`를 확인해 작성했습니다.
