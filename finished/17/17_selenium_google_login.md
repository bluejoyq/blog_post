# selenium으로 구글 로그인하기
## 쓰게된 이유
갑자기 생각난 프로그램을 하나 만들어 보느라 인생 처음으로 selenium을 써보게 됐다.
실전압축으로 사용법만을 대강 배워서 써보는데 구글 로그인 과정에서 문제가 생겼다.

내 프로그램은 (현재로써는) 로그인 과정을 사용자에게 맡기는데, 그 과정에서 구글 연동 로그인을 위해 구글 로그인을 시도하면 

![login실패](17-1.png)

이란 오류가 뜨게 된다.

구글 자체에서 소프트웨어 자동화로 통제되는 브라우저에서의 로그인을 차단하는 것이다.

나는 구글 로그인이 필요했기에 우회해보기로 했다.

## 검색의 연속
### 해결 방법 1. 디버거 모드 사용
https://velog.io/@binsu/selenium-%ED%99%9C%EC%9A%A9-%EA%B0%84-%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%B8%94%EB%A1%9D-%EC%9A%B0%ED%9A%8C%ED%95%98%EA%B8%B0
위 글을 참고하는 글인데. 너무 길어서 패스!

### 해결 방법 2. 크롬 옵션 추가
https://stackoverflow.com/questions/60117232/selenium-google-login-block
작동하지 않는다.

### 해결 방법 3. firefox 사용
https://stackoverflow.com/questions/60117232/selenium-google-login-block
마찬가지로 저 글에서 발견 geckodriver를 사용하는 방법인데 막혔다고 한다..

## 진짜 간단한 해결 방법
많은 방법들이 막혀서 슬퍼하고 있었는데 한가지 라이브러리를 발견했다.

### undetected-chromedriver
라이브러리 이름도 무려 `undetected-chromedriver`

https://github.com/ultrafunkamsterdam/undetected-chromedriver

사용법도 엄청 간단하다

```python
import undetected_chromedriver as uc

# main에서 실행하지 않으면 오류가 남
# https://github.com/ultrafunkamsterdam/undetected-chromedriver/issues/486#issuecomment-1032009193 참조
if  __name__  ==  "__main__" :
    driver = uc.Chrome()
    driver.get('https://velog.io')

    # 당신의 코드를 아래에 적으세요.
```

이렇게만 사용하면 구글 로그인이 된다.
