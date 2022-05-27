# [React] Flux 패턴에 대해서: Redux와 Zustand

## Flux 패턴이란?

flux 패턴이 왜 탄생했는지에 대해서는 다른 분들이 잘 정리한 글을 참조하는 더 좋을 것 같아서 링크로 대체하겠습니다.
[페이스북 flux document](https://facebook.github.io/flux/docs/in-depth-overview/)
![flux](1.png)

## Redux의 등장

### Redux란?

[리덕스 공식 문서 - 기존 기술](https://ko.redux.js.org/understanding/history-and-design/prior-art)
Redux는 Flux 패턴의 중요한 특징들로부터 영감을 받아 제작된 라이브러리이다.

### Redux의 작동 과정

Redux가 작동하는 방식은 다음과 같다.
![redux data](2.gif)
[출처](https://ko.redux.js.org/tutorials/essentials/part-1-overview-concepts)

1. 사용자가 `UI`에서 이벤트를 `dispatch`한다면 `Redux store`에 사용자의 이벤트 정보를 저장하는 `Action`이 전달된다.
2. `store`는 이전의 상태로부터 상태를 업데이트하는 `reducer` 함수를 실행하고 새로운 `State`를 저장한다.
3. `store`가 현재 변경된 `State`를 구독하는 모든 `UI`들에게 스토어가 업데이트 됐음을 알린다.
4. 각 UI 구성 요소는 필요한 상태가 부분이 업데이트 됐는지 확인하고 새 데이터로 다시 렌더링한다.

### Redux와 Flux의 차이점

Flux와의 차이점은

1. Flux에는 디스패처가 존재해 모든 작업이 해당 디스패처를 통과해야 한다. 그러나 Redux는 디스패처가 존재하지 않으며 스토어에 디스패치 과정이 내장되어 있다.
2. Redux는 데이터의 상태를 바꾸지 않는다고 가정한다. 대신 항상 상태가 변경된 새로운 상태를 반환해서 업데이트한다.

### Redux의 단점

Redux는 전역 상태를 관리하기 위한 정말 좋은 솔루션이지만, 너무 많은 코드를 작성해야한다. 아주 간단한 예시를 적기 위해서라도 많은 코드를 적고, 또 그 코드를 이해하는 것은 너무 어렵다.

어플리케이션의 규모가 작은 경우에는 Redux 코드를 설계하고 작성하는 데에 대부분의 시간을 보낼 수도 있다.

아래 예시를 보자.

### 카운터 예시

정말 간단한 카운터 예제를 만들기 위해서도 이 정도의 코드를 적어야한다.
나머지 세팅은 또 덤이다.
그나마 훅과 `@reduxjs/toolkit`의 존재로 많이 줄어 들었다.
[코드 출처](https://ko.redux.js.org/tutorials/quick-start)

- /src/features/counter/counterSlice.js

```jsx
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

사용은 꽤나 간편해졌다. 예전에 비하면 선녀로 보일 정도.

- /src/App.js

```jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
```

## 그래서 소개하고자 하는 Zustand

그럼에도 Redux는 여전히 부담스럽다. 나는 단순히 전역적으로 토큰을 저장하고 싶을 뿐이였는데, 몇장이나 되는 문서를 읽어야 한다. 그런 당신을 위해 `zustand`가 존재한다.
`zustand`는 매우 간단하게 flux 패턴을 따르는 상태 관리 라이브러리이다.

### 코드부터 보자

스토어를 만드는 코드이다. 스토어를 여러개 만들수 도 있다.

- /src/counterStore.js

```jsx
import create from "zustand";

const useStore = create((set) => ({
  counterValue: 0,
  increment: () => set((state) => ({ counterValue: state.counterValue + 1 })),
  decrement: () => set((state) => ({ counterValue: state.counterValue - 1 })),
  setByValue: (value) => set(() => ({ counterValue: value })),
}));
export default useStore;
```

스토어를 사용하는 코드이다.

- /src/App.js

```jsx
import React from "react";
import useStore from "./counterStore";
export default function Counter() {
  const { counterValue, increment, decrement } = useStore();
  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={increment}>
          Increment
        </button>
        <span>{counterValue}</span>
        <button aria-label="Decrement value" onClick={decrement}>
          Decrement
        </button>
      </div>
    </div>
  );
}
```

이렇게 단순하게 전역 상태 관리가 가능하다.

### 내부적으로는?

내부적으로 어떻게 돌아가는지는
[Zustand 내부 코드 분석](https://ui.toast.com/weekly-pick/ko_20210812)
을 참조하자.
