import React from 'react'
import './NewsCard.scss'

const NewsCard = ({ newsData }) => {

    const displayCards = newsData.map((article) => {
        return (
            <a className='card' href={article.url}>
                <h1 className='card__title'>{article.title}</h1>
                <img className='card__image' src={article.image}/>
            </a>
        )
    })

  return (
    <div>
        {displayCards}
    </div>
  )
}

export default NewsCard