import { useState, useRef, useEffect, useReducer } from 'react';
import './App.css';
import peace from './peace.mp3'

//for useReducer function only!
function reducer (state, action) {
  switch(action.type) {
    case "Multiply": return { count: state.count * 5 };
    case "Divide": return {count: state.count / 5};
    default: return state;
  }
}



function App() {
  //videlit graph input
  const [city, setCity] = useState("");
  const inputRef = useRef();
  const focus = () => {
    inputRef.current.focus()
  }
  
  //useRef and useEffect for previous state

  const [count, setCount] = useState(0);
  const previousCountRef = useRef();
  const previousCount = previousCountRef.current;
  useEffect(() => {
    previousCountRef.current = count;
  })

  //play music
  const [musicPlay, setMusicPlay] = useState(true);
  const refAudio = useRef();
  const handlePlay = () => {
    setMusicPlay(!musicPlay)
    musicPlay ? refAudio.current.play() : refAudio.current.pause()
  }


  //useReducer
const [state, dispatch] = useReducer (reducer, {count: 5}) 




  return (
    <div className="App">

    
     <input ref ={inputRef} value={city} onChange={e => setCity(e.target.value)}/>
     <p>I want to go to {city}</p>
     <button onClick={focus}>UseRef</button>
    
    
    <p>Current state: {count}</p>
    <p>Previous state: {previousCount} </p>
    <button onClick={() => setCount(count+1)}>Click here</button>

<audio
src = {peace}
loop ="loop"
ref ={refAudio}>
</audio>
<button onClick={handlePlay}>{musicPlay ? "Play" : "Pause"}</button>



<div>
<p>{state.count}</p>
<button onClick={() => dispatch ({type: "Multiply"})}>Multiply</button>
<button onClick={() => dispatch ({type: "Divide"})}>Divide</button>
</div>

<div>
  
</div>

    </div>

    

 
  );
}

export default App;
