# [flutter] Riverpod state 갱신은 되지만 watch 못하는 문제
## 문제
riverpod이라는 상태 관리 라이브러리를 요즘 사용하고 있다.
이 라이브러리가 참 좋긴한데, devtool이 지원이 안되서 로깅으로만 값을 확인해야한다는 큰 단점이 있다.
잘 사용하던 와중 큰 문제가 생겼다.
### 문제 코드
```dart
class RegisterType {
  int height;
  int weight;
  bool sex;
  int curPage;

  RegisterType(
      {this.height = 165, this.weight = 60, this.sex = true, this.curPage = 0});
}
class RegisterNotifier extends StateNotifier<RegisterType> {
  RegisterNotifier() : super(RegisterType());

  void updateHeight(int value) {
    state.height = height;
  }

  void updateWeight(int value) {
    state.weight = value;
  }

  void updateSex(bool value) {
    state.sex = value;
  }

  void nextPage() {
    state.curPage = (state.curPage + 1) % 2;
    debugPrint(state.curPage.toString());
  }

  void lastPage() {
    state.curPage = (state.curPage - 1) % 2;
    debugPrint(state.curPage.toString());
  }
}

final registerProvider =
    StateNotifierProvider<RegisterNotifier, RegisterType>((ref) {
  RegisterNotifier notifier = RegisterNotifier();
  return notifier;
});
```
나는 class로 state를 만들어서 사용중이였는데, 분명 state는 변경되지만 `ref.watch`를 통해 구독한 위젯에서 상태 변화를 감지를 하지 못했다....
문서가 매우 부족해서 한참을 고민했다. 
그런데 실수한 부분은 매우 단순했다...... 알아차리고 나서 이걸 몇시간 고민한 내 자신이 너무 원망스러웠다 흑흑.

## 해결
```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class RegisterType {
  int height;
  int weight;
  bool sex;
  int curPage;

  RegisterType(
      {this.height = 165, this.weight = 60, this.sex = true, this.curPage = 0});
}

class RegisterNotifier extends StateNotifier<RegisterType> {
  RegisterNotifier() : super(RegisterType());

  void updateHeight(int value) {
    state = RegisterType(
        height: value,
        weight: state.weight,
        sex: state.sex,
        curPage: state.curPage);
  }

  void updateWeight(int value) {
    state = RegisterType(
        height: state.height,
        weight: value,
        sex: state.sex,
        curPage: state.curPage);
  }

  void updateSex(bool value) {
    state = RegisterType(
        height: state.height,
        weight: state.weight,
        sex: value,
        curPage: state.curPage);
  }

  void nextPage() {
    state = RegisterType(
        height: state.height,
        weight: state.weight,
        sex: state.sex,
        curPage: (state.curPage + 1) % 2);
  }

  void lastPage() {
    state = RegisterType(
        height: state.height,
        weight: state.weight,
        sex: state.sex,
        curPage: (state.curPage - 1) % 2);
  }
}

final registerProvider =
    StateNotifierProvider<RegisterNotifier, RegisterType>((ref) {
  RegisterNotifier notifier = RegisterNotifier();
  return notifier;
});
```
state는 항상 이전의 상태를 기반으로 새로운 상태값을 생성해서 반환해야한다는 점!!
나는 바보다..

## 여담
`ConsumerStatefulWidget`은 생성자를 이용한 parameter?를 줄 수가 없는 것 같다. 왜지??????