const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
//API 기능으 구현하기 위해 사용하는 미들웨어 
//POST/PUT/PATCH 같은 메서드의 request body에 json 형식으로 데이터를 넣어주면 이를 파싱하여 서버에서 사용할 수 있게 해줌

const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api',api.routes()); //api 라우트 적용

app.use(bodyParser());//라우터 적용 전에 bodyParser 적용

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('listening to port 4000');
});