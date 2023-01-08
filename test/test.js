/**
 * 미들웨어 사용 테스트 코드
 */
const { isLoggedIn, isNotLoggedIn } = require("../router/middleware");
describe('isLoggedIn', () => {
    const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    };
    const next = jest.fn();
    test('로그인 되어있으면 isLoggedIn이 next를 호출해야 함', () => {
    const req = {
    isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
    });
    test('로그인 되어있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
        const req = {
        isAuthenticated: jest.fn(() => false),
        };
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403);
        expect(res.json).toBeCalledWith({"message": "로그인 필요", "result": "Fail"});
        });
});
describe('isNotLoggedIn', () => {
        const res = {
        redirect: jest.fn(),
        };
        const next = jest.fn();
        test('로그인 되어있으면 isNotLoggedIn이 에러를 응답해야 함', () => {
        const req = {
        isAuthenticated: jest.fn(() => true),
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('로그인 상태입니다');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
        });
        test('로그인 되어있지 않으면 isNotLoggedIn이 next를 호출해야 함', () => {
            const req = {
            isAuthenticated: jest.fn(() => false),
            };
            isNotLoggedIn(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
            });
});

/**
 * 회원가입 여부 테스트 코드
 */
//supertest 모듈 객체 가져오기
const request = require("supertest") 
const {sequelize} = require("../models/index");
const app = require("../init");

beforeAll(async () => {
    await sequelize.sync() // 테스트용 ORM 생성
})

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
        .expect({result:"Success"}, done)
    });
    test("회원가입 - 중복 체크", done=>{
        const message = encodeURIComponent("이미 로그인된 회원");
        agent.post("/register")
        .send({
            "email":"test@naver.com",
            "nickname":"테스트",
            "password":"test123",
            "confirmPassword":"test123"
        })
        .expect({result:"이미 가입된 회원"}, done)
    })
})

afterAll(async () => {
    await sequelize.sync({force:true})
})