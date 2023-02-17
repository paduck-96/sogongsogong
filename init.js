const express = require('express');
const dotenv = require('dotenv');

/**
 * .env 파일 사용 설정 
 * */
dotenv.config();

/**
 * 서버 설정
*/
const app = express();
app.set('port', process.env.PORT);

/**
 * cors 설정
 */
const cors = require("cors");
app.use(cors({
    origin:true,
    credentials:true
}));
/**
 * 로그 파일 기록 설정
 */
//로그 출력을 위한 파일 과 경로를 위한 모듈 설정
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
const logDirectory = path.join(__dirname, 'public/log');
//로그 디렉토리 생성
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
//로그 파일 옵션 설정
const accessLogStream = FileStreamRotator.getStream({
date_format: 'YYYY-MM-DD',
filename: path.join(logDirectory, 'access-%DATE%.log'),
frequency: 'daily',
verbose: false
});
//로그 설정
app.use(morgan('combined', {stream: accessLogStream}));

/**
 * static 파일의 경로 설정
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * 출력하는 파일 압축해서 전송
 */
const compression = require('compression');
app.use(compression());
app.use(express.json());
/**
 * post 방식의 파라미터 읽기
 */
const bodyParser = require('body-parser');
//JSON 데이터 파싱
app.use( bodyParser.json()); 
//URL 데이터 파싱
app.use(bodyParser.urlencoded({
extended: true
}));
/**
 * 쿠키 설정
 */
const cookieParser = require('cookie-parser');
app.use(cookieParser(process. env.COOKIE_SECRET));

/**
 * 세션 설정
 */
const session = require("express-session");
var options = {
host :process.env.DB_HOST,
port : process.env.DB_PORT,
user : process.env.DB_ID,
password : process.env.DB_PW,
database : process.env.DB_NAME
};
const MySQLStore = require('express-mysql-session')(session);
app.use(
session({
secret: process.env.COOKIE_SECRET,
resave: false,
saveUninitialized: false,
store : new MySQLStore(options),
cookie:{
    maxAge:24*60*60*1000
}
})
);

/**
 * DB 접속 설정
 */
const { sequelize } = require('./models');
sequelize.sync({ force: false })
.then(() => {
console.log('데이터베이스 연결 성공');
})
.catch((err) => {
console.error("DB 접속 오류 : ", err.message);
}
);

/**
 * 앞으로 사용되는 Router들은 여기에 Import
 */
const homeRouter = require("./router/homeRouter");
const articlesRouter = require("./router/articlesRouter");
const articleRouter = require("./router/articleRouter");
app.use("/", homeRouter);
app.use("/articles", articlesRouter);
app.use("/article", articleRouter);
/**
 * 에러 라우터 처리
 */
//라우터 없음 오류
app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    err.status = 404;
    next(err);
    });
//서버 오류 발생시 처리
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    //res.render('error');
    res.json({result:"Error", data: `${res.locals.error}`})
});
app.get("*", (req, res) =>{
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
})
/**
 * 서버 실행
테스트 실행에는 주석 처리
*/
 app.listen(app.get('port'), () => {
         console.log(app.get('port'), "번 포트에서 실행"+
         "http://localhost");
    });
    // module.exports = app;