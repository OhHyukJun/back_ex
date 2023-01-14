/*
    mongoose에는 스키마와 모델이라는 개념이 존재
    스키마는 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체
    모델은 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체    
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;
//제목 내용 태그 목록 작성 날짜 순으로 데이터를 설정
const PostSchema = new Schema({ //PostSchema= 스키마 객체
    title: String,
    body: String,
    tags: [String], // 문자열로 이루어진 배열
    publishedDate: { 
        type: Date,
        default: Date.now, // 현재 날짜를 기본값으로 지정
    },
});

const Post = mongoose.model('Post',PostSchema); //Post 스키마 이름
export default Post;
