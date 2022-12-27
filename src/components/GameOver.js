import './GameOver.css'

const GameOver = (props) => {
    return (
        <div>
            <h1>Game Over</h1>
            <h2>A sua pontuação foi: <span>{props.score}</span></h2>
            <h2>A palavra era: <span>{props.pickedWord}</span></h2>
            <button onClick={props.retry}>Resetar jogo</button>
        </div>
    )
}

export default GameOver