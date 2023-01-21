# Node.js와 mongoDB를 사용한 서버 구축 프로젝트

## 학습한 내용

- Koa를 사용한 서버 구축
- MongoDB에 데이터 저장하기
- 추후 front 페이지와 연결하여 회원가입 기능을 구현할 예정

## 코드 리뷰

src/main.js
  - koa, mongoose를 import해줬음
  - 데이터베이스 연결에 성공하면 메시지 출력

src/createFakeData.js
  - 데이터가 잘 들어가는지 확인하기 위해 작성
  - 연결이 해제된 상태이기에 사용하려면 main.js의 주석을 해제해야함

src/models/post.js
  - 스키마와 모델에 관련된 코드를 작성
  - 모델을 만들 때는 mongoose.model 함수를 사용

src/api/index.js
  - api 라우터 - 코드가 길어지는 것을 방지하기 위해 분리하여 작성

src/api/posts/index.js
  - REST API요청(POST,GET,DELETE,PATCH 등) 코드를 작성

src/api/posts/post.ctrl.js
  - 데이터 조회, 삭제, 수정, 검증, 조회 등의 기능이 구현되게 작성

mongoDB Compass를 활용하여 데이터를 조회 
  - postman을 활용하여 데이터를 수정, 삭제, 추가, 조회 작업을 진행
