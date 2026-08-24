# HealthRecApi · StateScript 코드 이해 생존 가이드

이 문서의 목표는 코드를 전부 외우는 것이 아닙니다. 아래 세 가지를 자기 말로 설명할 수 있게 만드는 것이 목표입니다.

1. 입력이 들어와서 결과가 나갈 때까지 어떤 파일을 거치는가?
2. 각 클래스는 왜 따로 존재하는가?
3. 현재 구현의 한계와 다음 개선 방향은 무엇인가?

## 영어 용어 발음 빠른 표

발음은 한국 개발 현장에서 흔히 말하는 방식으로 적었습니다. 사람마다 조금 다르게 읽어도 의미가 통하면 문제없습니다.

| 표기 | 보통 이렇게 읽음 | 아주 짧은 뜻 |
|---|---|---|
| `sealed` | 실드 | 상속할 수 없게 막음 |
| `interface` | 인터페이스 | 구현할 기능의 약속 |
| `record` | 레코드 | 데이터 표현에 적합한 C# 타입 |
| Entity | 엔티티 | DB에 저장되는 객체 |
| DTO | 디티오 | API가 주고받는 데이터 모양 |
| DI | 디아이 | 필요한 객체를 외부에서 주입 |
| `async` / `await` | 에이싱크 / 어웨이트 | 비동기 작업 선언 / 완료 대기 |
| LINQ | 링크 | C# 데이터 조회 문법 |
| `CancellationToken` | 캔슬레이션 토큰 | 작업 취소 신호 |
| Middleware | 미들웨어 | 요청 앞뒤에서 공통 기능 처리 |
| Claim | 클레임 | JWT 안의 사용자 정보 항목 |
| JWT | 제이더블유티 | 서명된 인증 토큰 |
| BCrypt | 비크립트 | 비밀번호 해시 알고리즘 |
| EF Core | 이-에프 코어 | C# 객체로 DB를 다루는 ORM |
| ORM | 오알엠 | 객체와 DB 테이블을 연결하는 기술 |
| Migration | 마이그레이션 | DB 구조 변경 이력 |
| Singleton | 싱글턴 | 앱 전체에서 인스턴스 하나 사용 |
| Scoped | 스코프트 | 보통 HTTP 요청마다 인스턴스 하나 사용 |
| Lexer | 렉서 | 문자를 토큰으로 나눔 |
| Token | 토큰 | 문법을 구성하는 최소 단위 |
| Parser | 파서 | 토큰을 문법 구조로 만듦 |
| AST | 에이에스티 | 코드 구조를 나타낸 트리 |
| Interpreter | 인터프리터 | AST를 읽어 실제 실행 |
| DSL | 디에스엘 | 특정 목적을 위한 작은 언어 |
| Runtime | 런타임 | 프로그램이 실제 실행되는 단계 |
| Host | 호스트 | DSL 밖에서 실제 기능을 제공하는 앱 |
| short-circuit | 쇼트 서킷 | 결과가 정해지면 뒤 연산을 생략 |
| Behavior Tree | 비헤이비어 트리 | 게임 AI 행동을 트리로 구성하는 방식 |

면접에서는 영어 발음을 완벽하게 하는 것보다 **그 용어가 이 프로젝트에서 무슨 일을 하는지** 설명하는 것이 훨씬 중요합니다.

---

## 0. 먼저: 내가 직접 짜지 않은 코드, 면접에서 어떻게 말할까?

모르는 코드를 본인이 전부 직접 설계했다고 말하면 꼬리 질문 두세 개에서 바로 막힐 가능성이 큽니다. 그렇다고 프로젝트 전체를 포기할 필요는 없습니다. **도구의 도움을 받은 사실과, 본인이 한 판단·검증·학습을 구분해서 말하는 것**이 가장 안전합니다.

### 피해야 할 답변

> 전부 제가 직접 설계하고 구현했습니다.

실제로 그렇지 않다면 이후에 `왜 Singleton인가요?`, `파서 우선순위는 어떻게 구현했나요?` 같은 질문을 방어하기 어렵습니다.

### 권장 답변 틀

