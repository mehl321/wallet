let React = require('react')

let {Table} = require('react-bootstrap')

let TransactionItem = require('./TransactionItem')

// container of the transaction items
module.exports = React.createClass({

  propTypes: {
    transactions: React.PropTypes.object
  },

  render () {
    let transactions = this.props.transactions.map((t, i) => {
      return (
        <TransactionItem
          key={i}
          number={this.props.transactions.size - i}
          amount={t.amount}
          currency={t.currency}
          timestamp={t.timestamp}
        />
      )
    })

    // if no transactions, don't display an empty HTML table
    if (transactions.size === 0) {
      return null
    }

    return (
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
    )
  }

})
