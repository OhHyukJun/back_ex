require('dotenv').config(); //이제 Node.js에서 환경변수는 process.env 값을 통해 조회할 수 있음
/*
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
*/
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
//API 기능으 구현하기 위해 사용하는 미들웨어 
//POST/PUT/PATCH 같은 메서드의 request body에 json 형식으로 데이터를 넣어주면 이를 파싱하여 서버에서 사용할 수 있게 해줌

//const api = require('./api');
import api from './api';
import createFakeData from './createFakeData';
//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose
.connect(MONGO_URI)
  .then(()=>{
    console.log('Connected to MongoDB');
    //createFakeData();
  })
  .catch(e=>{
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api',api.routes()); //api 라우트 적용 코드가 길어지지 않게 하려고 생성한 라우터

app.use(bodyParser());//라우터 적용 전에 bodyParser 적용

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log('listening to port %d',port);
});