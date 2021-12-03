# Next.js hot reload 반영이 안되는 문제
## 문제 발생 상황
next js를 이용해 Modal을 제작 중이였다. Modal 컴포넌트가 수정한 후 저장을 해도 reload는 일어나지만 수정 사항이 반영이 안되었다. 

정상적으로 불러와진 컴포넌트가 핫 리로드가 안되서 당황했다. 다른 컴포넌트나 페이지에서는 잘 작동하다가 특정 컴포넌트만 안되었다.

## 해결방법
모듈을 가져올 때 대소문자 실수를 하지 않았나 봐야한다. 나 같은 경우 
_app.js
```react
import Modal from '@components/Modal';
// do something
```
위의 코드에서 modal을 Modal로 가져와서 문제가 발생했다. 대소문자가 다를 경우 불러는 와지지만 hot reload 과정에서 갱신을 못하나 보다.

## 출처
https://stackoverflow.com/questions/61151505/nextjs-project-is-not-hot-reloading-in-macos
