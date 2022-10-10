import React, {useState} from 'react';
import Card from './components/Card/Card';
import { quizData } from './content.js';
import styles from './App.module.scss';
import santa from './img/santa.gif';

function App() {

	let [cardNum, setCardNum] = useState(0);
	let [answerCount, setAnswerCount] = useState(0);
	let [showResult, setShowResult] = useState(false);
	let [answers, setAnswers] = useState([]);

	const setAnswer = (isCorrect) => {
		if (isCorrect) {
			setAnswerCount(answerCount + 1);
		}
		setCardNum(cardNum + 1);

		if (cardNum >= quizData.length - 1) {
			setShowResult(true);
		}
	}

	const restartHandler = () => {
		setCardNum(0);
		setAnswerCount(0);
		setShowResult(false);
	}

	return (
		<div className={styles.App}>
			<div className={styles.quiz__wrapper}>
				<h1 className={styles.title}>{showResult ? 'Look at your score' : 'Take part in our quiz!'}</h1>
				{showResult ? (
					<div className={styles.quiz__result}>{`Your score is: ${'\u00A0'} ${answerCount} of 7`}</div>
				) : (
					<div className={styles.quiz__body}>
						<h2 className="question__title">{`Question: ${'\u00A0'} ${cardNum + 1} / 7`}</h2>
						<Card data={quizData[cardNum]} setAnswer={setAnswer}/>
					</div>
				)}
				{
					showResult && (
						<div className={styles.quiz__play_again}>
							<img className={styles.quiz__img} src={santa} alt="santa:)" />
							<button className={styles.quiz__btn} onClick={restartHandler}>Wanna playing again?</button>
						</div>
					)
				}
			</div>
	</div>
	);
}

export default App;