> 초기 구현에는 AI 도구의 도움을 받았습니다. 다만 결과물을 그대로 제출하는 데 그치지 않기 위해 요청 흐름과 테스트를 직접 추적했고, 현재는 주요 구조와 선택 이유, 한계를 설명할 수 있도록 코드를 검증하고 있습니다. 특히 제가 직접 확인한 부분은 ○○이고, 아직 보완 중인 부분은 △△입니다.

중요한 것은 앞으로 실제로 다음을 수행해 이 말을 사실로 만드는 것입니다.

- 프로젝트를 직접 실행한다.
- 핵심 흐름에 중단점을 찍고 값이 변하는 것을 본다.
- 테스트 하나를 직접 수정하거나 추가한다.
- 작은 기능 하나를 직접 변경하고 다시 테스트한다.
- 이해하지 못한 설계를 아는 척하지 않고 현재 이해 범위를 말한다.

### 현재 기여도를 정리하는 표

면접 전에 반드시 실제 내용으로 채우세요.

| 구분 | 내가 한 일 |
|---|---|
| 문제와 주제 선정 | |
| 요구사항 결정 | |
| AI에 요청한 내용 | |
| 직접 검토한 코드 | |
| 직접 수정한 부분 | |
| 직접 실행한 테스트 | |
| 발견한 문제와 개선 | |

---

# 1. 코드를 읽기 전에 알아야 할 최소 C# 문법

## 클래스와 인터페이스(interface, 인터페이스)

```csharp
public interface IRecommendationEngine
{
    RecommendationResponseDto Generate(HealthRecord record);
}

public sealed class RecommendationEngine : IRecommendationEngine
{
    public RecommendationResponseDto Generate(HealthRecord record) { ... }
}
```

- `interface`(인터페이스): 이 객체가 제공해야 하는 기능의 약속입니다.
- `class`: 실제 동작을 구현합니다.
- `sealed`(실드): 이 클래스를 상속하지 못하게 합니다.
- 여기서는 Service가 구체 클래스보다 인터페이스에 의존하게 해 구현 교체와 테스트를 쉽게 합니다.

## 생성자 주입(DI, 디아이)

```csharp
public sealed class HealthRecordService(
    AppDbContext dbContext,
    IRecommendationEngine recommendationEngine)
```

`HealthRecordService`가 필요한 객체를 내부에서 `new`로 만들지 않고 외부에서 받습니다. 실제 연결은 `Program.cs`에서 합니다.

```csharp
builder.Services.AddScoped<IHealthRecordService, HealthRecordService>();
builder.Services.AddSingleton<IRecommendationEngine, RecommendationEngine>();
```

면접용 한 문장:

> 객체 생성과 연결을 프레임워크에 맡겨 결합도를 낮추고 테스트나 구현 교체를 쉽게 했습니다.

## async/await(에이싱크/어웨이트)

```csharp
var record = await dbContext.HealthRecords.SingleOrDefaultAsync(...);
```

DB나 네트워크 응답을 기다리는 동안 스레드를 붙잡아 두지 않기 위한 비동기 처리입니다. `Task<T>`는 나중에 완료되어 `T`를 돌려줄 작업이라는 뜻입니다.

## LINQ(링크)

```csharp
dbContext.HealthRecords
    .Where(record => record.UserId == userId)
    .OrderByDescending(record => record.MeasuredAt)
    .Select(record => new HealthRecordResponseDto(...))
```

- `Where`: 조건에 맞는 데이터만 선택
- `OrderByDescending`: 내림차순 정렬
- `Select`: 원하는 형태로 변환
- EF Core에서는 이 표현이 대체로 SQL로 번역되어 DB에서 실행됩니다.

## record(레코드)와 DTO(디티오)

```csharp
public sealed record LoginResponse(string AccessToken, int ExpiresIn);
```

`record`는 데이터 전달용 값을 간결하게 표현하기 좋습니다. DTO는 API가 주고받을 데이터 모양이며 DB Entity와 분리되어 있습니다.

## CancellationToken(캔슬레이션 토큰)

클라이언트가 연결을 끊거나 요청이 취소되었을 때 불필요한 DB 작업도 중단할 수 있도록 전달하는 값입니다. Controller → Service → EF Core까지 이어집니다.

