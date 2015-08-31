let React = require('react');

let classNames = require('classnames');

let ReactBootstrap = require('react-bootstrap');
let ButtonGroup = ReactBootstrap.ButtonGroup;
let Button = ReactBootstrap.Button;

// currency selection component
let CurrencySelection = React.createClass({

  handleClick(currency) {
    this.props.onCurrencyChange(currency);
  },

  renderCurrencyButton(currencyButton, currentCurrency) {
    let faCurrency = 'fa-' + currencyButton.toLowerCase();
    let classesCurrency = classNames('fa', 'fa-fw', faCurrency);

    return(
      <Button active={currentCurrency === currencyButton}
        href='#'
        onClick={this.handleClick.bind(this, currencyButton)}
      >
        <i className={classesCurrency}></i> {currencyButton}
      </Button>
    );
  },

  render() {
    return (
      <ButtonGroup justified>
        {this.renderCurrencyButton('GBP', this.props.currency)}
        {this.renderCurrencyButton('EUR', this.props.currency)}
        {this.renderCurrencyButton('BTC', this.props.currency)}
      </ButtonGroup>
    );
  }

});

module.exports = CurrencySelection;
