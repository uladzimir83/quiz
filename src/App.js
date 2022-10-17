import React, {useState} from 'react';
import clsx from 'clsx';
import Card from './components/Card/Card';
import { quizData } from './content.js';
import styles from './App.module.scss';
import santa from './img/santa.gif';

function App() {

	let [cardNum, setCardNum] = useState(0),
		[answerCount, setAnswerCount] = useState(0),
		[showResult, setShowResult] = useState(false),
		[finalList, setFinalList] = useState([]),
		[showFinal, setShowFinal] = useState(false);

	const setAnswer = (isCorrect, name) => {
		if (isCorrect) {
			setAnswerCount(answerCount + 1);
		}
		getRightAnswer(name);
		setCardNum(cardNum + 1);

		if (cardNum >= quizData.length - 1) {
			setShowResult(true);
		}
	}

	const showFinalHandler = () => {
		setShowFinal(true);
	}

	const getRightAnswer = (name) => {
		let item = quizData[cardNum].answers;
		let itemName = item.find(i => i.isCorrect === true);
		setFinalList([...finalList, {correct: itemName.name, userAnswer: name}])
	}

	const restartHandler = () => {
		setCardNum(0);
		setAnswerCount(0);
		setShowResult(false);
		setShowFinal(false);
		setFinalList([]);
	}

	return (
		<div className={styles.App}>
			<div className={styles.quiz__wrapper}>
				<h1 className={styles.title}>{showResult ? 'Look at your score' : 'Take part in our quiz!'}</h1>
				{showResult ? (
					<div className={styles.quiz__result}>{`Your score is: ${'\u00A0'} ${answerCount} of 7`}</div>
				) : (
					<div className={styles.quiz__body}>
						<h2 className="question__title">{`Question: ${'\u00A0'} ${cardNum + 1} of 7`}</h2>
						<Card data={quizData[cardNum]} setAnswer={setAnswer}/>
					</div>
				)}
				{
					showResult && (
						<div className={styles.quiz__play_again}>
							<img className={styles.quiz__img} src={santa} alt="santa:)" />
							<button className={styles.quiz__btn} onClick={restartHandler}>Wanna playing again?</button>
							<button className={styles.quiz__btn__result} onClick={showFinalHandler}>Show your answers?</button>
						</div>
					)
				}
				{
				showFinal && (
						<div className={styles.quiz__final}>
							<div className={styles.quiz__final__heading}>
								<div className="quiz__final__heading__item">Correct:</div>
								<div className="quiz__final__heading__item">Your:</div>
							</div>
							{
							finalList.map((item, idx) => {
								return (
									<div className={styles.quiz__final__item} key={item.correct}>
										<div className={styles.quiz__final__correct}>{`${idx + 1}. ${'\u00A0'}`} <span>{item.correct}</span></div>
										<div className={clsx(styles.quiz__final__user,
										{[styles.quiz__final__wrong]: item.correct !== item.userAnswer})}><span>{item.userAnswer}</span></div>
									</div>
								)
							})
							}
						</div>
					)
				}
			</div>
	</div>
	);
}

export default App;
