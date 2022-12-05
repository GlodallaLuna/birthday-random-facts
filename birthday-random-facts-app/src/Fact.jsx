import './style.css'

export default function Fact(props) { 
  const text = props.factText
  console.log(text)
    return(
       <div className='fact-text'>
        <p className='fact-paragraph'>Hello <span className='bold'>{text.firstName}</span>!</p>
        <p className='fact-paragraph'>On <span className='bold'>March {text.day}</span> this is what happened:</p>
        <p className='fact-paragraph'> {text.event}</p>
       </div>
    )
}