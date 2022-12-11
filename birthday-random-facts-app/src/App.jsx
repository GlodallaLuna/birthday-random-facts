import { useState, useEffect } from 'react'
import './style.css'
import Fact from "./Fact"
import Spinner from "./Spinner"

function App() {
  //this is for to update the text on the screen
  const [factObj, setFactObj] = useState({
    firstName: "",
    month: "",
    day: "",
    event: ""
  })

  //this is for to update the input
  const [formInput, setFormInput] = useState({
    firstName: "",
    month: "",
    day: ""
  })

  const [resetButton, setResetButton] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  function resetGame() {
    //resetting both the factObj and the Input one
    setFactObj(() => ({
      firstName: "",
      month: "",
      day: "",
      event: ""
    }))

    setFormInput(() => ({
      firstName: "",
      month: "",
      day: ""
    }))

    setResetButton(prevResetButton => !prevResetButton)
    setErrorMessage("")
  }


  function handleClick() {
    if(resetButton) {
      resetGame()
    } else {

      const error = errorCheck()
      setErrorMessage(() => error)
      if(!error) {
        setLoading(true)
        fetch(`https://api.api-ninjas.com/v1/historicalevents?month=${formInput.month}&day=${formInput.day}`,{ headers: { 'X-Api-Key': 'QMr1gJuVcUTLnhez5mqnwA==p2xCPT1z7qNIwdvW'}})
              .then(response => response.json())
              .then(data => {
                setLoading(false)
                getRandomFact(data)
                setResetButton(prevResetButton => !prevResetButton)  
              })  
      }

    }
 
  }

  function errorCheck() {
    
    if(formInput.firstName === "") {
      return "Please write your first name!"
    } else if(formInput.month === "") {
      return "Please select a month!"
    } else if(formInput.day === "") {
      return "Please enter the day!"
    } else if(isNaN(formInput.day)) {
      return "Please enter a valid number for the day!"
    } else if(Number(formInput.day) <= 0) {
      return "Please enter a valid number for the day!"
    } else if(Number(formInput.day) % 1 != 0) {
      return "Please enter a valid number for the day!"
    } 

    const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		const upperLimit = days[Number(formInput.month) -1]
    if (Number(formInput.day) > upperLimit) {
     	return 'Please enter a valid day!' 
    }

    return ""
  }

  function getRandomFact(factsArray) {
    const randomNumber = Math.floor(Math.random() * factsArray.length)
    const stringEvent = factsArray[randomNumber].event
    setFactObj(() => ({
      ...formInput,
      event: stringEvent
    })) 
  }

  function handleChange(event) {
    const {name, value} = event.target
    setFormInput(prevFormInput => ({
      ...prevFormInput,
      [name]: value
    }))
    
  }

  
  

  return (
    
    <div className="content">
      <main className="box-container">
        <h1 className='title'>Discover what happened on the same day as your birthday</h1>
        <div className='form'>
            <p className='form-text'>What's your name?</p>
            <input 
                    type="text"
                    placeholder="Type your first name..."
                    className="form-input "
                    name="firstName"
                    value={formInput.firstName}
                    onChange={handleChange}
            />
            <p className='form-text'>When is your birthday?</p>
            <div className='container-birthday'>
                <div className="container-birthday--input">
                    <p className='form-text--input'>Select Month</p>
                    <select value={formInput.month}
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
                            value={formInput.day}
                            onChange={handleChange}
                    />
                </div>
            </div>
            <p className="error">{errorMessage}</p>
            <button className="form-button" onClick={handleClick}>
                   {resetButton ? "Reset" : "Get My Random Fact"}
            </button>
            
        </div>
        
       {loading && <Spinner />}
        {factObj.event != "" &&  <Fact factText={factObj} />}
      </main>

      <footer>
       
        <p className="footer__para"><a className="footer__link" href="https://api-ninjas.com/api/historicalevents">Powered by Historical Events API</a></p>
        <p className="footer__para"><a className="footer__link" href="https://www.freepik.com/"> Background image designed by Freepick</a></p>
        <p className="footer__para"><a className="footer__link" href="https://gloricodes.com/"> Designed and built by Gloria Mancini</a></p>
        </footer>
    </div>

  )
}

export default App
