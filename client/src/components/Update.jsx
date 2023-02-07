import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
//import {Navigate} from 'react-router-dom'

const Update = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [articleInfo, setArticleInfo] = useState({
        articleTitle:"",
        articleContent:"",
        categoryName:""
    })
    useEffect(()=>{
            fetch(`http://localhost/article/${params.articleId}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res=>res.json())
            .then(res=>{
                setArticleInfo({
                    articleTitle:res.article.articleTitle,
                    articleContent:res.article.articleContent,
                    categoryName:res.category.join(",")
                })
            })
    }, [params.articleId])
    const onChangeHandler = (e) => {
        const newArticleInfo = {
                    ...articleInfo,
                    [e.target.name] : e.target.value
                };
                setArticleInfo(newArticleInfo);
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(articleInfo.articleTitle.trim() === "" || articleInfo.articleContent.trim() === ""){
            alert("내용 입력 필수");
        }
        if(articleInfo.articleTitle.trim().length>200){
            alert("제목 길이 초과!");
        }if(articleInfo.articleContent.trim().length>200){
            alert("내용 길이 초과!");
        }
        const response = await fetch(`http://localhost/article/${params.articleId}/update`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body:JSON.stringify({
                articleTitle:articleInfo.articleTitle,
                articleContent:articleInfo.articleContent,
            })
        }).then(res=>res.json());
        if(response.result ==="success"){
            return navigate("/articles", {replace:true})
        }
    }
    return (
        <div>
            <form method="put" onSubmit={onSubmitHandler}>
                <label>
                    제목 :
                    <input type="text" name='articleTitle' value={articleInfo.articleTitle} onChange={onChangeHandler} />
                </label>
                <br />
                <label>
                    카테고리 :
                    <input type="text"  name='categoryName' value={articleInfo.categoryName} onChange={onChangeHandler} disabled/>
                </label>
                <br/>
                <label>
                    내용 :
                    <textarea name='articleContent' value={articleInfo.articleContent} onChange={onChangeHandler} />
                </label>
                <br />
                <button type='submit'>글 수정</button>
            </form>
        </div>
    );
};

export default Update;