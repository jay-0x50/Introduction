# 포트폴리오 코드 출처

2026-09-11에 실제 프로젝트 파일과 대조한 발췌입니다. 설명용 의사 코드를 추가하지 않았습니다. 화면에서는 공통 들여쓰기만 정리하고, 떨어진 구간은 중간 생략 표시로 구분합니다.

표시된 줄 번호는 확인한 작업본 기준입니다. 동일 코드의 커밋 내 줄 번호가 다르면 링크는 해당 커밋 위치로 연결합니다. 전체 원문·해시·검증 메타데이터는 [code-excerpts.json](code-excerpts.json)에 있습니다.

| 프로젝트 | 원본 파일 / 표시 줄 | 확인한 기준 | 원문 |
| --- | --- | --- | --- |
| Exception | `Source/Exception/Player/Character/PlayerFight.cpp` L573–575 | b38651497a50 | [커밋 원문](https://github.com/jay-0x50/Exception/blob/b38651497a500bab49022d1b02d049149921f5d9/Source/Exception/Player/Character/PlayerFight.cpp#L573-L575) |
| Exception | `Source/Exception/Player/Character/PlayerFight.cpp` L589–596 | b38651497a50 | [커밋 원문](https://github.com/jay-0x50/Exception/blob/b38651497a500bab49022d1b02d049149921f5d9/Source/Exception/Player/Character/PlayerFight.cpp#L589-L596) |
| Exception | `Source/Exception/Player/Character/PlayerFight.cpp` L613–618 | b38651497a50 | [커밋 원문](https://github.com/jay-0x50/Exception/blob/b38651497a500bab49022d1b02d049149921f5d9/Source/Exception/Player/Character/PlayerFight.cpp#L613-L618) |
| Exception | `Source/Exception/Boss/Team/BRBossTeamCoordinator.cpp` L49–68 | b38651497a50 | [커밋 원문](https://github.com/jay-0x50/Exception/blob/b38651497a500bab49022d1b02d049149921f5d9/Source/Exception/Boss/Team/BRBossTeamCoordinator.cpp#L49-L68) |
| Exception | `Source/Exception/Boss/Base/BossFight.cpp` L309–331 | b38651497a50 | [커밋 원문](https://github.com/jay-0x50/Exception/blob/b38651497a500bab49022d1b02d049149921f5d9/Source/Exception/Boss/Base/BossFight.cpp#L301-L323) |
| Exception | `Source/Exception/Player/Controller/ExceptionPlayerControllerHUD.cpp` L112–129 | 2026.09.11 로컬 작업본 | 미커밋 작업본 · 공개 커밋과 다름 |
| Exception | `Source/Exception/Save/BRSaveGameSubsystem.cpp` L212–220 | b38651497a50 | [커밋 원문](https://github.com/jay-0x50/Exception/blob/b38651497a500bab49022d1b02d049149921f5d9/Source/Exception/Save/BRSaveGameSubsystem.cpp#L212-L220) |
| Exception | `Source/Exception/Save/BRSaveGameSubsystem.cpp` L226–232 | b38651497a50 | [커밋 원문](https://github.com/jay-0x50/Exception/blob/b38651497a500bab49022d1b02d049149921f5d9/Source/Exception/Save/BRSaveGameSubsystem.cpp#L226-L232) |
| PyMax | `PyMax.py` L865–868 | 8f17bf2b169b | [커밋 원문](https://github.com/jay-0x50/PyMax/blob/8f17bf2b169bef6984480226ec4bb94971fec163/PyMax.py#L861-L864) |
| PyMax | `PyMax.py` L167–176 | 8f17bf2b169b | [커밋 원문](https://github.com/jay-0x50/PyMax/blob/8f17bf2b169bef6984480226ec4bb94971fec163/PyMax.py#L167-L176) |
| SpaceOut | `C++/학원/11 SpaceOut 실습/Sprite.h` L151–158 | cc6e82bd881b | [커밋 원문](https://github.com/jay-0x50/Programming-Notes/blob/cc6e82bd881bc3196c9f5012d29f00b9c55a0a11/C%2B%2B/%ED%95%99%EC%9B%90/11%20SpaceOut%20%EC%8B%A4%EC%8A%B5/Sprite.h#L151-L158) |
| SpaceOut | `C++/학원/11 SpaceOut 실습/SpaceOut.cpp` L201–210 | cc6e82bd881b | [커밋 원문](https://github.com/jay-0x50/Programming-Notes/blob/cc6e82bd881bc3196c9f5012d29f00b9c55a0a11/C%2B%2B/%ED%95%99%EC%9B%90/11%20SpaceOut%20%EC%8B%A4%EC%8A%B5/SpaceOut.cpp#L201-L210) |
| Error Dungeon | `Assets/ErrorDungeon/Scripts/Player/PlayerCombat.cs` L162–180 | adde96a0f683 | [커밋 원문](https://github.com/jay-0x50/ErrorDungeon/blob/adde96a0f683874b9f53d86f499f576ca77d610d/Assets/ErrorDungeon/Scripts/Player/PlayerCombat.cs#L162-L180) |
| Error Dungeon | `Assets/ErrorDungeon/Scripts/World/GameSession.cs` L187–206 | adde96a0f683 | [커밋 원문](https://github.com/jay-0x50/ErrorDungeon/blob/adde96a0f683874b9f53d86f499f576ca77d610d/Assets/ErrorDungeon/Scripts/World/GameSession.cs#L187-L206) |

## 설명 범위

- Exception HUD 바인딩은 미커밋 작업본입니다. 나머지 발췌는 확인한 커밋에도 같은 코드가 존재합니다.
- PyMax는 시간 기반 위치 계산과 BPM 기반 판정을 설명합니다. 이 코드 발췌 자체는 과거 수정 이력을 입증하지 않습니다. 재진입 시 조기 재생 오류의 회고는 [사용자 설명](../docs/portfolio-evidence.md)에 근거하며, 완벽한 오디오 동기화나 측정 수치를 주장하지 않습니다.
- SpaceOut은 사용자 저장소의 학원 예제 기반 실습입니다. 기존 프레임워크 전체의 직접 저작이나 DirectX·오브젝트 풀링 구현으로 소개하지 않습니다.
- Error Dungeon의 전투는 Unity 클라이언트 로직입니다. 실시간 전투의 서버 권위 검증이나 멀티플레이 구현으로 설명하지 않습니다.
- 원본 게임 프로젝트는 수정하지 않았습니다. Error Dungeon 이미지 촬영용 복제본의 호환 수정은 [캡처 기록](img/error-dungeon/README.md)에 별도로 적었습니다.
- 원문 링크 열람에는 해당 GitHub 저장소의 접근 권한이 필요할 수 있습니다.

## 표시 방식

포트폴리오는 게임 화면과 기능·문제·구현·결과 중심으로 구성합니다. 전체 코드 발췌는 본문에 나열하지 않고, 필요한 구현 위치만 링크합니다. 이 문서와 데이터는 기술 설명의 근거 기록으로 유지합니다.
