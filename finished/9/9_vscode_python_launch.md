# [Python VSCode] 구성된 디버그 유형 'python'이(가) 설치되었지만 이 환경에서 지원되지 않습니다.

## 오류 발생 상황
Visual Studio Code를 사용해서 Python 개발을 하려고 구성 추가를 누른 후 launch.json에 파이썬 현재 파일 설정을 추가했다.

아무런 수정 없이 기본 설정이다.

``` json
{
	// IntelliSense를 사용하여 가능한 특성에 대해 알아보세요.
	// 기존 특성에 대한 설명을 보려면 가리킵니다.
	// 자세한 내용을 보려면 https://go.microsoft.com/fwlink/?linkid=830387을(를) 방문하세요.
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Python: Current File",
			"type": "python",
			"request": "launch",
			"program": "${file}",
			"console": "integratedTerminal"
		}
	]
}
```

그런데 자꾸 `"type": "python",`에서 오류가 있다면서 
>구성된 디버그 유형 'python'이(가) 설치되었지만 이 환경에서 지원되지 않습니다.

이란 메세지를 띄웠다.

평소에는 잘됐었는데, 왜 이런지 몰라 오류 메세지를 그대로 긁어 검색해봤지만 나오지 않았다.

## 해결 과정
이런 경우 대부분 오류 메세지를 영어로 바꿔서 검색하면 결과가 나온다.

`Ctrl + Shift + P`를 눌러 나오는 커맨드 창에 `표시 언어 구성 `을 검색해 `en`으로 바꿔주면 재실행 되면서 언어가 영어로 변한다.

> Configured debug type 'python' is installed but not supported in this environment.

이걸 검색하니 바로 해결 방법이 나왔다.

https://github.com/microsoft/vscode-python/issues/17952
>vs code의 버그로 최신 버전에서는 수정될 예정이라고 한다. 

**이 오류가 떠도 실행에는 문제가 없으니 걱정하지 말자.**

## 배운 점
에러가 발생해서 검색해도 결과가 뜨지 않는다면 영어로 검색해보자!!