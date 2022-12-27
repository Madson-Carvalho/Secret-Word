import { useRef, useState } from 'react'
import './Game.css'

const Game = (props) => {
    const [letteres, setLettler] = useState('')
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        props.verifyLettler(letteres)
        setLettler('')
        letterInputRef.current.focus()
    }

    return (
        <div className='game'>
            <p className="points">
                <span>Pontuação: {props.score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="tips">
                Dica sobre a palavra: <span>{props.pickedCategory}</span>
            </h3>
            <p>Você ainda tem {props.gesses} tentativas</p>
            <div className="wordConteiner">
                {props.letter.map((el, i) => (
                    props.gessedLetters.includes(el) ? (
                        <span className="letter" key={i}>{el}</span>
                    ) : (
                        <span className="blankSquare" key={i}></span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='letter' maxLength={1} required onChange={(e) => setLettler(e.target.value)} value={letteres} ref={letterInputRef} />
                    <button>Jogar</button>
                </form>
            </div>
            <div className="wrongLetter">
                <p>Letras já tentadas:</p>
                {props.wrongLetters.map((el, i) => (
                    <span key={i}>{el}, </span>
                ))}
            </div>
        </div>

    )
}

export default Game