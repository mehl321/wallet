let React = require('react')

let classNames = require('classnames')

let {ButtonGroup, Button} = require('react-bootstrap')

// currency selection component
module.exports = React.createClass({

  propTypes: {
    onCurrencyChange: React.PropTypes.func,
    currency: React.PropTypes.string
  },

  handleClick (currency) {
    this.props.onCurrencyChange(currency)
  },

  renderCurrencyButton (currencyButton, currentCurrency) {
    let faCurrency = 'fa-' + currencyButton.toLowerCase()
    let classesCurrency = classNames('fa', 'fa-fw', faCurrency)

    return (
      <Button active={currentCurrency === currencyButton}
        href='#'
        onClick={this.handleClick.bind(this, currencyButton)}
      >
        <i className={classesCurrency}></i> {currencyButton}
      </Button>
    )
  },

  render () {
    return (
      <ButtonGroup justified>
        {this.renderCurrencyButton('GBP', this.props.currency)}
        {this.renderCurrencyButton('EUR', this.props.currency)}
        {this.renderCurrencyButton('BTC', this.props.currency)}
      </ButtonGroup>
    )
  }

})
