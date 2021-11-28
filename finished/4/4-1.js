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