---

# 2. HealthRecApi: 이것만 먼저 이해하기

## 2-1. 한 줄 설명

> 사용자가 가입·로그인한 뒤 자신의 건강검진 기록을 CRUD하고, 입력 수치에 따라 규칙 기반 영양소 추천을 받는 ASP.NET Core Web API입니다.

## 2-2. 전체 지도

```text
브라우저/클라이언트
  │ HTTP 요청 + JSON + Bearer JWT
  ▼
Program.cs의 Middleware(미들웨어)
  │ 예외 처리 → CORS → 인증 → 인가
  ▼
Controller
  │ 입력 수신, 사용자 ID 확인, HTTP 상태 코드 결정
  ▼
Service
  │ 회원가입/로그인/CRUD/소유권 검사
  ├──────────────▶ RecommendationEngine
  │                 건강 수치를 독립 규칙으로 평가
  ▼
AppDbContext → EF Core → SQLite
```

파일별 역할은 다음 정도만 먼저 기억하면 됩니다.

| 파일/폴더 | 역할 |
|---|---|
| `Program.cs` | 모든 부품 등록, JWT 설정, 미들웨어 실행 순서 |
| `Controllers` | HTTP 요청과 응답 담당 |
| `Services` | 실제 업무 흐름과 소유권 검사 |
| `Data/AppDbContext.cs` | Entity와 DB 테이블 관계 설정 |
| `Models` | DB에 저장되는 Entity |
| `Dtos` | API 입출력 데이터 모양과 검증 |
| `Recommendation` | 건강 수치별 추천 규칙 |
| `tests` | 규칙, 전체 API 흐름, 실제 SQLite 스키마 검증 |

## 2-3. 건강 기록 생성 흐름

`POST /api/healthrecords` 요청을 예로 듭니다.

1. JWT Middleware가 토큰의 서명과 만료 등을 검사합니다.
2. `[Authorize]`가 인증되지 않은 요청을 차단합니다.
3. JSON이 `HealthRecordCreateDto`로 변환되고 입력 범위를 검증합니다.
4. Controller가 JWT의 `NameIdentifier` Claim(클레임)에서 `userId`를 꺼냅니다.
5. `HealthRecordService.CreateAsync()`에 `userId`와 DTO를 넘깁니다.
6. Service가 새 `HealthRecord` Entity를 만들고 DbContext에 추가합니다.
7. `SaveChangesAsync()`가 INSERT를 실행합니다.
8. Entity를 응답 DTO로 바꿉니다.
9. Controller가 `201 Created`와 생성된 데이터, 조회 위치를 반환합니다.

면접용 30초 답변:

> 요청은 JWT 인증과 DTO 검증을 거쳐 Controller로 들어옵니다. Controller는 토큰 Claim에서 사용자 ID를 얻어 Service에 전달하고, Service는 DTO를 Entity로 변환해 EF Core로 저장합니다. 저장 결과는 응답 DTO로 바꿔 `201 Created`로 반환합니다. HTTP 처리, 업무 로직, 영속성 책임을 분리한 구조입니다.

## 2-4. 회원가입과 로그인

### 회원가입

```text
이메일 정규화(trim + 소문자)
 → 같은 이메일 존재 여부 조회
 → BCrypt로 비밀번호 해시
 → User 저장
 → 201 또는 중복이면 409
```

비밀번호는 복호화 가능한 형태로 저장하지 않습니다. BCrypt(비크립트)는 salt(솔트)를 포함하며 계산 비용을 의도적으로 높여 비밀번호 추측 공격을 어렵게 하는 비밀번호 해시 함수입니다.

코드에는 동시 가입도 고려되어 있습니다. `AnyAsync()`를 통과한 두 요청이 동시에 저장될 수 있으므로 DB의 unique index가 최종 방어선이 됩니다. `DbUpdateException`이 발생하면 실제 중복 생성 여부를 다시 확인해 일반적인 중복 결과로 처리합니다.

### 로그인

```text
이메일로 User 조회
 → BCrypt로 입력 비밀번호와 저장된 해시 비교
 → 성공 시 JWT 생성
 → accessToken과 expiresIn 반환
```

