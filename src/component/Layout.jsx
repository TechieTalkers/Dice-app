import React from "react";
import "../style/Layout.css"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

const Layout=()=>{
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(function(){

let heldData=dice.every(die=> die.isHeld);
let dataCheck=dice[0].value;
let dataValidation=dice.every(die => die.value===dataCheck)
if(heldData && dataValidation){
    setTenzies(true)
    console.log("you won")
}

    },[dice])
    function holdDice(id){
        
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        })) 
        }
        

    function allNewDice(){
        const dice=[];
        for(let i=0;i<10;i++){
           dice.push({ value: Math.ceil(Math.random() * 6 ),
                         isHeld: false,
                        id: nanoid()
                     });
        }
        return dice;
    }
    const diceData=dice.map(data =><Dice key={data.id}  value={data.value} isHeld={data.isHeld} holdDice={()=>holdDice(data.id)} />)

function rollDice(){
    if(tenzies){
        setDice(allNewDice());
        setTenzies(false)
    }else{
    const newDice=[];
    for(let i=0;i<10;i++){
        if(!dice[i].isHeld){
            newDice.push({ value: Math.ceil(Math.random() * 6 ),
                isHeld: false,
               id: nanoid()
            });
        }else{
            newDice.push(dice[i])
        }
    }
    setDice(newDice)
    }
}

    return(
       
<main className="outer-border">
{tenzies && <Confetti />}
<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            
    <div className="dice-container">
   {diceData}
    </div>
    <button className="dice-roll" onClick={rollDice}>{tenzies ? "New Game": "Roll"}</button>

</main>
    )
}

export default Layout;