## 인트로
자바스크립트에서는 함수 선언 방법이 다양하다. 그 중 함수 선언과 화살표 함수의 차이에 대해 명확히 알아야 할 것 같아서 정리해보았다.

## 함수 선언
`function`을 이용해서 선언한 함수는 어떻게 그 함수가 호출되는지에 따라 자신의 `this` 값을 정의했다. 
- 전역에서 호출된 함수는 `this`가 전역 객체를 나타낸다.
- `new` 연산자를 사용해 호출하는 생성자 함수는 빈 객체를 만들어 `this`에 할당한다. [new 연산자](https://ko.javascript.info/constructor-new)
- strict 모드에서는 바인딩 하지 않으면 `undefined`. [엄격 모드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)
- 함수가 객체 메소드로 호출되었다면 해당 객체를 나타낸다. 
- 등등

**예시**
``` js
function test() {
	return this;
}

let obj = {
	a : 1,
	fnc : test
}

function strict_test() {
	"use strict";
	return this;
}
// 전역 호출
console.log(test());

// 생성자 호출
console.log(new test());

// 객체 메서드 호출
console.log(obj.fnc());

// 엄격 모드 호출
console.log(strict_test());
```
**출력**
``` 
Window... // window 객체
test {}
{a: 1, fnc: ƒ}
undefined
```
`this`를 명시적으로 정하기 위해서는 `bind`를 사용했다. 

## 화살표 함수
함수를 보다 간편하게 선언하고 바인딩 되지 않은 `this`의 문제를 해결하기 위해 화살표 함수가 도입됐다. 특히 콜백 함수를 편하게 사용할 수 있다. [콜백 this 문제](https://ko.javascript.info/bind) 

### 차이점 1. arguments
우선 함수 선언하면 암시적으로 넘어오던 `arguments` 변수가 없어졌다. 대신 `...args`와 같은 [나머지 매개변수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters)로 가변항 함수는 사용이 가능하다.

**예시**
```js
function test(a,b,c,d){return arguments;}
const arrow_test = (...anyNames) => {
	return anyNames;
}

console.log(test(1,2,3,4));
console.log(arrow_test(1,2,3,4));
```
**출력**
```
1,2,3,4를 가지는 arguments 객체(유사 array임)
1,2,3,4를 가지는 array
```

### 차이점 2. this
화살표 함수에서의 `this`는 항상 화살표 함수를 둘러싸는 정적 범위(lexical scope)의 this가 사용된다. 

**예시**
``` js
// obj_func은 객체 메서드로써 this에 obj를 바인딩한다. 
// 안의 익명 화살표 함수는 상위 this를 사용한다.
const obj = {
	obj_func : function(){
		return (() => {console.log(this)})();
	}
}

// test 함수에 빈 객체를 this에 바인딩 해주었다.
function test() {
	console.log(this);
  let f = () =>console.log(this) ;
  f();
}
let bind_test = test.bind({});

obj.obj_func();
bind_test();
// 전역에서 호출시에는 전역 객체의 this가 사용된다.
(() => console.log(this))();
```
**출력**
```
{func: ƒ}
{}
{}
Window... // 윈도우 객체
```
### 차이점 나머지
메모용으로 가져왔다. [원문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- this나 super에 대한 바인딩이 없고, methods 로 사용될 수 없습니다.
- new.target키워드가 없습니다.
- 일반적으로 스코프를 지정할 때 사용하는 call, apply, bind methods를 이용할 수 없습니다.
- 생성자(Constructor)로 사용할 수 없습니다.
- yield를 화살표 함수 내부에서 사용할 수 없습니다.

## 흥미로운 점
Node JS에서는 전역 객체가 global로 바뀌는 것 말고는 거의 비슷하지만 전역에서의 화살표 함수와 일반 함수의 this가 다르다. 

전역에서의 일반 함수는 global 객체를 바인딩하지만 화살표 함수에서는 exports 객체를 할당한다. 

**예시**
```node js
function a_func () {
	return this;
}
const b_func = () => {
	return this;
}

let a = a_func();
let b = b_func();
console.log(a);
console.log(b);
console.log(b === module.exports, b === exports);
```
**출력**
```
global... // global 객체
{}
true true
```

왜 이런 차이가 나는지는 이유를 찾지 못했다. 노드가 모듈 기반이기에 화살표 함수의 this가 exports 객체인듯...

## 참고글
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions
- https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/
- https://poiemaweb.com/es6-arrow-function
- https://ko.javascript.info/bind