JWT(제이더블유티) Claim에는 다음이 들어갑니다.

- `NameIdentifier`: 사용자 Guid
- `Email`: 정규화된 이메일
- `jti`: 토큰별 고유 ID

JWT는 암호화된 비밀 상자가 아닙니다. Payload는 읽을 수 있으므로 민감한 정보를 넣으면 안 됩니다. 서명을 통해 내용이 변조되지 않았음을 검증하는 인증 수단입니다.

## 2-5. 401과 403

- `401 Unauthorized`: 로그인 정보가 없거나 토큰이 유효하지 않음
- `403 Forbidden`: 로그인은 했지만 해당 기록의 소유자가 아님

건강 기록 상세 조회의 흐름은 다음과 같습니다.

```text
recordId로 기록 조회
 ├─ 없음 → 404
 ├─ record.UserId != 로그인 userId → 403
 └─ 소유자 일치 → 200 + 데이터
```

목록 조회는 처음부터 `Where(record => record.UserId == userId)`로 자신의 데이터만 가져옵니다. 이는 다른 사용자의 객체 ID를 조작해 접근하는 IDOR/BOLA 계열 문제를 막기 위한 소유권 검사입니다.

## 2-6. EF Core(이-에프 코어) 핵심

### Entity와 DTO를 나누는 이유

- `Entity`: DB 저장 구조
- `DTO`: 외부 API 계약

Entity를 그대로 반환하면 `PasswordHash`, 내부 관계, 불필요한 필드가 노출될 수 있고 DB 구조 변경이 API 변경으로 번집니다.

### AsNoTracking

읽기만 하는 조회는 변경 추적이 필요 없으므로 `AsNoTracking()`으로 메모리와 추적 비용을 줄입니다. 수정과 삭제에서는 조회한 Entity의 변경을 EF Core가 알아야 하므로 추적 상태로 가져옵니다.

### 인덱스

- `User.Email` unique index: 중복 계정 차단
- `HealthRecord.UserId`: 사용자별 조회 지원
- `(UserId, MeasuredAt)`: 사용자별 날짜 기반 기록 조회·정렬 지원

### Migration(마이그레이션)과 EnsureCreated(인슈어 크리에이티드)

- 관계형 SQLite: `Migrate()`로 버전별 스키마 변경 이력 적용
- 테스트 InMemory provider: 관계형 마이그레이션 대상이 아니므로 `EnsureCreated()` 사용

## 2-7. 추천 엔진

`RecommendationEngine.Generate()`는 각 건강 지표를 독립적으로 평가합니다.

```text
공복혈당 평가
총콜레스테롤 평가
혈압 평가
과체중 평가
저체중 평가
헤모글로빈 평가
  ↓
해당되는 결과를 모두 List에 추가
  ↓
0개면 정상 메시지, 아니면 추천 개수 메시지
```

예를 들어 공복혈당이 130이고 BMI가 31이면 두 조건이 모두 결과에 포함됩니다. 하나만 고르는 `else if` 구조가 아닙니다.

Singleton인 이유는 현재 엔진이 DB나 사용자별 상태를 보관하지 않는 순수한 규칙 객체이기 때문입니다. 만약 Scoped인 DbContext를 내부에 보관하면 수명 주기가 충돌하며, 멀티스레드 요청 사이에 상태가 공유될 위험도 생깁니다.

현재 방식의 한계:

- 규칙이 코드에 하드코딩되어 변경할 때 재배포가 필요함
- 성별, 나이, 질환, 복용약, 검사실별 기준 차이를 반영하지 않음
- 의학적 진단으로 오해될 수 있음
- 규칙 버전과 추천 근거를 추적하지 않음

운영 서비스라면 규칙 버전 관리, 전문가 검토, 근거 표시, 면책 문구, 개인정보 보호, 감사 로그가 필요합니다.

## 2-8. 입력 검증과 오류 처리

- `[Range]`: 필드 하나의 허용 범위 검사
- `IValidatableObject`: 미래 날짜 금지, 이완기 혈압 < 수축기 혈압처럼 여러 필드가 관련된 검사
- 전역 예외 처리: 예상하지 못한 예외의 상세 내용을 사용자에게 노출하지 않고 500 응답으로 변환
- 공통 `ErrorResponse`: 오류 응답 형식을 `{ "error": "..." }`로 통일

