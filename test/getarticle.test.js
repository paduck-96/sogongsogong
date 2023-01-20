const request = require("supertest") 
const {sequelize} = require("../models/index");
const app = require("../init");
const { urlencoded } = require("express");

// 테스트 전 DB 생성
beforeAll(async () => {
    await sequelize.sync()
})

describe("GET /articles", ()=>{
    test.skip("전체 게시글 출력 - 공백", done => {
        request(app)
        .get("/articles")
        .expect(204, done)
    })
    test.skip("전체 게시글 출력 - 있을경우", done => {
        request(app)
        .get("/articles")
        .expect(200, done);
    })
})

describe("GET /groupArticles", () => {
    test.skip("특정 그룹 게시글 출력 - 없을경우", done => {
        request(app)
        .get("/articles/sports")
        .expect(204, done)
    })
    const param = encodeURIComponent("미정")
    test("특정 그룹 게시글 출력", done => {
        request(app)
        .get(`/articles/${param}`)
        .expect(200,done);
    })
})

// 테스트 후 DB 초기화
afterAll(async () => {
    await sequelize.sync({})
})
