import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showArticle} from "redux/features/document/article/showArticelSlice";
import {useParams} from "react-router-dom";
import {FirstLoadingCore, LoadingCore} from "core";
import DocumentBody from "../DocumentBody";

const ShowWiki = () => {
    const [wikis, setWikis] = useState(null)
    const {data, loading} = useSelector((state) => state.showArticleSlice)
    const {data: user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const {id} = useParams();
    const ref = useRef(false)

    React.useEffect(() => {
        dispatch(showArticle({id: id, page:1, perPage: 5}))
    }, [dispatch, id]);

    React.useEffect(() => {
        setWikis(data)
    }, [data]);

    useEffect(() => {
        if (loading && wikis !== null){
            ref.current = true
        }
    }, [loading, wikis])



    return (!ref.current && loading) ? <FirstLoadingCore loading={loading}/> :(<>
        {loading && <LoadingCore loading={loading}/>}
        <DocumentBody user={user?.data} id={id} data={wikis} setData={setWikis}/>
    </>);
};
export default ShowWiki;