## 2-9. 테스트를 이해하는 방법

| 테스트 | 보호하는 것 |
|---|---|
| `RecommendationEngineTests` | 경계값과 복합 추천 규칙 |
| `ApiFlowTests` | 회원가입 → 로그인 → JWT → CRUD → 추천 전체 흐름 |
| `SqliteMigrationTests` | 실제 SQLite 테이블, unique index, cascade FK |

InMemory DB는 빠르지만 실제 SQLite와 SQL 동작, 제약 조건, 마이그레이션 차이를 완전히 재현하지 못합니다. 그래서 실제 SQLite 테스트가 별도로 필요합니다.

## 2-10. HealthRecApi에서 반드시 직접 해볼 것

- [ ] 앱을 실행하고 Swagger를 연다.
- [ ] 회원가입 → 로그인 → JWT 입력 → 기록 생성 → 추천 조회를 직접 한다.
- [ ] 토큰 없이 요청해 401을 확인한다.
- [ ] 사용자 두 명을 만들고 다른 사용자의 recordId로 요청해 403을 확인한다.
- [ ] 공복혈당 99/100/125/126 경계값 테스트를 읽고 직접 한 개 추가한다.
- [ ] `RecommendationEngine`의 기준 하나를 임시로 바꾸고 어떤 테스트가 실패하는지 본 뒤 원복한다.
- [ ] Controller와 Service에 중단점을 찍고 `userId`, `record`, `result.Status`를 확인한다.

---

# 3. StateScript: 이것만 먼저 이해하기

## 3-1. 한 줄 설명

> 게임 AI 상태를 텍스트로 정의할 수 있도록 Lexer(렉서), 재귀 하강 Parser(파서), AST(에이에스티), Interpreter(인터프리터)를 직접 구현한 작은 DSL(디에스엘)과 상태 머신 런타임입니다.

DSL은 Domain-Specific Language(도메인 스페시픽 랭귀지), 즉 특정 목적에 맞춘 작은 언어입니다. StateScript의 목적은 범용 프로그래밍이 아니라 게임 AI 상태와 전이를 표현하는 것입니다.

## 3-2. 전체 지도

```text
enemy_ai.ss 문자열
  ▼
Lexer: 글자를 Token 목록으로 변환
  ▼
Parser: 문법에 맞춰 Token을 AST로 변환
  ▼
MachineDefinition: 상태와 전이 규칙을 가진 설계도
  │ CreateInstance() 여러 번
  ▼
StateMachineInstance: 각 AI의 현재 상태와 변수
  │ Tick(deltaTime, host)
  ▼
Interpreter: AST 표현식 평가, 문장 실행
  ↔ HostEnvironment: 게임 쪽 함수와 객체 연결
```

이 순서가 StateScript 면접 답변의 뼈대입니다.

## 3-3. Lexer(렉서)

Lexer는 다음 문자열을 의미 있는 최소 단위로 자릅니다.

```statescript
VAR alertRadius = 10
```

대략 다음 Token이 됩니다.

```text
Var("VAR")
Identifier("alertRadius")
Equal("=")
Number(10.0)
NewLine
```

Token에는 종류, 원문, 실제 값, 줄, 열이 있습니다. 줄과 열은 오류가 난 정확한 위치를 알려주기 위해 필요합니다. 키워드는 대소문자를 무시하지만 일반 식별자는 구분합니다.

## 3-4. Parser(파서)와 AST(에이에스티)

Parser는 Token의 순서가 문법에 맞는지 확인하고 구조화된 AST를 만듭니다.

```statescript
1 + 2 * 3 == 7
```

핵심 AST 모양:

```text
EqualEqual
├─ Plus
│  ├─ 1
│  └─ Star
│     ├─ 2
│     └─ 3
└─ 7
```

곱셈이 덧셈보다 아래쪽에 묶여 먼저 계산됩니다. 재귀 하강 Parser에서는 우선순위를 함수 계층으로 표현합니다.

