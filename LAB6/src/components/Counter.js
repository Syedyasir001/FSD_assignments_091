import React, { Component } from 'react';

// Class component demonstrating state in React
class Counter extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      count: 0
    };
  }

  // Increment handler
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Decrement handler
  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  // Reset handler
  handleReset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="card counter-box">
        <p>Cart Items Counter: <strong className="count-display">{this.state.count}</strong></p>
        <div className="button-group">
          <button onClick={this.handleDecrement} className="btn btn-outline">–</button>
          <button onClick={this.handleReset} className="btn btn-outline">Reset</button>
          <button onClick={this.handleIncrement} className="btn btn-primary">+</button>
        </div>
      </div>
    );
  }
}

export default Counter;
