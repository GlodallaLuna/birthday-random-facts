import { useState, useEffect } from 'react'
import './style.css'
import Form from "./Form"
import Fact from "./Fact"

function App() {
  const [factObj, setFactObj] = useState({
    firstName: "",
    month: "",
    day: "",
    event: ""
  })

const [resetButton, setResetButton] = useState(false)


  function handleClick() {
    fetch(`https://api.api-ninjas.com/v1/historicalevents?month=${factObj.month}&day=${factObj.day}`,{ headers: { 'X-Api-Key': 'QMr1gJuVcUTLnhez5mqnwA==p2xCPT1z7qNIwdvW'}})
            .then(response => response.json())
            .then(data => {
              getRandomFact(data)
              setResetButton(prevResetButton => !prevResetButton)
            })
          
  }

  function getRandomFact(factsArray) {
    if(!resetButton){
      const randomNumber = Math.floor(Math.random() * factsArray.length)
      const stringEvent = factsArray[randomNumber].event
      setFactObj(prevFactObj => ({
        ...prevFactObj,
        event: stringEvent
      }))
    } else {
      setFactObj(prevFactObj => ({
        ...prevFactObj,
        firstName: "",
        month: "",
        day: "",
        event: ""
      }))
    }
    
    
  }

  function handleChange(event) {
    const {name, value} = event.target
    setFactObj(prevFactObj => ({
      ...prevFactObj,
      [name]: value
    }))
    
  }

  
  

  return (
    <main>
      <div className="box-container">
        <h1 className='title'>Discover what happened on the same day of your birthday</h1>
        <div className='form'>
            <p className='form-text'>What's your name?</p>
            <input 
                    type="text"
                    placeholder="Type your first name..."
                    className="form-input "
                    name="firstName"
                    value={factObj.firstName}
                    onChange={handleChange}
            />
            <p className='form-text'>When is your birthday?</p>
            <div className='container-birthday'>
                <div className="container-birthday--input">
                    <p className='form-text--input'>Select Month</p>
                    <select value={factObj.month}
                            onChange={handleChange}
                            name="month" 
                            className='form-option form-input form-input--birthday'>
                        <option value="">--</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>

                    </select>
                </div>
                <div className="container-birthday--input">
                    <p className='form-text--input'>Type the Day</p>
                    <input
                            type="text"
                            placeholder="e.g. 1"
                            className="form-input form-input--birthday"
                            name="day"
                            value={factObj.day}
                            onChange={handleChange}
                    />
                </div>
            </div>
            <button className="form-button" onClick={handleClick}>
                   {resetButton ? "New Fact" : "Get My Random Fact"}
            </button>
            
        </div>
        {factObj.event != "" && <Fact factText={factObj} />}
      </div>
    </main>
  )
}

export default App