```text
OR
 → AND
   → ==, !=
     → <, <=, >, >=
       → +, -
         → *, /
           → 단항 NOT, -
             → 리터럴, 변수, 함수 호출, 괄호
```

AST 노드는 크게 두 종류입니다.

- 표현식 `Expr`: 값을 계산함 — 리터럴, 변수, 멤버, 단항, 이항, 함수 호출
- 문장 `Stmt`: 동작을 수행함 — `SET`, `IF`, 호스트 함수 호출

Parser는 문법 분석이 끝난 뒤 의미적으로 잘못된 머신도 미리 거부합니다.

- INITIAL 상태가 정확히 하나가 아님
- 같은 상태명이 중복됨
- 존재하지 않는 상태로 전이함
- 같은 상태 안에 동일 이벤트 블록이 중복됨

이것을 실행 전에 검사하면 게임 도중 늦게 실패하는 대신 스크립트 로딩 시 빠르게 오류를 발견할 수 있습니다.

## 3-5. Definition과 Instance

`MachineDefinition`은 파싱 결과인 설계도입니다. `StateMachineInstance`는 실제로 변하는 실행 상태입니다.

```text
MachineDefinition EnemyAI
  ├─ enemy1 Instance: CurrentState=Chase, hp=30
  ├─ enemy2 Instance: CurrentState=Idle, hp=20
  └─ enemy3 Instance: CurrentState=Dead, hp=0
```

정의를 공유하고 실행 상태를 분리하므로 스크립트를 매번 다시 파싱하지 않으면서 여러 AI를 독립적으로 실행할 수 있습니다. 각 Instance 생성 시 새 `StateMachineContext`, 새 변수 Dictionary, 새 `StateScriptObject self`가 만들어집니다.

## 3-6. Interpreter(인터프리터)

Interpreter에는 두 핵심 작업이 있습니다.

- `Evaluate(Expr)`: 표현식을 계산해 값 반환
- `Execute(Stmt)`: 문장을 실행해 상태 변경 또는 함수 호출

예:

```statescript
SET self.attackCooldown = self.attackCooldown - deltaTime
```

실행 과정:

1. 우변의 `self.attackCooldown` 값을 읽습니다.
2. 현재 Tick의 `deltaTime`을 읽습니다.
3. 둘이 Number인지 검사하고 뺍니다.
4. 결과를 `self.attackCooldown`에 다시 씁니다.

`AND`와 `OR`는 단락 평가(short-circuit evaluation, 쇼트 서킷 이밸류에이션)를 합니다. `true OR touch()`라면 왼쪽만으로 결과가 정해지므로 `touch()`를 호출하지 않습니다. 이는 성능뿐 아니라 함수 호출의 부수 효과나 오류를 피한다는 점에서도 중요합니다.

런타임 타입 규칙:

- Number는 `double`
- `+`에서 하나라도 String이면 문자열 연결
- `-`, `*`, `/`, 크기 비교는 Number만 허용
- 0으로 나누면 `StateScriptException`
- 조건식은 Boolean이어야 함
- 없는 변수, 멤버, 호스트 함수도 언어 오류로 처리

## 3-7. 한 Tick의 정확한 실행 순서

첫 Tick에서만 현재 상태의 `ON ENTER`가 먼저 실행됩니다. 그 다음 순서는 다음과 같습니다.

```text
첫 Tick이면 현재 상태 ON ENTER
  ↓
Tick 시작 시점 상태의 ON TICK
  ↓
그 상태의 전이 조건을 선언 순서대로 평가
  ↓ 첫 번째 true 발견
기존 상태 ON EXIT
  ↓
CurrentState 변경
  ↓
새 상태 ON ENTER
  ↓
StateChanged 이벤트
  ↓
Tick 종료 — 새 상태 ON TICK은 다음 Tick까지 기다림
```

전이는 한 Tick에 최대 한 번입니다. 처음 참인 전이 뒤에 `break`가 있기 때문입니다. 선언 순서가 곧 우선순위이므로 더 중요한 조건을 먼저 배치해야 합니다.

