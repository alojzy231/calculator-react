import { useState } from 'react';
import './app.css'
import Button from './button';

const buttons = [
  ["OFF", "MRC", "M-", "M+", "/"],
  ["%", 7, 8, 9, "*"],
  ["√", 4, 5, 6, "-"],
  ["C", 1, 2, 3, "+"],
  ["CE", 0, ".", "=", "BG"]
];

let memory;

let char = "pow";
let float = false;
let dstToPoint = 1;
let bgColor = "white";

function App() {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [prevNumber, setPrevNumber] = useState(0);

  const inputNumber = val => {
    if(typeof val === "number"){
      if(float){
        val /= Math.pow(10, dstToPoint);
        setCurrentNumber(prev => prev + val);
        dstToPoint += 1;
      }else{
        setCurrentNumber(prev => prev*10 + val);
      }
      
    }else if(typeof val === "string"){
      

      if(val === "."){
        console.log("point");
        float = true;
      }else if(val === "C"){ //clean just current number
        setCurrentNumber(0);
        float = false;
      dstToPoint = 1;
      }else if(val === "CE"){ //clean all numbers
        setPrevNumber(0);
        setCurrentNumber(0);
        float = false;
        dstToPoint = 1;
      }else{
        float = false;
        dstToPoint = 1;

        if(val === "="){
          

          if(char === "pow"){
            setPrevNumber(currentNumber);
            setCurrentNumber(prev => prev * prev);
          }else if(char === "/"){
            setCurrentNumber(prev => prevNumber / prev);
            setPrevNumber(0);
          }else if(char === "*"){
            setCurrentNumber(prev => prev * prevNumber);
            setPrevNumber(0);
          }else if(char === "-"){
            setCurrentNumber(prev => prevNumber - prev);
            setPrevNumber(0);
          }else if(char === "+"){
            
            setCurrentNumber(prev => prev + prevNumber);
            
            setPrevNumber(0);
          }
          
          char = "pow";
        }else if(val === "C"){
          setCurrentNumber(0);
          float = false;
          dstToPoint = 1;
        }else if(val === "CE"){
          setPrevNumber(0);
          setCurrentNumber(0);
        }else if(val === "%"){
          setPrevNumber(currentNumber / 100);
          setCurrentNumber(0);
        }else if(val === "√"){
          setPrevNumber(currentNumber);
          setCurrentNumber(prev => Math.sqrt(prev));
        }else if(val === "OFF"){
          setPrevNumber(0);
          setCurrentNumber(707);
        }else if(val === "BG"){
          bgColor = (bgColor === "white") ? "black" : "white";
          document.body.style.backgroundColor = bgColor;
        }else if(val === "MRC"){
          if(memory){
            setCurrentNumber(memory);
          }
        }else if(val === "M+"){
          memory = currentNumber
        }else if(val === "M-"){
          if(currentNumber === memory){
            memory = undefined;
          }
        }else{
          char = val;
          setPrevNumber(currentNumber);
          setCurrentNumber(0);
        }
      } 
    }
  };

  return (
    <div className="app">
      <div className="display">
          <div className="prevNumber">
            {prevNumber}
          </div>
          <div className="currentNumber">
            {currentNumber}
          </div>
      </div>

        <table>
          <tbody>
            {buttons.map((row, i) => {
              
              return <tr key={i}>
                {row.map((val, y) => {
                  return <Button key={y} val={val} input={inputNumber}/>
                })}
              </tr>
            })}
          </tbody>
        </table>
    </div>
  );
}

export default App;
