import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import Display from './components/Display';
import Footer from './components/Footer';
import Header from './components/Header';
import { content } from './components/content';

class App extends Component {
	state = {
		lastPressed: undefined,
		currentNum: '0',
		prevNum: undefined,
		operation: undefined
	};

	handleClick = (e) => {
		const { lastPressed, currentNum, prevNum, operation } = this.state;
		// console.log(e.target.innerText);
		const { innerText } = e.target;

		if (!Number.isNaN(Number(innerText))) {
			if (currentNum === '0') {
				this.setState({
					currentNum: innerText
				});
			} else {
				this.setState({
					currentNum: currentNum + innerText
				});
      }
      return;
		}

		switch (innerText) {
			case 'AC': {
				this.setState({
					currentNum: '0',
					prevNum: undefined,
					lastPressed: undefined
				});
				break;
			}

			case '.': {
				if (!currentNum.includes('.')) {
					this.setState({
						currentNum: currentNum + innerText
					});
				}
				break;
			}

			default: {
				if (!operation) {
					this.setState({
						operation: innerText,
						prevNum: currentNum,
						currentNum: 'o'
					});
				} else {
          const evaluated = eval(`${prevNum} ${operation} ${currentNum}`);
          
					this.setState({           
						operation: innerText,
            prevNum: evaluated,
            currentNum: '0'
          });
          
          if(innerText === '−'){
            this.setState({
              currentNum:evaluated
            })
          }
				}
			}
		}
	};
	render() {
		const { currentNum } = this.state;
		return (
			<div className='App'>
				<Header />
				<Display show={currentNum} />
				<div className='buttonContainer'>
					{content.map((num) => (
						<Button key={num} value={num} onClickButton={this.handleClick} />
					))}
				</div>
				{/*<Buttons key={content} values={content} onClick={this.handleClick} />*/}
				<Footer />
			</div>
		);
	}
}

export default App;