새 상태의 Tick을 즉시 실행하지 않으면 한 프레임에 연쇄 전이가 발생하거나 무한 전이하는 일을 막고, 프레임당 실행 비용과 동작을 예측하기 쉬워집니다.

## 3-8. HostEnvironment(호스트 인바이런먼트)

StateScript 언어는 Unity나 Unreal 같은 특정 엔진을 직접 알지 못합니다. 호스트 애플리케이션이 필요한 객체와 함수를 등록합니다.

```csharp
host.SetGlobal("player", player);
host.RegisterFunction("distance", args => CalculateDistance(args));
host.RegisterFunction("MOVE_TOWARD", args => MoveToward(args));
```

스크립트의 `distance(self, player)`나 `MOVE_TOWARD self player 1.5`가 실행되면 Interpreter가 인자를 평가한 뒤 HostEnvironment에 이름으로 호출을 요청합니다.

면접용 한 문장:

> DSL은 상태와 판단을 표현하고, 실제 이동이나 공격 같은 엔진 기능은 HostEnvironment를 통해 주입해 언어 코어가 특정 게임 엔진에 종속되지 않도록 했습니다.

호스트 함수에서 일반 예외가 발생하면 줄 번호가 포함된 `StateScriptException`으로 감쌉니다. 사용자에게 언어 실행 오류로 통일해 보여줄 수 있지만, 현재 메시지만 보면 원래 stack trace가 충분히 드러나지 않을 수 있어 inner exception 보존이나 별도 로깅을 개선할 수 있습니다.

## 3-9. enum(이넘)/switch(스위치), StateScript, Behavior Tree(비헤이비어 트리) 비교

| 방식 | 장점 | 단점 | 적합한 경우 |
|---|---|---|---|
| enum + switch | 단순하고 빠르며 디버깅 쉬움 | 상태가 늘면 코드가 복잡하고 변경 시 재빌드 | 작고 고정된 AI |
| StateScript FSM | 텍스트로 변경, 실행 모델 단순, 상태 전이가 명확 | 계층·병렬 행동·복잡한 의사결정에 약함 | 상태 중심의 중간 규모 AI, 학습용 DSL |
| Behavior Tree | 복합 행동 조합과 재사용에 강함 | 구조와 실행 추적이 더 복잡 | 큰 규모의 게임 AI |

현재 StateScript가 Behavior Tree를 완전히 대체한다고 말하면 안 됩니다. 핵심 FSM 실행 모델을 직접 구현하고 엔진 연동 가능성을 보여주는 프로젝트라고 설명하는 편이 정확합니다.

## 3-10. StateScript에서 반드시 직접 해볼 것

- [ ] Demo를 실행하고 Idle → Chase → Attack → Dead 로그를 본다.
- [ ] `enemy_ai.ss`의 `alertRadius`를 바꿔 상태 전이 시점이 달라지는지 본다.
- [ ] 문법의 `END` 하나를 지워 줄 번호 오류를 직접 확인한 뒤 원복한다.
- [ ] 없는 상태로 전이하게 바꿔 로딩 단계 오류를 확인한 뒤 원복한다.
- [ ] 전이 두 개를 모두 `WHEN true`로 만들고 첫 번째 전이만 실행되는지 본다.
- [ ] `StateMachineRuntimeTests`에 `deltaTime` 음수 예외 테스트를 직접 추가한다.
- [ ] Lexer → Parser → `StateMachineInstance.Tick()` 순서로 중단점을 찍는다.
- [ ] AST 하나를 디버거에서 펼쳐 연산자 트리를 직접 확인한다.

---

# 4. 최소 합격선: 이 12개만 자기 말로 답하기

처음부터 예상 질문 78개를 전부 공부하지 마세요. 다음 질문부터 답할 수 있게 만드세요.

## HealthRecApi

1. 프로젝트의 목적과 사용자 흐름은?
2. Controller → Service → DbContext 요청 흐름은?
3. 회원가입과 로그인에서 BCrypt와 JWT는 각각 무엇을 하는가?
4. 401과 403의 차이, 다른 사용자의 데이터는 어떻게 막는가?
5. Entity와 DTO는 왜 분리했는가?
6. 추천 엔진은 어떻게 동작하고 현재 한계는 무엇인가?

