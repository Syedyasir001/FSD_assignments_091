import React, { Component } from 'react';

/**
 * [LAB COMPONENT 2] Class Component with State — CartCounter
 * 
 * Demonstrates:
 * 1. ES6 class extending React.Component.
 * 2. Initializing component state within the constructor.
 * 3. Method binding in constructor (increment, decrement, reset, updateStep).
 * 4. Updating state using this.setState() with previous state functional arguments.
 * 5. Calculating dynamic values (subtotal = quantity * unitPrice) and state inspection.
 */
class CartCounter extends Component {
  constructor(props) {
    super(props);

    // Initial class component state
    this.state = {
      quantity: 1,
      unitPrice: 149.99,
      itemTitle: "Pro Wireless ANC Studio Headphones",
      step: 1,
      maxLimit: 10,
      lastAction: "Cart initialized with 1 item",
      totalClicks: 0
    };

    // Explicit method bindings
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
  }

  // Increment item quantity safely respecting maximum inventory limit
  increment() {
    this.setState((prevState) => {
      const nextQty = Math.min(prevState.quantity + prevState.step, prevState.maxLimit);
      return {
        quantity: nextQty,
        lastAction: `Added +${prevState.step} item(s)`,
        totalClicks: prevState.totalClicks + 1
      };
    });
  }

  // Decrement item quantity safely respecting minimum threshold of 1
  decrement() {
    this.setState((prevState) => {
      const nextQty = Math.max(prevState.quantity - prevState.step, 1);
      return {
        quantity: nextQty,
        lastAction: `Removed -${prevState.step} item(s)`,
        totalClicks: prevState.totalClicks + 1
      };
    });
  }

  // Reset cart quantity back to 1
  reset() {
    this.setState({
      quantity: 1,
      lastAction: "Reset cart item quantity to default (1)",
      totalClicks: 0
    });
  }

  // Handle step value updates
  handleStepChange(e) {
    const val = parseInt(e.target.value, 10) || 1;
    this.setState({ step: Math.max(1, Math.min(val, 5)) });
  }

  render() {
    const { quantity, unitPrice, itemTitle, step, maxLimit, lastAction, totalClicks } = this.state;
    const subtotal = (quantity * unitPrice).toFixed(2);
    const isEven = quantity % 2 === 0;

    return (
      <div className="component-box cart-counter-component">
        <div className="cart-counter-header">
          <span className="pill-badge class-pill">Class Component (Stateful)</span>
          <h4 className="item-title">{itemTitle}</h4>
          <span className="unit-price-label">${unitPrice.toFixed(2)} each</span>
        </div>

        <div className="counter-interaction-grid">
          {/* Main Quantity Display */}
          <div className="counter-display-card">
            <span className="display-label">Selected Quantity</span>
            <div className={`counter-number ${quantity >= maxLimit ? 'limit-reached' : ''}`}>
              {quantity}
            </div>
            <div className="parity-indicator">
              Item Count is: <strong className={isEven ? 'text-even' : 'text-odd'}>{isEven ? 'EVEN' : 'ODD'}</strong>
              {isEven && <span className="bundle-perk"> (Eligible for Buy-1-Get-1 20% Bundle Perk!)</span>}
            </div>
          </div>

          {/* Subtotal Calculation Box */}
          <div className="subtotal-display-card">
            <span className="display-label">Calculated Subtotal</span>
            <div className="subtotal-amount">${subtotal}</div>
            <span className="subtotal-formula">
              {quantity} units × ${unitPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Counter Action Controls */}
        <div className="counter-controls-row">
          <button
            type="button"
            className="btn btn-qty-change btn-decrement"
            onClick={this.decrement}
            disabled={quantity <= 1}
            title="Decrease quantity"
          >
            – {step}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.reset}
            title="Reset quantity to 1"
          >
            Reset
          </button>

          <button
            type="button"
            className="btn btn-qty-change btn-increment"
            onClick={this.increment}
            disabled={quantity >= maxLimit}
            title="Increase quantity"
          >
            + {step}
          </button>
        </div>

        {/* Step Adjustment & State History */}
        <div className="counter-footer-meta">
          <div className="step-input-group">
            <label htmlFor="step-count">Batch Step (1–5): </label>
            <input
              id="step-count"
              type="number"
              min="1"
              max="5"
              value={step}
              onChange={this.handleStepChange}
              className="counter-input"
            />
          </div>

          <div className="state-history-text">
            <span>Status: <em>{lastAction}</em></span> • <span>Actions: <strong>{totalClicks}</strong></span>
          </div>
        </div>
      </div>
    );
  }
}

export default CartCounter;
