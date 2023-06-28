import React from 'react'
import Dice from './Dice'
import Confetti from "react-confetti"
export default function Main() {

    function randomDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            held: false
        }
    }
    function randomGen() {
        let dicesArr = []
        for (let i = 0; i < 10; i++) {
            dicesArr.push({
                ...randomDice(),
                id: i
            })
        }
        return dicesArr;
    }

    const [dices, setDices] = React.useState(randomGen())
    const [tenzies, setTenzies] = React.useState(false)
    function checkTenzies() {
        let value = dices[1].value;
        if (dices.every(d => d.held == true) && dices.every(d => d.value == value)) {
            setTenzies(true)
            console.log('you win')
        }
    }
    const [counter, setCounter] = React.useState(0)
    React.useEffect(checkTenzies, [dices])
    function rollDice() {
        setDices(prev => {
            if (tenzies) {
                setCounter(0)
                setTenzies(false)
                return randomGen()
            } else {
                setCounter(prev => prev + 1)
                return prev.map(d => {
                    return d.held == true ? d : { ...randomDice(), id: d.id }
                })
            }
        });
    }

    function holdDice(id) {
        setDices(prev => prev.map(d =>
            d.id === id ? { ...d, held: !d.held } : d))
    }
    let dicesElements = dices.map(d => <Dice key={d.id} obj={d} holdDice={holdDice} />)
    const [size, setSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    function handleResize() {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    React.useEffect(() => {
        window.onresize = () => handleResize();
        // console.log('resized')
    }, [size])
    return (
        <div className='main--div'>
            {tenzies && <Confetti width={size.width}
                height={size.height} />}
            <div className='tenzies'>

                <h1>Tenzies</h1>
                <span className='counter'>No. of Rolls <b>{counter}</b></span>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='diceElements'>
                    {dicesElements}
                </div>

                {
                    tenzies ? <button onClick={rollDice} >New game</button> : <button onClick={rollDice} >Roll</button>
                }
            </div>
        </div>
    )
}