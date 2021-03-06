# [소프트웨어 공학]리팩터링 2장
## 2.1 리팩터링의 정의
### 리팩터링의 정의
- 리팩터링: 소프트웨어의 **겉보기 동작**은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법을 적용해서 소프트웨어를 재구성하다.

코드 베이스를 정리하거나 코드를 바꾸는 모든 작업을 `재구성(restructuring)`이라는 포괄적인 용어로 표현. 리팩터링은 재구성 중 특수한 한 형태.

`겉보기 동작(observable behavior)`을 그대로 유지해야한다는 것은 리팩터링하기 전과 후의 코드가 똑같이 동작해야 한다는 뜻이다.

그렇다고 완전히 똑같은건 아니다. 세세한 부분에서는 달라지지만 사용자 관점의 최종 결과는 똑같아야 한다.

리팩터링 과정에서 발견된 버그는 리팩터링 후에도 그대로 남아있어야 한다. (단, 아무도 발견하지 못한 숨은 버그는 수정해도 괜찮다).

### 리팩터링 vs 성능 최적화
| |리팩터링|성능 최적화|
|-----|-----|-----|
|코드 형태|변경|변경|
|기능|유지|유지|
|목표|코드 이해 및 수정 쉽게, 성능은 나빠져도 됨|코드 성능을 좋게, 코드 이해는 어려워도 됨|
성능 최적화를 하다 보면 코드 이해가 어려워 질 수 있다!

### 코멘트
리팩터링 과정에서 버그도 건들지 않는다는게 흥미롭다. 발견해서 보류중인 버그를 수정하는 것은 코드에 큰 영향을 주기 때문에 보류하는 걸까?

## 2.2 두 개의 모자
### 두 개의 모자
소프트웨어 개발 시 목적이 `기능 추가`냐 `리팩터링`이냐를 명확히 구분해 작업하는 편이다.

### 기능 추가
기능을 추가할 때는 기존 코드를 절대 건드리지 않고 새 기능을 추가하기만 한다. 작업 진행 정도는 테스트를 추가해서 통과하는지 확인하는 방식으로만 확인한다.

### 리팩터링
리팩터링 시에는 기능 추가는 절대 하지 않고 오로지 코드 재구성에만 전념한다.

### 코멘트
유도리 있게 작업해야겠지만 저 사이클에 맞게 작업하려면 소프트웨어 설계가 정말 중요할 것 같다. 배우면 배울수록 설계가 중요한 것 같음.

## 2.3 리팩터링하는 이유
### 리팩터링하면 소프트웨어 설계가 좋아진다.
소프트웨어의 내부 설계(아키텍처)를 충분히 이해하지 못한 채 코드를 짜, 코드 구조가 무너져 설계를 유지하기 힘들다. 코드량이 줄어든다고 시스템이 빨라지는 것은 아니나 수정하는데 드는 노력이 줄어든다. 중복 코드를 제거해 모든 코드가 고유한 일을 수행하게 해 수정이 용이하게 하자!

### 리팩터링하면 소프트웨어를 이해하기 쉬워진다.
코드를 잘 동작시키는데에 집중해 짜면 다른 사람이 이해하기 힘들다. 리팩터링은 코드가 쉽게 읽히게 해준다. 다른 사람을 위해서 뿐만이 아닌 나 자신을 위해서 코드를 명확하게 만들어야한다.

### 리팩터링하면 버그를 쉽게 찾을 수 있다.
리팩터링하면 코드가 하는 일을 깊게 파악하게 되면서 구조가 명확해 진다. '이럴 것이다' 가정하던 점들이 분명히 드러나 버그들을 지나칠 수 없게 만든다.

