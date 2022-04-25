import React from 'react'
import ContentLoader from "react-content-loader"
import s from "../components/Styles/Loading.module.css"

const Loading = () => {
    const ThreeDots = props => (
        <ContentLoader
            viewBox="0 0 400 160"
            height={160}
            width={400}
            backgroundColor="transparent"
            {...props}
        >
            <circle cx="150" cy="143" r="8" />
            <circle cx="194" cy="143" r="8" />
            <circle cx="238" cy="143" r="8" />
        </ContentLoader>
    )
    return (
        <div className={s.root}>


            <ThreeDots></ThreeDots>


        </div>
    )
}

export default Loading