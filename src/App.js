import { evaluate } from 'mathjs';
import React from 'react';
import './App.css';

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*', '-', '+']
const ids = {
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add'
}

class App extends React.Component {
  state = {
    lastPressed: undefined,
    calc: '0',
    operation: undefined
  }


  handleClick = (e) => {
    const { calc,  lastPressed } = this.state;
    const { innerText } = e.target;

    switch(innerText) {
      case 'AC': {
        this.setState({
          calc: '0'
        });
        break;
      }

      case '=': {
        const evaluated = evaluate(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }
      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if(!last.includes('.')) {
          this.setState({
            calc: calc+'.'
          })
        }

        break;
      }

      default: { 
        let e = undefined; 
        // check for other op
        if(ops.includes(innerText)) {
          if(ops.includes(lastPressed) && innerText !== '-') {
            // F***
            const lastNumberIdx = calc.split('').reverse()
            .findIndex(char => char !== ' ' && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = calc === '0' ? innerText : calc + innerText;
        }

        this.setState({
          calc: e
        });
      }
    }
    
    this.setState({
      lastPressed: innerText
    });
  }

  render() {
    const { currentNumber, calc } = this.state;

    return (
      <div className="calculator">

        {/* <p style={{position: 'absolute', top: 0}}>{JSON.stringify(this.state)}</p> */}
        <div id="display" 
        className="display">
          {calc}
        </div>
        <div className="nums-container">
          <button className="big-h light-grey ac" 
          onClick={this.handleClick}  
          id="clear"
          >
            AC
          </button>

          {nums.map(num => (
            <button className={`dark-grey ${num === 0 && 'big-h'}`} 
            key={num} 
            onClick={this.handleClick}
            id={ids[num]}
            >
              {num}
            </button>
          ))}
          <button className="light-grey" 
          onClick={this.handleClick} 
          id="decimal"
          >
            .
          </button> 
        </div>
        <div className="ops-container">
          {ops.map(op => (
            <button className="orange" 
            key={op} 
            onClick={this.handleClick}
            id={ids[op]}
            >
              {op}
            </button>
          ))}

          <button className="orange" 
          onClick={this.handleClick} 
          id="equals"
          >
            =
          </button>
        </div>
      </div>
    )
  }
}

export default App;





//   addToInput = val => {
//     this.setState({ input: this.state.input + val});
//   }

//   handleEqual = () => {
//     this.setState({ input: math.evaluate(this.state.input )})
//   }
  
//   render() {
//     return (
//       <div className="app">
//         <div className="calc-wrapper">
//           <Input input={this.state.input}></Input>
//           <div className="row">
//             <Button handleClick={this.addToInput}>7</Button>
//             <Button handleClick={this.addToInput}>8</Button>
//             <Button handleClick={this.addToInput}>9</Button>
//             <Button handleClick={this.addToInput}>/</Button>
//           </div>
//           <div className="row">
//             <Button handleClick={this.addToInput}>4</Button>
//             <Button handleClick={this.addToInput}>5</Button>
//             <Button handleClick={this.addToInput}>6</Button>
//             <Button handleClick={this.addToInput}>X</Button>
//           </div>
//           <div className="row">
//             <Button handleClick={this.addToInput}>1</Button>
//             <Button handleClick={this.addToInput}>2</Button>
//             <Button handleClick={this.addToInput}>3</Button>
//             <Button handleClick={this.addToInput}>+</Button>
//           </div>
//           <div className="row">
//             <Button handleClick={this.addToInput}>.</Button>
//             <Button handleClick={this.addToInput}>0</Button>
//             <Button handleClick={() => this.handleEqual()}>=</Button>
//             <Button handleClick={this.addToInput}>-</Button>
//           </div>
//           <div className="row">
//             <ClearButton handleClear={() => this.setState({ input: ""})}>
//               Clear
//             </ClearButton>
//           </div>
//         </div>
//     </div>)
//   }
// }
