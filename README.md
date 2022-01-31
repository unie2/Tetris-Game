## 테트리스 게임

### 실행 화면

| 게임 실행 | 1줄 매칭 시 | 게임 종료 |
|:--------|:--------:|:--------:|
| ![실행](https://user-images.githubusercontent.com/54324782/151757820-a3f997b9-d8a5-4d8c-beec-09f0510ef9d3.png) | ![매칭](https://user-images.githubusercontent.com/54324782/151757883-bf6f529a-b37f-48b3-8844-7b038cc31f9b.png) | ![종료](https://user-images.githubusercontent.com/54324782/151757954-65f4c9a5-02e9-4bee-8b35-a5c9bcd18828.png)
| | 점수 1점 증가  |


### 시스템 주요 기능

- 블록 모양 정의

| square | bar | tree |
|:--------|:--------:|:--------:|
| ![square](https://user-images.githubusercontent.com/54324782/151759222-3c0ead68-3ed4-4ce1-b97d-366dcc0f852d.png) | ![bar](https://user-images.githubusercontent.com/54324782/151759354-e9e126c7-3f1a-404a-befb-3f08863d818d.png) | ![tree](https://user-images.githubusercontent.com/54324782/151759278-b09a978d-b63d-46f1-b4bd-66d8e59e696a.png)


| zee | elLeft | elRight |
|:--------|:--------:|:--------:|
| ![zee](https://user-images.githubusercontent.com/54324782/151759483-ae944df6-46ab-4af6-b757-2903707f7980.png) | ![elLeft](https://user-images.githubusercontent.com/54324782/151759323-13537953-bf2d-4be3-93fe-70bdd192e8c6.png) | ![elRight](https://user-images.githubusercontent.com/54324782/151759437-25806882-11d8-41b6-bfa1-2cfc67d8ca3a.png)


  
- 라인 생성
  > 20행 10열 라인 생성  
  > li, ul 태그 생성   
- 블록 생성
  > 6개의 모양 중 랜덤으로 하나씩 가져오기  
- 한줄이 모두 채워졌는지 확인
  > 클래스명이 "seized"가 아닌 "moving"이라면 matched 값 false로 변환  
  > 최종적으로 matched값이 true일 경우 한줄이 모두 채워졌으므로 해당 라인 삭제  
  > 삭제 후 위쪽에 새로운 빈칸 라인 생성  
  > score 1점 증가 후 화면에 표시  
- 방향키를 통한 위치 변경
  > KeyCode 39 (오른쪽 방향키) : 좌표를 기준으로 오른쪽으로 이동  
  > KeyCode 37 (왼쪽 방향키) : 좌표를 기준으로 왼쪽으로 이동  
  > KeyCode 40 (아래쪽 방향키) : 좌표를 기준으로 아래쪽으로 이동  
  > KeyCode 90 ('z' 키) : 현재 도형의 방향 변경  
  > KeyCode 32 (스페이스 바) : 현재 도형을 빠르게 하단으로 떨어뜨리기
