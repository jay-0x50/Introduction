# 포트폴리오 설명의 근거

## PyMax: 재진입 시 조기 재생

2026-09-22 사용자 설명에 근거합니다. 이미지·노래 로딩이 끝난 후 뒤로 갔다가 다시 들어오면, 로딩 대기 시간은 유지되는데 노래와 영상은 먼저 재생됐습니다. 리소스 로딩이 완료됐을 때 시작하도록 변경했다는 경험을 정리했습니다.

구체적인 과거 수정 커밋은 확인하지 않았으므로, 특정 콜백·비동기 API·캐시 시스템을 구현했다고 쓰지 않습니다. 성능 개선 수치나 회귀 테스트 통과 이력도 추가하지 않습니다. 현재 시간 계산·판정 코드는 [기존 구현 기록](../Portfolio/CODE_SOURCES.md)과 별개 근거입니다.

## Exception / Error Dungeon 게임플레이

[코드 출처](../Portfolio/CODE_SOURCES.md)와 [구현 데이터](../Portfolio/code-excerpts.json)를 기준으로 담당 기능과 설계상의 문제를 설명합니다. 공격별 중복 피해 방지, 보스 공격 조율, 처형 중 Groggy 회복 지연, HUD 바인딩, 체크포인트 복구, 입력 버퍼·리스폰 규칙은 코드에서 확인했습니다. 이 자료만으로 과거 특정 버그를 겪었다고 주장하지 않습니다.

## Error Dungeon: 로컬 Linux VM 배포

기존 프로젝트의 `기획서/참고서/리눅스 프로젝트.md` 기록과 `deploy/nginx/error-dungeon.conf`, `deploy/scripts/install-webgl.sh`를 확인했습니다.

- 보고서 425~426행: API 재시작 순간 일시적 502, 새 WebGL 빌드가 예전 모습으로 실행되는 현상.
- 457행: 웹·API HTTP 200, 서비스 3개 active, 로컬/배포 파일 해시 일치.
- 476·489~490행: AI 코드·분석 보조 범위와 직접 VM 명령 실행·배포·캡처·검증한 범위.
- `/Build/` 캐시 설정과 배포 스크립트의 curl 재시도도 확인했습니다.

성과는 당시 로컬 배포·검증 결과입니다. `error-dungeon.local`은 VMware NAT와 hosts 설정을 쓰는 로컬 주소이므로 공개 플레이 버튼으로 연결하지 않습니다. 캡처는 [이미지 출처](../Portfolio/img/error-dungeon/README.md)에 기록했습니다.

## SpaceOut

C++·Win32 API·GDI 학원 예제 기반 실습입니다. DirectX·HLSL·자체 엔진·오브젝트 풀링 구현 성과로 설명하지 않습니다.
