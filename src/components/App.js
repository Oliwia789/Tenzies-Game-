import Die from "./Die"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(item => item.isHeld)
        const firstValue = dice[0].value
        const allValue = dice.every(item => item.value === firstValue)
        if (allHeld && allValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    const diceElements = dice.map(item => 
    <Die key={item.id} value={item.value} held={item.isHeld} holdDice={() => holdDice(item.id)}/>)

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function newNum() {
        if (!tenzies) {
            setDice(prevDice => prevDice.map(item => {
                return item.isHeld ? item : generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function allNewDice() {
        let newDice = []
        while(newDice.length < 10) {
            newDice.push({value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        })
        }
        return newDice
    }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(item => {
            return item.id === id ? {...item, isHeld: !item.isHeld} : item
        }))
    } 

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
               {diceElements}
            </div>
            <button onClick={newNum}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}

export default App;