## StateScript

7. Lexer → Parser → AST → Interpreter는 각각 무엇인가?
8. MachineDefinition과 Instance는 왜 분리했는가?
9. 한 Tick의 실행 순서는?
10. 여러 전이가 참이면 무엇을 선택하는가?
11. HostEnvironment는 왜 필요한가?
12. enum/switch와 Behavior Tree에 비해 어떤 장단점이 있는가?

각 답변을 다음 네 문장 틀로 연습하세요.

```text
1. 결론: 이것은 무엇이다.
2. 구현: 이 프로젝트에서는 이렇게 동작한다.
3. 이유: 이렇게 나눈/선택한 이유는 이것이다.
4. 한계: 현재 한계와 개선 방향은 이것이다.
```

---

# 5. 3일 압축 학습 순서

## 1일 차 — 실행 흐름

- HealthRecApi를 직접 실행해 회원가입부터 추천 조회까지 수행
- `Program.cs` → Controller → Service → DbContext 순서로 읽기
- StateScript Demo 실행
- `MachineLoader` → Lexer → Parser → Instance → Interpreter 순서로 읽기

완료 기준: 두 프로젝트의 전체 흐름을 그림 없이 1분씩 설명할 수 있음

## 2일 차 — 디버깅과 테스트

- HealthRecApi 요청에 중단점을 걸어 userId와 Entity 확인
- StateScript Tick에 중단점을 걸어 CurrentState 변화 확인
- 프로젝트별 테스트 하나를 직접 추가
- 일부 값을 임시 변경해 테스트 실패를 확인하고 원복

완료 기준: “테스트가 무엇을 보장하나요?”에 구체적인 사례로 답할 수 있음

## 3일 차 — 면접 답변

- 위 최소 12개 질문을 직접 작성
- 각 답변을 30초와 1분 버전으로 말해 녹음
- 모르는 꼬리 질문에는 추측하지 않고 현재 구조와 개선 방향으로 답하는 연습

완료 기준: 소스 파일을 보지 않고 핵심 12개를 설명할 수 있음

---

# 6. 막혔을 때 사용할 정직한 답변

세부 구현이 기억나지 않을 때:

> 정확한 메서드명은 지금 기억나지 않지만, 전체 흐름은 Controller에서 사용자 ID를 얻고 Service가 소유권을 확인한 뒤 EF Core로 조회하는 구조입니다. 세부 API는 확인 후 정확히 말씀드리겠습니다.

설계 이유를 당시 직접 결정하지 않았을 때:

> 초기 구현에서는 도구의 제안을 활용한 부분입니다. 이후 코드를 검토하면서 이 분리가 테스트와 책임 분리에 유리하다는 점을 확인했습니다. 제가 다시 선택한다면 현재 규모에서는 유지하되, 실제 교체 가능성이 낮은 인터페이스까지 필요한지는 검토하겠습니다.

모르는 심화 질문을 받았을 때:

> 그 부분은 현재 구현 범위 밖이라 정확히 답하기 어렵습니다. 다만 지금 구조에서 확장한다면 우선 ○○ 문제를 확인하고, △△ 방식으로 검증해 보겠습니다.

이 답변들은 회피용이 아닙니다. **아는 범위, 모르는 범위, 확인 방법을 분명하게 말하는 방식**입니다.

---

# 7. 학습 기록

매번 공부한 뒤 한 줄이라도 기록하세요.

| 날짜 | 읽은 파일/실행한 기능 | 새로 이해한 것 | 아직 모르는 것 | 다음 행동 |
|---|---|---|---|---|
| | | | | |

## 최종 체크

- [ ] 프로젝트 두 개를 각각 30초와 1분 버전으로 소개할 수 있다.
- [ ] 핵심 흐름을 종이에 직접 그릴 수 있다.
- [ ] 최소 12개 질문에 코드와 일치하는 답을 할 수 있다.
- [ ] 테스트를 각각 하나 이상 직접 추가했다.
- [ ] 작은 코드 변경을 직접 하고 결과를 검증했다.
- [ ] AI 도움을 받은 범위와 내가 검증한 범위를 정직하게 구분할 수 있다.
