/*
    REST API 
    클라이언트가 서버에 자신이 데이터를 조회,생성,삭제,업데이트 하겠다고 요청하면,
    서버는 필요한 로직에 따라 데이터베이스에 접근하여 작업을 처리
    HTTP 메서드
        GET 데이터를 조회할 때 사용 
        POST 데이터를 등록할 때 사용- 인증 작업을 수행랄 때도 사용
        DELETE 데이터 삭제
        PUT 데이터를 새 정보로 통째로 교체할 때 사용 
        PATCH 데이터의 특정 필드를 수정할 때 사용
    라우터를 여러 파일에 분리시켜서 작성하고, 이를 불러와 적용하는 방법을 학습할 것임
*/

//const Router = require('koa-router');
//const posts = require('./posts');
import Router from 'koa-router';
import posts from './posts';

const api = new Router();

api.use('/posts' , posts.routes());

//라우터를 내보냄
export default api;