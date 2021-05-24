import React from 'react'
import './RecommendedCard.css'

function RecommendedCard({image, title}){
    return (
        <li className="RecommendedCard" style={{backgroundImage: `url(${image})`}}>
            <div className="RecommendedCard-title">
                <span>{title}</span>
            </div>
        </li>
    )
}

export default RecommendedCard