### 리팩터링하면 프로그래밍 속도를 높일 수 있다.
지금까지의 장점을 요약하면, 리팩터링하면 코드 개발 속도를 높일 수 있다. 내부 설계와 가독성 개선, 버그 적어짐은 모두 품질을 향상시켜준다. 리팩터링하는데 걸리는 시간은 걱정할 필요가 없다. 프로그램이 커질 수록 동작을 한눈에 파악하기 힘들어진다. 모듈화와 테스트가 결합된다면 매 수정마다 견고함을 유지하며, 이해하기 쉬워진다. 이를 지구력이 높아진다고 표현했다.

설계를 완벽하게 할 필요가 없다. 리팩터링을 하며 기존 코드의 설계를 계속 개선 가능하다. 프로그램의 요구 사항이 바뀌어도 리팩터링을 통해 대응 가능하다. 그러므로 빠른 개발이 가능하다.

### 코멘트
마지막 줄이 앞의 내용과 모순되는거 아닌가?
> 리팩터링을 하며 기존 코드의 설계를 계속 개선 가능하다.

TDD의 장점과 비슷한 내용이 많다.

## 2.4 언제 리팩터링해야 할까?
### 3의 법칙
하나의 가이드.
1. 처음에는 그냥 한다.
2. 비슷한 일을 두 번째로 하게 되면(중복이 생겼다는 사실에 당황스럽겠지만), 일단 계속 진행한다.
3. 비슷한 일을 세 번째 하게 되면 리팩터링 한다.

### 준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기
리팩터링하기 좋은 시점은 코드베이스에 기능을 새로 추가하기 직전이다. 구조를 살짝 바꾸면 다른 작업을 하기가 훨씬 쉬워질 부분을 찾는다. 

### 이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기 
코드를 수정하려면 먼저 그 코드가 하는 일을 파악해야 한다. 코드를 파악할 때마다 그 코드의 의도가 더 명확하게 드러나도록 리팩터링할 여지를 찾아보자. 찾은 부분을 리팩터링하고 테스트해 내 생각을 확인한다.

### 쓰레기 줍기 리팩터링
코드를 파악하던 중 비효율 적인 코드를 찾았는데 원래 하려던 작업과 거리가 먼 경우가 있다. 간단히 수정할 수 있는건 즉시 고치고, 시간이 좀 걸리는건 메모를 남기자. 

당장 고치기 어렵더라도 조금이나마 개선하자. `캠핑 규칙`이 제안하듯, 항상 처음 왔을때보다 더 깔끔하게 정리하고 떠나자. 언젠가는 결국 문제가 해결될 것이다. 리팩터링의 멋진 점은 조금씩 변경하더라도 코드가 깨지지 않게 해준다는 것이다.

### 계획된 리팩터링과 수시로 하는 리팩터링 
앞의 세 경우는 모두 기회가 있을 때마다 진행한다. 즉 리팩터링 시간을 따로 일정에 잡아둘 필요 없이 다른 일(버그 수정, 코드 읽기 등)을 진행 중에 처리한다.

- 보기 싫은 코드를 발견하면 리팩터링하자. 그런데 잘 작성된 코드 역시 수많은 리팩터링을 거쳐야 한다.

리팩터링은 과거에 저지른 실수를 바로잡거나 보기 싫은 코드를 정리하는 작업이 아니다. 보기 싫은 코드만이 아니라 잘 작성된 코드 역시 리팩터링 해야한다. 나만의 적절한 타협 기준을 잡고 진행하자.

- 무언가 수정하려 할 때는 먼저 수정하기 쉽게 정돈하고(단, 만만치 않을 수 있다) 그런 다음 쉽게 수정하자.

소프트웨어 개발은 뭔가 '추가'하는 과정으로 여겨진다. 기능을 추가하기 위해 새로운 코드를 작성해 넣는 것 보다는 기존 코드를 '수정'하는 것이 가장 빠른 방법이다. 그러니 따로 시간을 내서 새 기능을 추가하기 좋게 코드를 개선하자. 리팩터링 작업의 대부분은 드러나지 않게, 기회가 될 때마다 해야 한다.

