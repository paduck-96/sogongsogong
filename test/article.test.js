const request = require("supertest") 
const {sequelize} = require("../models/index");
const app = require("../init");

// 테스트 전 DB 생성
beforeAll(async () => {
    await sequelize.sync()
})

describe("/article CRUD 테스트", () => {
    const agent = request.agent(app);
    beforeEach((done) => {
        agent
          .post('/login')
          .send({
            email: 'test@naver.com',
            password: 'tT123!@#',
          })
          .end(done);
      });
    test.skip("/GET 게시글 쓰기", done => {
        agent
        .get("/article")
        .expect(200, done)
    })
    test.skip("/POST 게시글 쓰기", done => {
        agent
        .post("/article")
        .send({
            articleTitle:"테스트 글5",
            articleContent:"테스트 글5를 작성 중입니다. 성공적으로 작성되길 바라겠습니다. I hope it will be success",
            categoryName:"sport"
        })
        .expect(201, done)
    })
    test.skip("/GET 게시글 상세보기", done => {
        const param = 5;
        agent
        .get(`/article/${param}`)
        .expect(200, done);
    })
    test.skip("/GET 게시글 상세보기 - 없음", done => {
        const param = 999;
        agent
        .get(`/article/${param}`)
        .expect(204, done);
    })
    test("/POST 게시글 수정", done => {
        const param = 5;
        agent
        .post(`/article/${param}`)
        .send({
            articleTitle:"테스트 수정2",
            articleContent:"테스트 글 수정2",
            categoryName:"sport"
        })
        .expect(201, done);
    })
    test.skip("/DELETE 게시글 삭제", done => {
        const param = 3;
        agent
        .delete(`/article/${param}`)
        .expect(200,done)
    })
    test.skip("/DELETE 게시글 삭제 - 없음", done => {
        const param = 998;
        agent
        .delete(`/article/${param}`)
        .expect(400,done)
    })
})

// 테스트 후 DB 초기화
afterAll(async () => {
    await sequelize.sync({})
})
