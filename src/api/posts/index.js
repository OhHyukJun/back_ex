//http://loaclhost:4000/api/posts 경로로 접근할 수 있음

import Router from 'koa-router';
//const postsCtrl = require('./posts.ctrl');
import * as postsCtrl from './posts.ctrl';

const posts = new Router();


posts.get('/',postsCtrl.list);
posts.post('/',postsCtrl.write);

const post = new Router(); 

posts.get('/:id',postsCtrl.read);
posts.delete('/:id',postsCtrl.remove);
//posts.put('/:id',postsCtrl.replace);
posts.patch('/:id',postsCtrl.update);

posts.use('/:id',postsCtrl.checkObjectedId, post.routes());

export default posts; //api 라우트에 posts를 연결