앞에서 언급한 것처럼 리팩터링 커밋과 기능 추가 커밋을 꼭 분리할 필요가 없다. 두 과정이 밀접하게 엮인 경우가 많아 꼭 그럴 필요가 없다. 또한 리팩터링 커밋만을 보면 맥락 정보가 없어 왜 그렇게 수정했는지 이해하기 힘들다. 그러므로 적절한 방식을 찾아라.

### 오래 걸리는 리팩터링
리팩터링은 빠르게 끝내야 한다. 만약 대규모 리팩터링을 해야 한다면 팀원 전체가 리팩터링을 하기 보다는 조금씩 해나가는게 좋다. 예를 들어 라이브러리를 교체한다면 기존 것과 새 것 모두를 포용하는 추상 인터페이스 부터 마련(어댑터 패턴?)한다. 기존 코드가 이 추상 인터페이스를 호출하도록 하고 라이브러리를 교체한다. (이 전략을 추상화로 갈아타기 Branch By Abstraction 이라 한다.)

### 코드 리뷰에 리팩터링 활용하기
서로 코드를 읽고 그럭저럭 이해한 후, 몇 가지 개선 사항을 제시한다. 리팩터링을 해 쉽게 구현할 수 있다면 실제로 리팩터링하자. 이 과정을 반복한다면 내 아이디어를 적용한 모습을 더 명확히 볼 수 있다.

### 리팩터링하지 말아야 할때
지저분한 코드여도 굳이 수정할 필요가 없다면 수정하지 않는다. 외부 api 다루듯 호출해서 쓰는 코드라면 그냥 둔다. **내부 동작에 대한 이해가 필요한 시점**에 리팩터링해야 효과가 좋다.

리팩터링하는 것보다 처음부터 새로 작성하는 게 쉬울 때도 리팩터링하지 않는다. 이를 결정하기 위해서는 경험과 판단력이 필요하다.

### 코멘트
리팩터링을 해야할 시기를 말해주는데, 여러가지 경우에 진행하면 될듯. 큰 수정이 아니라면 리팩터링 커밋을 굳이 분리할 필요는 없을 듯 하다.

## 2.5 리팩터링 시 고려할 문제

### 새 기능 개발 속도 저하
- 리팩터링의 궁극적인 목표는 개발 속도를 높여서, 더 적은 노력으로 더 많은 가치를 창출하는 것이다.

리팩터링을 `클린코드`나 `바람직한 엔지니어링 습관`처럼 도덕적인 이유(단어가 느낌이 잘 안오네)로 정당화해서는 안된다. 리팩터링은 오로지 경제적인 이유로 하는 것이다. 개발 기간을 단축하려고 리팩터링을 한다.

### 코드 소유권 및 브랜치
코드 소유권을 작은 단위로 나눠 엄격히 관리하는데 반대한다. 각자 맡은 영역이 있다면 그 영역의 변경 사항을 관리해야하지 다른 사람이 수정하기 못하게 막으라는 것은 아니다.

흔히 이를 위해 버전 관리 시스템(git)을 사용해 팀원마다 브랜치 하나를 맡아 작업하다가, 결과물이 어느정도 쌓이면 메인 브랜치에 통합해 다른 팀원과 공유하는 것이다. 

그러나 이런 기능별 브랜치 방식에도 단점이 있는데, 독립 브랜치로 작업한 시간이 길어질수록 작업 결과를 마스터로 통합하기 힘들다. 그래서 기능별 브랜치의 통합 주기를 2~3일 단위로 짧게 관리해야 한다고 주장하는 사람이 많다. 이 방식을 `지속적 통합(CI)`, 또는 `트렁크 기반 개발(TBD)`라고 한다. 

CI에 따르면 모든 팀원이 최소 하루에 한 번은 마스터와 통합한다. 이렇게 하면 다른 브랜치들과 차이가 크게 벌어지는 브랜치가 없어져서 머지의 복잡도를 상당히 낮출 수 있다. CI를 적용하기 위해서는
- 마스터를 건강하게 유지하고
- 거대한 기능을 짧게 쪼개는 법을 배우고
- 각 기능을 끌 수 있는 기능 토글을 적용해 완료되지 않은 기능이 시스템 전체를 망치지 않게 해야 한다.

