import React from 'react';
import { v4 as uuid } from 'uuid';
import styles from './Card.module.scss';

const Card = ({data, setAnswer}) => {

    const itemHandler = (isCorrect, name) => {
        setAnswer(isCorrect, name);
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.card__title}>{data.question}</h2>
            <ul className={styles.card__list}>
                {
                    data.answers.map(item => {
                        return (
                            <li className={styles.card__list__item} onClick={() => {itemHandler(item.isCorrect,item.name)}} key={uuid()}>{item.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Card;