let React = require('react');
let classNames = require('classnames');
let accounting = require('accounting');

// balance display component
let Balance = React.createClass({

  render() {
    let faCurrency = 'fa-' + this.props.currency.toLowerCase();
    let classesCurrency = classNames('fa', faCurrency);

    return (
      <h1 className="lead">
        Balance: <span className="smaller"><i className={classesCurrency}></i></span>&nbsp;
        {accounting.formatMoney(this.props.balance, '')}
      </h1>
    );
  }

});

module.exports = Balance;