CI는 리팩터링과 궁합이 좋다. 이 둘을 합쳐서 `익스트림 프로그래밍(XP)`라고 한다. CI를 적용하지 못해도 통합 주기는 짧게 가지자.

### 테스팅
리팩터링의 두드러진 특성은 프로그램의 겉보기 동작은 똑같이 유지된다는 것이다. 실수하더라도 단계별 변경 폭이 적기에 코드 범위가 좁다. 원인을 못찾아도 버전 관리 시스템을 이용해 되돌리면 된다.

여기서 핵심은 오류를 빨리 잡는데에 있다. 이를 위해서는 `테스트 스위트(test suite)`가 필요하다. 즉 리팩터링 하기 위해서는 (대부분 - 자동 제외인듯) `자가 테스트 코드(self-testing code)`를 마련해야 한다. 테스트 코드는 리팩터링과 기능 추가를 안전하게 해준다. 실수로 만든 버그를 빠르게 찾아 제거 가능하게 해주기 때문이다. 테스트가 실패한다면 가장 최근에 통과한 버전에서 무엇이 달라졌는지 살펴볼 수 있다.

자가 테스트는 CI와 밀접하게 연관된다. CI에 통합된 테스트는 XP의 권장사항이자 `지속적 배포(CD)`의 핵심이기도 하다.

### 레거시 코드
물려받은 `레거시 코드(legacy code)`는 대체로 복잡하고 테스트도 제대로 갖춰지지 않았으며, 다른 사람이 작성한 것이다. 우선은 테스트 보강을 하자. 그러나 테스트를 보강하더라도 쉽지 않다. 부분 부분 잘 접근하자.

### 데이터 베이스
`진화형 데이터 베이스 설계(evolutionary database design)`와 `데이터 베이스 리팩터링` 기법을 널리 사용해 데이터 베이스도 리팩터링 가능하다.

### 코멘트
배운 것들이 잘 어우러져야 하네. 

## 2.6 리팩터링, 아키텍처, 애그니(YAGNI)
리팩터링은 소프트웨어 아키텍처를 바라보는 관점을 완전히 바꿔놓았다. 이전에는 코딩 전에 설계와 아키텍처를 일정 이상 거의 완료해야 한다 했었다. 이제는 리팩터링 덕에 변화에 유연하게 대응 가능한 코드베이스를 만들거나 기존 코드의 설계를 개선 가능하다. 코딩 전에 아키텍처를 확정한다면 소프트웨어 요구사항을 사전에 모두 파악해야 한다. 그러나 실제 진행해보면 실현 불가능한 목표일 때가 많다. 

이를 해결하기 위핸 한가지 방법으로 `유연성 메커니즘(flexibility mechanism)`이 있다. 예상 시나리오에 대응하기 위해 매개변수들을 추가해 해결하는 것이다. 이는 변화에 대응하는 능력이 오히려 떨어질 수 있다.

리팩터링을 사용한다면 다르게 접근 가능하다. 현재까지 파악한 요구사항만을 만족하는 소프트웨어를 구축한다. 진행하면서 요구 사항이 늘어나면 아키텍처도 그에 맞춰 리팩터링해서 바꾸자. 소프트웨어의 복잡도에 영향을 안주는 매커니즘은 마음껏 추가하지만 복잡도를 높일 수 있는 유연성 매커니즘은 반드시 검증을 거친 후에 추가하자. 리팩터링을 미루면 훨씬 힘들어진다는 확신이 들 때만 유연성 메커니즘을 미리 추가하자.

