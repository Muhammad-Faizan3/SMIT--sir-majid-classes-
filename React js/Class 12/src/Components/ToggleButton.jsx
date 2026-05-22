import { useState,useEffect } from "react"
function ToggleButton() {
    const [on,setOn] = useState()

    
useEffect(() => {
  if(on){
  console.log('Bulb ON')
  }else{
    console.log('Bulb Off')
    
  }
  
},[on])
    return(
        <>
        <img src={
            on
            ? 'https://www.w3schools.com/js/pic_bulbon.gif'
            : 'https://www.w3schools.com/js/pic_bulboff.gif'
        }alt="Bulb" />

        <button onClick={() => setOn(perv => !perv)}>
            {on ?'Turn Off' : 'Turn On'}
        </button>
        </>
    )
}

export default ToggleButton;