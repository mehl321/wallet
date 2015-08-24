let React = require('react');

let ReactBootstrap = require('react-bootstrap');
let Table = ReactBootstrap.Table;

let TransactionItem = require('./TransactionItem');

// container of the transaction items
let TransactionHistory = React.createClass({

  render() {
    let transactions = this.props.transactions.map((t, i) => {
      return (
        <TransactionItem
          key={this.props.transactions.length - i - 1}
          number={this.props.transactions.length - i}
          amount={t.amount}
          currency={t.currency}
          timestamp={t.timestamp}
        >
        </TransactionItem>
      );
    });

    // if no transactions, don't display an empty HTML table
    let returnValue = false;

    if (transactions.length > 0) {
      returnValue = (
        <Table bordered>

          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions}
          </tbody>

        </Table>
      );
    }

    return returnValue;
  }

});

module.exports = TransactionHistory;
