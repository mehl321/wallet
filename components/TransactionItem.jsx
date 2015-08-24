let React = require('react');

let classNames = require('classnames');
let moment = require('moment');
let accounting = require('accounting');

// display one transaction
let TransactionItem = React.createClass({

  render() {
    let typeClass;
    let faCurrency = 'fa-' + this.props.currency.toLowerCase();
    let classesCurrency = classNames('fa', faCurrency);

    if (this.props.amount > 0)
      typeClass = "success";
    else
      typeClass = "danger";

    return (
      <tr className={typeClass}>
        <td>{this.props.number}</td>
        <td>
          <i className={classesCurrency}></i> {accounting.formatMoney(this.props.amount, '')}
        </td>
        <td>{moment.unix(this.props.timestamp).format('lll')}</td>
      </tr>
    );
  }

});

module.exports = TransactionItem;
