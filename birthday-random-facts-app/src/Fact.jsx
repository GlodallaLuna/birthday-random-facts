import './style.css'

export default function Fact(props) { 
  const text = props.factText

  function numberToMonth(number) {
    const index = Number(number) - 1
   const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ]
    return months[index]
  }

  
  
    return(
       <div className='fact-text'>
        <p className='fact-paragraph'>Hello <span className='bold'>{text.firstName}</span>!</p>
        <p className='fact-paragraph'>On <span className='bold'>{numberToMonth(text.month)} {text.day}</span> this is what happened:</p>
        <p className='fact-paragraph'> {text.event}</p>
       </div>
    )
}