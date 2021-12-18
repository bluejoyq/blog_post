# [React Redux] redux의 state와 Modal(2)
[1편](https://velog.io/@bluejoyq/React-Redux-redux%EC%9D%98-state%EC%99%80-Modal1)
## 해결방법 1
이 글을 참조한 코드이다.
- https://velog.io/@altmshfkgudtjr/Redux%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Modal-%EA%B5%AC%ED%98%84 
- https://hub.packtpub.com/creating-reusable-generic-modals-react-and-redux/


`modals`라는 폴더를 만들어 모든 `modal content`들을 넣어두고 `modal.js`에서 해당 폴더 전체를 `import`해 오브젝트 형식으로 가지고 있다가 주어진 이름과 일치하는 `content`만 보여주는 것이다.

components/modals/index.js
```jsx
export {default as search} from './search';
// 여러가지 추가 가능
```
components/modal.js
```jsx
import React from 'react';
import {connect} from 'react-redux';
import {drop} from '../store/reducers/modal';
import {useEffect} from 'react';
// modals의 content들을 modals로 import
import * as modals from './modals';
import styles from './modal.module.css'
const Modal = ({isVisible, content, drop}) => {
	const checkEsc = (e) => {
		if (e.code == 'Escape')
			drop();
	}
	// content와 일치하는 modal content를 찾는다.
	const Content = modals[content];
	useEffect(()=>{
		if(isVisible)
		{
			window.addEventListener('keydown', checkEsc);

		}
		else
			window.removeEventListener('keydown',checkEsc);
		return ()=>{window.removeEventListener('keydown',checkEsc)};
	}, [isVisible])
	


	return (
		<>
		{isVisible &&
		<div className={styles.modalContainer}>
			<div className={styles.closeBar}>
				<button onClick={drop}>XXXX</button>
			</div>
			<Content drop ={drop} />
		</div>}
		</>
	);
}

const mapStateToProps = (state) => ({
	isVisible: state.modal.isVisible,
	content: state.modal.content
});

const mapDispatchToProps = (dispatch) => ({
	drop: () => dispatch(drop()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
```

## 해결 방법 2 
- https://curk-develop.tistory.com/13
참고한 글

`react portal`은 말 그대로 외부 DOM노드 어디에나 원하는 자식을 렌더링한다.
[자세한 설명](https://reactjs-kr.firebaseapp.com/docs/portals.html)

portal을 만들기 위해 `App.js`를 아래와 같이 바꿔주었다. `portal`을 만들기 위해 id가 portal인 `div`를 추가해주었다.
App.js
```jsx
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {show} from './store/reducers/modal';
import Modal from './components/modal';
import OpenModalWithPortal  from './components/openModalWithPortal';
const App = ({isVisible, show}) => {
  

  return (
    <>
      <button onClick={()=>{show('search');}}>Redux로 검색창 열기</button>
      <div id='modal'></div>
      
      <Modal/>
      <OpenModalWithPortal/>
    </>
  )
}
const mapStateToProps = (state) => ({
	isVisible: state.modal.isVisible
});

const mapDispatchToProps = (dispatch) => ({
	show: (content) => dispatch(show({content})),
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
```

그리고 `OpenModalWithPortal`이라는 테스트용 모달 컴포넌트를 제작해줬다. 이제 앱 어디서나 이 `ModalView`를 import해서 사용한다면 간편하게 modal을 만들 수 있다.

components/openModalWithPortal.js
```jsx
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {useEffect} from 'react';
import styles from './modal.module.css'
import Search from './modals/search';
const ModalView = ({children, open, drop}) => {
	const checkEsc = (e) => {
		if (e.code == 'Escape')
			drop();
	}
	const el = document.getElementById('modal');
	// 렌더링 안됐을 경우 오류 막기 위해
	// https://velog.io/@yukyung/React-Portal-Target-container-is-not-a-DOM-element-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
	if (!el) return null;


	useEffect(()=>{
		
		if(open)
		{
			window.addEventListener('keydown', checkEsc);
		}
		else
			window.removeEventListener('keydown',checkEsc);
		return ()=>{window.removeEventListener('keydown',checkEsc)};
	}, [open])

	
	return ReactDOM.createPortal(
		<div className={styles.modalContainer}>
			<div className={styles.closeBar}>
				<button onClick={drop}>XXXX</button>
			</div>
			{children}
		</div>, el);
}


const CustomComponents = () => {
	const [open, setOpen] = useState(false);
	const toggleOpen = ()=> {
		setOpen(!open);
	}
	return (
		<>
		<button onClick={toggleOpen}>Portal로 검색창 열기</button>
		{open && <ModalView open={open} drop={toggleOpen} children={<Search drop={toggleOpen}/>}/>}
		
		</>
	)
}

export default CustomComponents;
```


## 전체 코드
[전체 코드](https://github.com/bluejoyq/react-test)