### 애그니(YAGNI)
이런 식으로 설계하는 방식을 `간결한 설계(simple design)`, `점진적 설계(incremental design)`, `YAGNI(you aren't going to need it = 필요 없을 거다)` 등으로 부른다. 애그니를 받아들인다고 해서 선제적인 아키텍처에 완전히 소훌해도 된다는 뜻은 아니다. 문제를 나중에 더 깊이 이해하게 되면 처리하는 쪽이 낫다고 생각한다. 이러한 경향은 `진화형 아키텍처(evolutionary architecture)` 원칙이 발전하는 계기가 됐다고 한다. 

### 코멘트 
아키텍처의 정의 https://linsaeng.tistory.com/35
선제적인 아키텍처가 뭘까? 개발 전에 먼저 아키텍처를 고려한다는 뜻인가?
계속 계획만 세우기보다는 일단 아는 것부터 푼다? 이런 느낌이네

## 2.7 리팩터링과 소프트웨어 개발 프로세스
리팩터링이 퍼지기 시작한건 익스트림 프로그래밍(XP)에 적용됐기 때문이다. XP의 두드러진 특징은
- 지속적 통합
- 자가 테스트 코드
- 리팩터링 등
개성이 강하면서 상호 의존하는 기법들을 하나로 묶은 프로세스라는 점이다. 참고로 자가 테스트 코드와 리팩터링을 묶어서 `테스트 주도 개발(TDD)`라고 한다.

### 팀
팀으로 개발하면서 리팩터링을 하려면 각 팀원이 다른 사람의 작업을 방해하지 않으면서 언제든지 리팩터링할 수 있어야 한다. 
- 자가 테스트 코드
- 지속적 통합
- 리팩터링
이라는 세 기법은 서로 강력한 상승 효과를 발휘한다. 팀원간의 작업이 원할해진다. 이 세 실천법을 적용하면 앞 절에서 설명한 YAGNI 설계 방식으로 개발을 진행할 수 있다. 리팩터링과 YAGNI는 긍정적 영향을 서로 준다.

### 코멘트
XP는 그냥 지나가는 기법인줄 알았는데 중요한 것 같다. 난 왜 처음 들어볼까............. 
내가 좋아하는 TDD 드디어 나왔다. TDD가 리팩터링의 상위 개념인줄은 몰랐다.
애자일 소프트웨어 방법론에 대해서 검색해보자
https://atoz-develop.tistory.com/entry/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EA%B0%9C%EB%B0%9C-%EB%B0%A9%EB%B2%95%EB%A1%A0-%EC%95%A0%EC%9E%90%EC%9D%BCAgile-%EB%B0%A9%EB%B2%95%EB%A1%A0

## 2.8 리팩터링과 성능
성능을 무시하는 이유는 설계의 순수성을 우선시하거나 조만간 더 빠른 하드웨어가 나오리라 믿기 때문이 아니다. *(커신이네 내가 추측한 이유가 이건데 ㄷㄷ)* 리팩터링하면 성능이 느려질 수 도 있는건 사실이다. 하지만 그와 동시에 성능을 튜닝하기 더 쉬워진다. `하드 리얼타임(hard real-time)` *(쇼핑몰이나 은행인가?)* 을 제외한 소프트웨어를 빠르게 만드는 비결은, 먼저 튜닝하기 쉽게 만들고 나서 원하는 속도가 나게끔 튜닝하는 것이다.

### 빠른 소프트웨어 작성하기
빠른 소프트웨어를 작성하는 방법은 세가지이다.

가장 엄격한 방식은 `시간 예산 분배(time budgeting)` 방식으로, 하드 리얼타임 시스템에서 많이 사용한다. 엄격한 시간 엄수를 강조하는 방식으로 자세한 설명은 생략.

