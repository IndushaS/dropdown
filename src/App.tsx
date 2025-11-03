import React, {useState, useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [IsOpen, setIsOpen] = useState(false);
  const [Val,setVal] = useState("Select Value");

  const dropDownRef = useRef<HTMLDivElement>(null);

  const items = ["banana", "apple", "pear", "lime"];

  const handleClick = () =>{
    setIsOpen(!IsOpen);
  }
  const handleSelect = (item: string) =>{
    setVal(item);
    setIsOpen(false);
  }

  useEffect(()=>{
    const listenClick = (e:MouseEvent) =>{
      if(dropDownRef.current && !dropDownRef.current.contains(e.target as Node)){
        setIsOpen(false);
      };
    };

    document.addEventListener("click", listenClick);

    return() =>{
      document.removeEventListener("click", listenClick);
    }

  },[]);



  return (
    <div ref = {dropDownRef} style = {{position:"relative", width:"150px"}}>
      <button style={{background:"white", border: "1px solid grey", borderRadius:"4px", padding:"10px", cursor:"pointer", width: "150px"}} onClick={handleClick}>{Val}</button>
      {IsOpen && 
      <div style={{position: "absolute", top: "100%", background:"white", marginTop: "4px", width:"100%", border: "1px solid black", zIndex:10}}>
        <ul style={{listStyleType:"none",padding: 0, margin: 0 }}>
          {items.map((item,index)=>
          <li style = {{cursor:"pointer"}} onClick={()=>handleSelect(item)} key = {index} onMouseEnter={e => e.currentTarget.style.background = "#eee"}
    onMouseLeave={e => e.currentTarget.style.background = "white"}>
            {item}</li>
          
          )}
        </ul>
      </div>}
    
    </div>
  );
}

export default App;
