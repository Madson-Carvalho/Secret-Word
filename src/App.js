import { useCallback, useEffect, useState } from 'react';

import './App.css';

import Game from './components/Game';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';

import words from './data/words';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
]

const gessesQnt = 5

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [word] = useState(words)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letter, setLettler] = useState([])

  const [gessedLetters, setGessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [gesses, setGesses] = useState(gessesQnt)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(word)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const categoryWord = word[category][Math.floor(Math.random() * word[category].length)]

    return { categoryWord, category }
  },[word])

  const startGame = useCallback(() => {

    clearLetterState()

    const { categoryWord, category } = pickWordAndCategory()

    let wordLettler = categoryWord.split('')

    wordLettler.map((e) => e.toLowerCase())

    setPickedWord(categoryWord)
    setPickedCategory(category)
    setLettler(wordLettler)

    setGameStage(stages[1].name)
  },[pickWordAndCategory])

  const verifyLettler = (letters) => {
    const normalizedLetter = letters.toLowerCase()

    if (gessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    if (letter.includes(normalizedLetter)) {
      setGessedLetters((actualGessedLetter) => [...actualGessedLetter, normalizedLetter])
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter])

      setGesses((actualGesses) => actualGesses - 1)

    }
  }

  const clearLetterState = () => {
    setGessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (gesses <= 0) {
      clearLetterState()
      setGameStage(stages[2].name)
    }
  }, [gesses])

  useEffect(() => {
    const uniqueLetter = [...new Set(letter)]

    if (gessedLetters.length === uniqueLetter.length) {
      setScore((actualScore) => actualScore += 100)

      startGame()
    }
  }, [gessedLetters, letter, startGame])

  const retry = () => {
    setGesses(gessesQnt)
    setScore(0)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (<Game
        verifyLettler={verifyLettler}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letter={letter}
        gessedLetters={gessedLetters}
        wrongLetters={wrongLetters}
        gesses={gesses}
        score={score}
      />)}
      {gameStage === 'end' && <GameOver retry={retry} score={score} pickedWord={pickedWord} />}
    </div>
  );
}

export default App;
