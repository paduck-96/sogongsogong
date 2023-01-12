/**
 * 미들웨어 사용 테스트 코드
 */
const { isLoggedIn, isNotLoggedIn, verifyToken} = require("../router/middleware");
describe('isLoggedIn', () => {
    const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    };
    const next = jest.fn();
    test.skip('로그인 되어있으면 isLoggedIn이 next를 호출해야 함', () => {
    const req = {
    isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
    });
    test.skip('로그인 되어있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
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
        test.skip('로그인 되어있으면 isNotLoggedIn이 에러를 응답해야 함', () => {
        const req = {
        isAuthenticated: jest.fn(() => true),
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('로그인 상태입니다');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
        });
        test.skip('로그인 되어있지 않으면 isNotLoggedIn이 next를 호출해야 함', () => {
            const req = {
            isAuthenticated: jest.fn(() => false),
            };
            isNotLoggedIn(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
            });
});

// jwt 미들웨어 테스트
const jwt = require('jsonwebtoken');
jest.mock("jsonwebtoken");
describe("verifyToken", () => {
    const res = {
        status:jest.fn(()=>res),
        json:jest.fn()
    }
    const next = jest.fn();
    test("유효 토큰 확인 미들웨어", () => {
        const token = jwt.sign({
            email:"test@naver.com",
            nickname:"test"
        }, process.env.JWT_SECRET,{
            expiresIn : '1m',
            issuer: 'unn04012',
        })
        const req = {
            headers:{
                authorization:token
            }
        }
        verifyToken(req, res, next);
        expect(next).toBeCalledTimes(1);
    })
    test("유효 토큰의 오류 - 토큰 만료", () => {
        const req = {
            headers : {
                authorization : "expiredToken",
            }
        };                        
        const error = {name : 'TokenExpiredError'};
        jwt.verify.mockImplementation(() => {
            throw error;
        });
        verifyToken(req, res, next);
        expect(res.status).toBeCalledWith(419)
    })
    test("유효 토큰의 오류 - 토큰 오류", () => {
        const req = {
            headers : {
                authorization : "expiredToken",
            }
        };                        
        const error = {name : 'TokenInvalid'};
        jwt.verify.mockImplementation(() => {
            throw error;
        });
        verifyToken(req, res, next);
        expect(res.status).toBeCalledWith(401);
    })
})