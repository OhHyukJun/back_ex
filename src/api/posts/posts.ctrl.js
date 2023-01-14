import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const checkObjectedId = (ctx,next) => {
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return;
    }
    return next();
};

/*
    POST /api/posts
    {
        title: '제목',
        body: '내용',
        tags: ['태그1','태그2']
    }
*/
export const write = async ctx => {
    const schema = Joi.object().keys({
      // 객체가 다음 필드를 가지고 있음을 검증
      title: Joi.string().required(), // required() 가 있으면 필수 항목
      body: Joi.string().required(),
      tags: Joi.array()
        .items(Joi.string())
        .required(), // 문자열로 이루어진 배열
    });

    // 검증하고 나서 검증 실패인 경우 에러 처리
    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status=400;
        ctx.body = result.error;
        return;
    }

    const { title , body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
    });
    try {
        await post.save(); 
        //함수의 반호나 값은 Promise 이므로 async/await 문법으로 데이터베이스 저장을 완료할 때까지 await를 사용하여 대기할 수 있음 save 함수가 실행된 후까지 대기
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
}; //블로그 포스트를 작성하는 API인 write


export const list = async (ctx) => {
    //query는 문자열이기 때문에 숫자로 변환해 주어야 함
    //값이 주어지지 않는다면 1을 기본으로 사용함
    const page = parseInt(ctx.query.page || '1', 10);

    if(page <1){
        ctx.status=400;
        return;
    }
    try {
        const posts = await Post.find()
            .sort({_id:-1}) //-1로 설정하면 내림차순으로 정렬 +1로 설정하면 오름차순으로 정렬
            .limit(10) //개수를 제한하는 코드 10개로 제한
            .skip((page-1)*10) //1페이지 10개 2 페이지 10개 페이지 기능 구현
            .lean() //데이터를 JSON 형태로 조회
            .exec();
        const postCount = await Post.countDocuments().exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10)); //HTTP 헤더 설정
        ctx.body = posts
        //.map(post => post.toJSON()) find()를 통해 조회한 데이터는 mongoose 문서 인스턴스 형태이므로 JSON으로 변환해줘야함
        .map(post=> ({
            ...post,
            body:
                post.body.length < 200 ? post.body : `${post.body.slice(0,200)}...`, //200자 이상이면 뒤에 ...을 붙이고 문자열을 자른다
        }));
    } catch (e) {
        ctx.throw(500,e);
    }
}; //find() 함수를 호출한 후에는 exec()를 붙여 주어야 서버에 쿼리를 요청함

export const read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec(); //데이터를 조회할 때 사용하는 함수 findById
        if (!post) {
            ctx.status = 404; 
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(500,e);
    }
};
/*
    DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
    const {id} = ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e){
        ctx.params(500, e);
    }
};

export const update = async (ctx) => {
    const { id } = ctx.params;
    //write에서 사용한 schema와 비슷한데, required()가 없습니다.
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });
    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true, //이 값을 설정하면 업데이트된 데이터를 반환함
            //false일 때는 업데이트되기 전의 데이터를 반환함
        }).exec();
        if(!post){
            ctx.status=404;
            return;
        }
        ctx.body = post;
    } catch(e){
        ctx.throw(500,e);
    }
};
