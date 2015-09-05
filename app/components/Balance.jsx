let React = require('react')
let classNames = require('classnames')
let accounting = require('accounting')

let style = getStyle

// balance display component
module.exports = React.createClass({

  propTypes: {
    balance: React.PropTypes.number,
    currency: React.PropTypes.string
  },

  render () {
    let faCurrency = 'fa-' + this.props.currency.toLowerCase()
    let classesCurrency = classNames('fa', faCurrency)

    return (
      <h1 className='lead'>
        Balance: <span style={style.smaller}><i className={classesCurrency}></i></span>&nbsp;
        {accounting.formatMoney(this.props.balance, '')}
      </h1>
    )
  }

})

function getStyle () {
  return {
    smaller: {
      fontSize: '0.9em'
    }
  }
}
