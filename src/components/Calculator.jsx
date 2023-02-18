import { useState, useEffect } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState(0);
  const [currentCalc, setCurrentCalc] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    const newValue = currentCalc + event.target.value;
    setCurrentCalc(newValue);
    setDisplay(newValue);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplay(eval(currentCalc));
    let total = eval(currentCalc);
    setCurrentCalc(total);
  }

  const resetCalc = (event) => {
    event.preventDefault();
    setDisplay(0);
    setCurrentCalc('');
  }

  const backSpace = (event) => {
    event.preventDefault();
    const newValue = currentCalc.slice(0, -1);
    setCurrentCalc(newValue);
    if (newValue === '') {
      setDisplay('0');
    } else {
      setDisplay(newValue);
    }
  }

  const handlePercent = () => {
    const newValue = currentCalc / 100;
    setCurrentCalc(newValue);
    setDisplay(newValue);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
        // Backspace key
        if (event.keyCode === 8) {
            event.preventDefault();
            backSpace(event);
        } 
        // Escape key
        else if (event.keyCode === 27) {
            event.preventDefault();
            resetCalc(event);
        }
        // Percent key
        else if (/^[%]$/.test(event.key)) {
            event.preventDefault();
            handlePercent(event);
        } 
        // Enter Key
        else if (event.keyCode === 13 || /^[=]$/.test(event.key)) {
            event.preventDefault();
            handleSubmit(event);
        }
        // Any number from 0-9 and operators
        else if (/^[0-9\+\-\*\/\(\)\.]$/.test(event.key)) {
            event.preventDefault();
            const newValue = currentCalc + event.key;
            setCurrentCalc(newValue);
            setDisplay(newValue);
        } 
      }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [currentCalc])

    return (
        <main id="calculator-container">
            <section id="brand-and-model">
                <h4>AlgeBros</h4>
                <h5>SEIR-123</h5>
            </section>
        <section id="result"><h1>{display}</h1></section>
        <section id="buttons-container">
            <button className="calc-button tertiary-btn" onClick={resetCalc}>AC</button>
            <button className="calc-button tertiary-btn" onClick={backSpace}><span className="material-symbols-rounded size-48">backspace</span></button>
            <button className="calc-button tertiary-btn" value="%" onClick={handlePercent}>{'\u0025'}</button>
            <button className="calc-button primary-btn" value="/" onClick={handleClick}>{'\u00f7'}</button>
            <button className="calc-button primary-container-btn" value="7" onClick={handleClick}>7</button>
            <button className="calc-button primary-container-btn" value="8" onClick={handleClick}>8</button>
            <button className="calc-button primary-container-btn" value="9" onClick={handleClick}>9</button>
            <button className="calc-button primary-btn" value="*" onClick={handleClick}>{'\u00d7'}</button>
            <button className="calc-button primary-container-btn" value="4" onClick={handleClick}>4</button>
            <button className="calc-button primary-container-btn" value="5" onClick={handleClick}>5</button>
            <button className="calc-button primary-container-btn" value="6" onClick={handleClick}>6</button>
            <button className="calc-button primary-btn" value="-" onClick={handleClick}>{'\u002d'}</button>
            <button className="calc-button primary-container-btn" value="1" onClick={handleClick}>1</button>
            <button className="calc-button primary-container-btn" value="2" onClick={handleClick}>2</button>
            <button className="calc-button primary-container-btn" value="3" onClick={handleClick}>3</button>
            <button className="calc-button primary-btn" value="+" onClick={handleClick}>{'\u002b'}</button>
        </section>
        <section id="bottom-btns">
            <button className="calc-button primary-container-btn" id="zero-btn" value="0" onClick={handleClick}>0</button>
            <button className="calc-button primary-container-btn" value="." onClick={handleClick}>.</button>
            <button className="calc-button primary-btn" value="=" onClick={handleSubmit}>{'\u003D'}</button>
        </section>
     </main>
    )
}