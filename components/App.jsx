let React = require('react');
let Immutable= require('immutable');
let fx = require('money');

let MainMenu = require('./MainMenu');
let CurrencySelection = require('./CurrencySelection');
let Balance = require('./Balance');
let TransactionAction = require('./TransactionAction');
let TransactionHistory = require('./TransactionHistory');

fx.base = 'GBP';
fx.rates = {
  'BTC': 0.0073,
  'EUR': 1.36,
}

// the App component contains all the other components
let App = React.createClass({

  getInitialState() {

    let transactions = localStorage.transactions ?
      Immutable.List(JSON.parse(localStorage.transactions)) :
      Immutable.List();

    let currency = localStorage.currency ? JSON.parse(localStorage.currency) : 'GBP';
    let balance = this.getNewBalance(transactions, currency);

    return {
      currency: currency,
      transactions: transactions,
      balance: balance,
    };
  },

  // update local storage when currency, balance or transactions change
  componentWillUpdate(nextProps, nextState) {
    if (localStorage.currency !== nextState.currency) {
      localStorage.currency = JSON.stringify(nextState.currency);
    }

    if (localStorage.transactions !== nextState.transactions) {
      localStorage.transactions = JSON.stringify(nextState.transactions.toJS());
    }

    if (localStorage.balance !== nextState.balance) {
      localStorage.balance = JSON.stringify(nextState.balance);
    }
  },

  // reset everything
  handleReset() {
    localStorage.clear();
    this.setState(this.getInitialState());
  },

  // update currency state and recalculate the balance
  handleCurrencyChange(currency) {
    let balance = this.getNewBalance(this.state.transactions, currency);

    this.setState({
      currency: currency,
      balance: balance,
    });
  },

  // add and save new transaction
  // recalculate balance
  handleNewTransaction(transaction) {
    transaction.currency = this.state.currency;

    let transacs = this.state.transactions.unshift(transaction);

    let balance = this.getNewBalance(transacs, this.state.currency);

    this.setState({
      transactions: transacs,
      balance: balance,
    });
  },

  // return recalculated balance
  getNewBalance(transactions, currency) {
    let balance = 0;

    transactions.forEach((t) => {
      balance += fx.convert(
        t.amount,
        {from: t.currency, to: currency}
      );
    });

    return balance;
  },

  render() {
    return (
      <div>
        <MainMenu onResetClick={this.handleReset}></MainMenu>

        <div className="main-wrapper container">
          <CurrencySelection currency={this.state.currency} onCurrencyChange={this.handleCurrencyChange}>
          </CurrencySelection>

          <Balance currency={this.state.currency} balance={this.state.balance}></Balance>

          <TransactionAction
            currency={this.state.currency}
            balance={this.state.balance}
            onNewTransaction={this.handleNewTransaction}
          >
          </TransactionAction>

          <TransactionHistory currency={this.state.currency} transactions={this.state.transactions}>
          </TransactionHistory>
        </div>
      </div>
    );
  }

});

module.exports = App;
