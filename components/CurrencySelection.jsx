let React = require('react');

let ReactBootstrap = require('react-bootstrap');
let ButtonGroup = ReactBootstrap.ButtonGroup;
let Button = ReactBootstrap.Button;

// currency selection component
let CurrencySelection = React.createClass({

  handleClick(currency) {
    this.props.onCurrencyChange(currency);
  },

  render() {
    // TODO: Create a CurrencySelector component

    return (
      <ButtonGroup justified>
        <Button active={this.props.currency === 'GBP'}
          href='#'
          onClick={this.handleClick.bind(this, 'GBP')}
        >
          <i className="fa fa-gbp fa-fw"></i> GBP
        </Button>

        <Button active={this.props.currency === 'EUR'}
          href='#'
          onClick={this.handleClick.bind(this, 'EUR')}
        >
          <i className="fa fa-eur fa-fw"></i> EUR
        </Button>

        <Button active={this.props.currency === 'BTC'}
          href='#'
          onClick={this.handleClick.bind(this, 'BTC')}
        >
          <i className="fa fa-btc fa-fw"></i> BTC
        </Button>
      </ButtonGroup>
    );
  }

});

module.exports = CurrencySelection;