두 번째 방법은 끊임없이 관심을 기울이는 것이다. 높은 성능을 유지하기 위해 무슨 짓이든 하는 것이다. 실제 효과는 별로다. 성능을 개선하기 위해 코드를 수정하다보면 프로그램은 다루기 어려워지고 결국 개발이 더뎌진다. 이 개선은 프로그램의 특정 동작에만 관련될 뿐, 정작 컴파일러와 런타임과 하드웨어의 동작을 제대로 이해하지 못한 채 작성할 때도 많다. *(하드웨어 동작을 고려하며 코드를 짜면 이쁜 내장 함수들을 못쓰는데 어차피 새로 만든 함수 내부를 보진 않을거니까 ㄱㅊ은건가)*

성능 개선을 위한 세번째 방법은 **'코드 전체를 고르게 최적화한다면 90% 시간은 낭비'**라는 통계에서 착안한 것이다. 의도적으로 성능 최적화에 돌입 전에는 코드를 다루게 쉽게 만드는 것에만 집중한다. 그러다 성능 최적화 단계가 되면 다음의 구체적인 절차를 따라 프로그램을 튜닝한다.

### 구체적인 절차
먼저 프로파일러로 프로그램을 분석하여 시간과 공간을 많이 잡아먹는 지점을 알아낸다. 그러면 성능에 큰 영향을 주는 부분들을 찾을 수 있다. 그런 다음에 전체를 고르게 최적화할 때와 마찬가지 방법으로 그 부분들을 개선한다. 이렇게하면 성능에 큰 영향을 주는 부분만 집중해서 최적화 하기에 적은 노력으로도 큰 효과를 볼 수 있다.

물론 이때도 신중하게 작업해야 한다. 리팩터링할 떄처럼 최적화를 위한 수정도 작은 단계로 나눠서 진행한다. 매 단계마다 컴파일과 테스트를 진행한다. 이후 프로파일러를 실행한다. 성능이 개선되지 않았다면 되돌린다. 이를 반복해 성능을 향상시킨다.

### 리팩토링과는 무슨 상관?
리팩토링을 잘 해놓은 다면
1. 성능 튜닝에 투입할 시간을 벌 수 있다. 리팩터링이 잘 되어 있다면 기능 추가가 빨리 끝나서 성능에 집중할 시간을 더 벌 수 있다. *(그냥 개발이 빨라서 개선할 시간이 많은거 아님? ㅋㅋ)*
2. 리팩터링이 잘 되어 있다면 성능을 더 세밀하게 분석할 수 있다. 프로파일러가 지적하는 코드의 범위가 더 좁아질 것으로 튜닝하기 쉬워진다.

### 코멘트
하드리얼타임 = 실시간컴퓨팅 중 하나 https://ko.wikipedia.org/wiki/%EC%8B%A4%EC%8B%9C%EA%B0%84_%EC%BB%B4%ED%93%A8%ED%8C%85


## 2.9 리팩터링의 유래
역사 스킾~

## 2.10 리팩터링 자동화 
요새는 자동 리팩터링을 지원하는 도구가 많다. 

리팩터링을 자동화하는 가장 어설픈 방법은 소스 코드의 텍스트를 직접 조작하는 것이다. 가령 '찾아바꾸기'로 이름을 변경하는 식이다.

자동 리팩터링을 제대로 구현하려면 코드를 텍스트 상태가 아닌 `구문 트리(syntax tree)`로 해석해서 다뤄야 한다. *(구문 트리는 또 뭐야!!!)* 구문 트리를 조작하는 방식이 코드의 원래 의미를 보존하는 데 훨씬 유리하다. 

뭐 대충 최근에는 좋다 이런 내용

### 코멘트
구문 트리 https://ko.wikipedia.org/wiki/%EC%B6%94%EC%83%81_%EA%B5%AC%EB%AC%B8_%ED%8A%B8%EB%A6%AC
자동 리팩터링이 어느정도인지 보고싶은데 어떤 키워드로 검색해야할지 모르겠다.

## 2.11 더 알고 싶다면
권하는 책들이 오래되서 별로 안읽고 싶다.

## 코멘트
한 호흡에 이걸 다쓰니까 힘들다.
이 책을 보면 볼수록 알아야 하는게 많아지는 기분 ㅠㅠ. 
