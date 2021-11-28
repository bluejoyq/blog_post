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