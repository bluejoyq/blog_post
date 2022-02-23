# 모바일 페이지 실종 사건

## 발단
저번에 이어서 잠깐 크롤링을 해보고 있었다. 그런데, 잘 작동하던 코드가 화면 크기를 줄이니 작동을 하지 않았다. 에러가 나는 부분은 아래였다.

- 문제의 코드
``` python
def get_posts_links(driver):
    driver.find_element(By.XPATH,'//button[text()="새 글 작성"]/../div').click()
    driver.find_element(By.XPATH,'//div[text()="내 벨로그"]').click()
    return [elem.get_attribute('href') 
        for elem in driver.find_elements(By.XPATH,'//a/h2/..')]
```

직감적으로 `implicitly_wait`를 추가하면 해결될 것 같았지만 그래도 원인을 찾아보고 싶었다.

내가 추측한 원인은 '해당 사이트는 모바일뷰의 로딩이 빠르게하기 위해 `pre-render`한다. 이후 데이터를 불러오기 때문에 로딩 시간 없이 크롤링하게 되면 데이터가 아직 차지 않았기 때문에 종료된다.'였다.

## 해결
해결은 웹오브젝트를 찾기 전에 `WebDriverWait`를 사용해서 렌더링 될때까지 대기하는 방법을 선택했다.

```python
def get_posts_links(driver):
    driver.find_element(By.XPATH,'//button[text()="새 글 작성"]/../div').click()
    WebDriverWait(driver, LOADING_WAIT_TIME).until(
        EC.presence_of_element_located(
            (By.XPATH, '//div[text()="내 벨로그"]')
        )
    )
    driver.find_element(By.XPATH,'//div[text()="내 벨로그"]').click()
    WebDriverWait(driver, LOADING_WAIT_TIME).until(
        EC.presence_of_element_located(
            (By.XPATH, '//a/h2/..')
        )
    )
    return [elem.get_attribute('href') 
        for elem in driver.find_elements(By.XPATH,'//a/h2/..')]
```
하지만 문제의 원인이 더 궁금했기에 더 파보기로 했다.


## 검증
크롬 performance 개발자 도구를 사용해서 직접 확인해봤다. PC뷰에서는 잘 작동했기에 그 차이만 확인해보기로 했다.


### PC 뷰에서
![로그인 실패](/finished/18/18-1.png)


### 모바일 뷰에서
![로그인 실패](/finished/18/18-2.png)

### 확인
놀랍게도 원인은 모바일 뷰에서는 아예 페이지가 렌더링되지 않는 구간이 존재했기 때문이다(용어가 적절한지 모르겠다.).

몇번을 더 테스트해보니 모바일 뷰가 렌더링 되고 나서 사라지는 구간도 존재했다.

원인이 뭔지 궁금해서 찾아봤지만 모르겠다.

나의 머리를 열심히 굴려서 생각해낸 가설은 다음과 같다.

1. PC뷰에서는 