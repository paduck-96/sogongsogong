/**
 * 라우터 테스트 코드
 * 1) 유저 라우터
 */
//supertest 모듈 객체 가져오기
const request = require("supertest") 
const {sequelize} = require("../models/index");
const app = require("../init");

// 테스트 전 DB 생성
beforeAll(async () => {
    await sequelize.sync()
})

// 회원가입 페이지 가져오기
describe("GET /register", () => {
    test("회원가입 페이지", done => {
        request(app)
        .get("/register")
        .expect(200, done);
    })
})
// 회원가입 과정
describe("POST /register" , () => {
    const agent = request.agent(app);
    test("회원가입", done=>{
        agent
        .post("/register")
        .send({
            "email":"test@naver.com",
            "nickname":"테스트",
            "password":"test123",
            "confirmPassword":"test123"
        })
        .expect(201, done)
    });
    test("회원가입 - 비밀번호 확인 오류", done => {
        agent.post("/register")
        .send({
            "email":"test@naver.com",
            "nickname":"테스트",
            "password":"test123",
            "confirmPassword":"test123456"
        }).expect(400, done);
    })
test("회원가입 - 중복 체크", done=>{
        const message = decodeURIComponent("이미 가입된 회원");
        agent.post("/register")
        .send({
            "email":"test@naver.com",
            "nickname":"테스트",
            "password":"test123",
            "confirmPassword":"test123"
        })
        .expect(409, done)
    })
})

// 로그인 페이지 가져오기
describe("GET /login", ()=> {
    test("로그인 페이지", done => {
        request(app)
        .get("/login")
        .expect(200, done);
    })
})
// 로그인 과정
describe("POST /login", ()=>{
    const agent = request.agent(app);
    test("로그인",  done => {
    agent.post("/login")
    .send({"email":"test@naver.com", "password":"test123"})
    .expect(200,done);

})
test("로그인 - 이미 로그인한 상태", done => {
  agent.post("/login")
  .send({
      email: 'test@naver.com',
      password: 'test123',
    })
    .expect(302, done)
})

test("로그인 - 비밀번호 오류", done => {
    request(app).post("/login")
    .send({"email":"test@naver.com", "password":"test123456"})
    .expect(404, done);
})
})

// 로그아웃
describe("GET /logout", () => {
    const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post('/auth/login')
      .send({
        email: 'test@naver.com',
        password: 'test123',
      })
      .end(done);
  });
    test("로그아웃", done => {
        agent.get("/logout")
        .end((err,res)=>{
            if(err)done(err)
            else done();
        })
    })
    test("로그아웃 - 로그인 되어 있지 않을 경우", done => {
        request(app)
        .get("/logout")
        .expect({result: 'Fail', message: '로그인 필요'})
        .end((err, res) => {
            if(err){done(err);}
        else done()})
    })
})

describe("GET /login/auth", () => {
    
    test("권한 미확인", done => {
        request(app).get("/login/auth").expect(403,done)
    })
    const agent = request.agent(app);
    beforeEach((done) => {
        agent
          .post('/login')
          .send({"email":"test@naver.com", "password":"test123"})
          .set("authorization", "exhdheh2")
          .end(done);
      });
      test("권한 확인", done => {
        agent.get("/login/auth").expect("",done);
      })
})


// 테스트 후 DB 초기화
afterAll(async () => {
    await sequelize.sync({force:true})
})