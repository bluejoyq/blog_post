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