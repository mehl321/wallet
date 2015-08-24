let React = require('react');

let classNames = require('classnames');
let accounting = require('accounting');

let ReactBootstrap = require('react-bootstrap');
let Grid = ReactBootstrap.Grid;
let Row = ReactBootstrap.Row;
let Col = ReactBootstrap.Col;
let Input = ReactBootstrap.Input;
let Button = ReactBootstrap.Button;

// component to deposit or withdraw money
let TransactionAction = React.createClass({

  getInitialState() {
    return {
      depositValue: '',
      withdrawalValue: '',
    };
  },

  // amount valid if number
  // impossible to withdraw more than the amount of the balance
  amountIsValid(amount, type) {
    let amountRegex = /^\d*(\.\d*){0,1}$/;

    return (amountRegex.test(amount) && type === 'deposit') ||
      (amountRegex.test(amount) && type === 'withdrawal' && amount <= this.props.balance);
  },

  // return 'error' if entered amount invalid, for UI feedback
  validationState(type) {
    let typeName = type + 'Value';
    if (this.state[typeName] && !this.amountIsValid(this.state[typeName], type)) {
      return 'error';
    }
  },

  // used to submit new transaction with 'enter' key
  handleKeyboard(type, e) {
    let typeName = type + 'Value';

    if (e.which === 13 && this.amountIsValid(this.state[typeName], type)) {
      this.handleNewTransaction(type);
    }
  },

  // update inputs values
  handleChange(type) {
    let refName = type + 'Input';
    let stateName = type + 'Value';
    let state = {};

    state[stateName] = this.refs[refName].getValue();

    this.setState(state);
  },

  // create transaction object
  handleNewTransaction(type) {
    let refName = type + 'Input';

    // clear inputs
    this.setState({
      depositValue: '',
      withdrawalValue: '',
    });

    let transaction = {
      timestamp: Math.floor(Date.now() / 1000),
    };

    // add negative sign for withdrawals
    let amount = accounting.unformat(this.refs[refName].getValue());
    transaction.amount = type === 'deposit' ? amount : -1 * amount

    this.props.onNewTransaction(transaction);
  },

  render() {
    let faCurrency = 'fa-' + this.props.currency.toLowerCase();
    let classesCurrency = classNames('fa', faCurrency);

    return (
      <form>
        <Row>
          <Col xs={6}>
            <Input
              type="text"
              value={this.state.depositValue}
              bsStyle={this.validationState('deposit')}
              ref="depositInput"
              addonBefore={<i className={classesCurrency}></i>}
              onChange={this.handleChange.bind(this, 'deposit')}
              onKeyDown={this.handleKeyboard.bind(this, 'deposit')}
              buttonAfter={
                <Button
                  href="#"
                  disabled={!this.amountIsValid(this.state.depositValue, 'deposit')}
                  onClick={this.handleNewTransaction.bind(this, 'deposit')}>
                  <i className="fa fa-plus text-success"></i>
                </Button>
              }
              placeholder="Deposit"
              style={{'zIndex': 10}}
            />
          </Col>

          <Col xs={6}>
            <Input
              type="text"
              value={this.state.withdrawalValue}
              bsStyle={this.validationState('withdrawal')}
              ref="withdrawalInput"
              addonBefore={<i className={classesCurrency}></i>}
              onChange={this.handleChange.bind(this, 'withdrawal')}
              onKeyDown={this.handleKeyboard.bind(this, 'withdrawal')}
              buttonAfter={
                <Button
                  href="#"
                  disabled={!this.amountIsValid(this.state.withdrawalValue, 'withdrawal')}
                  onClick={this.handleNewTransaction.bind(this, 'withdrawal')}>
                  <i className="fa fa-minus text-danger"></i>
                </Button>
              }
              placeholder="Withdraw"
              style={{'zIndex': 10}}
            />
          </Col>
        </Row>
      </form>
    );
  }

});

module.exports = TransactionAction;
