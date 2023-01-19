//액션 타입 정의
const LOGIN_USER = "user/LOGIN_USER";
const REGISTER_USER = "user/REGISTER_USER";

//액션 생성 함수 정의
export const login = async (dataToLogin) => {
    const request = await fetch("/login", {
        method:"post",
        body:JSON.stringify(dataToLogin)
    }).then(res=>res.json());

    return {
        type:LOGIN_USER,
        payload:request
    }
}
export const register = async (dataToRegister) => {

    const request = await fetch("/register", {
        method:"post",
        body:JSON.stringify(dataToRegister)
    }).then(res=>res.json());

    return {
        type: REGISTER_USER,
        payload:request
    }
};

//초기 상태 정의
const initialState = {};

//Reducer 함수 정의
const User = (state =initialState, action) => {
    switch( action.type){
    case LOGIN_USER:
        return {...state, loginUser:action.payload};
    case REGISTER_USER:
        return {...state, registerUser:action.payload}
    default:
        return state;
    }
    };
    export default User;