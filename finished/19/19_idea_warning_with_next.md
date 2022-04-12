# [Next JS, IntelliJ IDEA] Link 사용 시 Cannot resolve 경고 발생
## 발생 상황
커밋을 하려는데 아래 코드에서 경고가 발생했다. 아무리 봐도 문제가 없는 코드인데 
`Cannot resolve directory ~`와 `Cannot resolve file ~` 경고가 `posts`를 못찾는다고 생겼다.
```jsx
<Link href="/posts/first-post">
  this page!
</Link>
```
## 발생 이유
> Implemented: additional references for Next.js projects, providing a resolution to js files in Link, form & other tags, relatively to "pages" directory. Since now we have proper references "unused" warning was gone. Renaming, moving files and code completion are also supported.

인텔리제이 자체의 오류이다. 최신 버전으로 업데이트 후 캐쉬를 지우면 해결!
## 참조 링크
https://youtrack.jetbrains.com/issue/WEB-48593