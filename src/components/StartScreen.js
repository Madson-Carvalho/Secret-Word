import './StartScreen.css'

const StartScreen = (props) => {
    return (
        <div className='start'>
            <h1>Palavra Secreta</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={props.startGame}>Jogar</button>
        </div>
    )
}

export default StartScreen