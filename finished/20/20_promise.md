# [JS] Promise에 대하여
## 비동기와 callback
### 비동기
자바스크립트는 비동기 처리가 가능하다. 그 말은 먼저 실행된 코드가 끝나기 전에 다음 코드가 실행될 수 있음을 말한다.
그렇다면 아래 코드를 보자.
```js
const firstAsyncWork = () => {
  setTimeout(()=> {
    console.log("First Work!");
  }, 1000);
};

const secondWork = () => {
  console.log("Second Work!");
};


firstAsyncWork();
secondWork();
```
자바스크립트를 공부해본 사람들은 위 코드의 결과를 쉽게 예측할 수 있을 것이다.
```
Second Work!
First Work!
```
`setTimeout`이 비동기적으로 처리된다. `setTimeout`을 실행하고 1초를 기다리는 것이 아니라 아래 `secondWork` 함수를 실행한다.
왜 이렇게 만들었는지에 대해서는 오늘의 주제가 아니므로 아래의 두가지 글을 참조하자!
https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop
https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop

### callback
이를 순서대로 동작시키기 위해 callback을 이용해 두 함수가 순차적으로 실행되게 한다.
콜백에 대해서는 https://ko.javascript.info/callbacks 참조!


```js
const firstAsyncWork = (callback) => {
  setTimeout(()=> {
    console.log("First Work!");
    callback();
  }, 1000);
};

const secondWork = () => {
  console.log("Second Work!");
};

firstAsyncWork(secondWork);
```
이런식으로 작성하면 순서대로 실행이 가능하다.
```
First Work!
Second Work!
```
### 성공과 실패
만약 비동기 작업의 성공과 실패에 따라 다른 작업을 진행해야한다면 이런식으로 코드를 작성해야 한다.
```js
const asyncWork = (sucessCallback, failureCallback) => {
  doSomeWorkCanFail((res, err)=>{
    if(res){
      sucessCallback(res)
    }
    else {
      failureCallback(err)
    }
  })
};
```

### callback의 문제점
콜백은 중첩될 경우 코드를 알아보기가 매우 힘들어진다는 단점이 있다.

[코드 출처](https://ko.javascript.info/callbacks)
```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // 모든 스크립트가 로딩된 후, 실행 흐름이 이어집니다. (*)
          }
        });

      }
    })
  }
});
```
이를 해결하기 위해 새로운 방식이 탄생하는데 바로 promise이다.

## Promise
### 소개
Promise는 class로 생성자 함수를 이용해 사용한다. 아래와 같은 형태를 가진다.
```js
let promise = new Promise((resolve, reject) => {
  // 비동기 작업
});
```
사용자는 주석으로 적힌 저 부분에서 비동기 작업을 진행하는 코드를 작성해주면 된다.   

첫 예제를 Promise를 사용해서 적는다면 다음과 같다.
```js
const firstAsyncWork = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      console.log("First Work!");
      resolve();
    }, 1000);
  });
  
};

const secondWork = () => {
  console.log("Second Work!");
};

firstAsyncWork()
  .then(secondWork);
```
비동기 작업을 진행 후 성공과 실패 여부에 따라 각각 `resolve`와 `reject`를 호출하고 그 결과를 파라미터로 넣어주면 된다.
두번째 예시를 Promise를 이용해 적으면 다음과 같다.
```js
const asyncWork = () => {
  return new Promise((resolve, reject) => {
    doSomeWorkCanFail((res,err)=> {
      if(res){
        resolve(res);
      }
      else{
        reject(err);
      }
    });
  });
};

asyncWork()
  .then(sucessCallback)
  .catch(failureCallback)
```

### Promise의 상태
Promise의 상태는 항상 3가지 중 하나이다.
- Pending : 초기 상태이며, resolve나 reject 호출에 따라 다른 상태로 전환될 수 있다.
- Fulfilled : 더 이상 다른 상태로 전환될 수 없으며, 변경되지 않는 값이 있어야 한다. (결과)
- Rejected : 더 이상 다른 상태로 전환될 수 없으며, 변하지 않는 이유가 있어야 한다. (에러 사유)
 
아래 그림을 보면 이해가 될 것이다. [출처](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise) (참고로 아래 그림은 promise가 중첩되고 있다.)
![](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

### finally
`finally`를 사용하면 `resolve`나 `reject`와 상관없이 무조건 실행되게 할 수 있다.
```js
const asyncWork = () => {
  return new Promise((resolve, reject) => {
    doSomeWorkCanFail((res,err)=> {
      if(res){
        resolve(res);
      }
      else{
        reject(err);
      }
    });
  });
};

asyncWork()
  .then(sucessCallback)
  .catch(failureCallback)
  .finally(cleanUpWork)
```
여기서 `cleanUpWork` 함수는 실패 여부와 상관없이 실행된다.
## 참조
https://promisesaplus.com/
https://ko.javascript.info/callbacks
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises