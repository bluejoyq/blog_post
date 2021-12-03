# [알고리즘] 퀵 정렬(quick sort) vs 병합 정렬(merge sort)

## 계기
최근 면접을 봤는데, 이 주제와 관련된 질문을 대답을 못했다. 

확실히 정리하고 넘어가야지 다음에는 잘 대답할 것 같아서 정리해본다.

## 정렬 방법
### 퀵 정렬
1. 배열을 pivot의 값을 기준으로 값이 작은 배열과 큰 배열로 정렬한다.
2. 부분 배열의 크기가 충분히 작다면 그냥 정렬하고, 아니라면 재귀 호출을 통해 다시 이 과정을 반복한다.

- 매 정렬마다 pivot 하나는 위치가 정해짐이 보장되었으므로 끝남을 보장 가능. 
- pivot을 어떻게 정하냐에 따라 최적화 가능.

### 병합 정렬
1. 입력 배열을 2개의 부분 배열로 분할한다. 
2. 부분 배열의 크기가 충분히 작다면 그냥 정렬하고, 아니라면 재귀 호출을 통해 다시 이 과정을 반복한다.
3. 정렬된 부분 배열을 하나의 리스트로 병합한다.

## 차이점
- 퀵소트는 불안정 정렬, 병합 정렬은 안정 정렬이다.
- 퀵 정렬은 최악의 경우(오름차순 정렬이거나 내림차순 정렬일 경우) O(n^2)의 시간 복잡도를 가지지만 병합 정렬은 O(n log n)으로 동일하다. 
- 아래 cache의 지역성을 보면 퀵 정렬이 평균의 시간 복잡도에서는 빠를지도 모른다.
- 병합 정렬은 추가 메모리 공간을 필요로 한다.
## 공통점
- 둘다 분할 정복 알고리즘이다.
- 속도가 빠르다.

## cache의 Locality of reference와 정렬
- https://stackoverflow.com/questions/9444714/how-is-quicksort-is-related-to-cache
- https://medium.com/pocs/locality%EC%9D%98-%EA%B4%80%EC%A0%90%EC%97%90%EC%84%9C-quick-sort%EA%B0%80-merge-sort%EB%B3%B4%EB%8B%A4-%EB%B9%A0%EB%A5%B8-%EC%9D%B4%EC%9C%A0-824798181693

위 글들을 보면 퀵소트는 추가 메모리 공간 없이 처음 선언된 곳에서 배열이 정렬되기 때문에 cache의 지역성 때문에 속도가 빠르게 일어난다고 한다.

>궁금한점 : 현실의 데이터는 대부분 정렬된 경우가 많으니까 cache의 지역성 때문에 굳이 quick sort를 쓸 필요가 없는거 아닌가?

## 사용처
### 퀵 정렬
- 거의 정렬되지 않은 배열을 정렬할 때 : 정렬되면 안돼!!!
### 병합 정렬
- Linked List의 정렬 : 임의 접근이 적고 인접한 원소와 비교가 일어나기 때문에 적합.



## 참조
- https://gyoogle.dev/blog/algorithm/Quick%20Sort.html
- https://gmlwjd9405.github.io/2018/05/10/algorithm-quick-sort.html
- https://stackoverflow.com/questions/9444714/how-is-quicksort-is-related-to-cache
- https://medium.com/pocs/locality%EC%9D%98-%EA%B4%80%EC%A0%90%EC%97%90%EC%84%9C-quick-sort%EA%B0%80-merge-sort%EB%B3%B4%EB%8B%A4-%EB%B9%A0%EB%A5%B8-%EC%9D%B4%EC%9C%A0-824798181693
