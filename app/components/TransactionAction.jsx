let React = require('react')

let {Row, Col, Input, Button} = require('react-bootstrap')

let classNames = require('classnames')
let accounting = require('accounting')

const DEPOSIT = 'deposit'
const WITHDRAWAL = 'withdrawal'

// component to deposit or withdraw money
let TransactionAction = React.createClass({

  propTypes: {
    currency: React.PropTypes.string,
    balance: React.PropTypes.number,
    onNewTransaction: React.PropTypes.func
  },

  getInitialState () {
    return {
      depositValue: '',
      withdrawalValue: ''
    }
  },

  // check amount not null number
  // impossible to withdraw more than balance amount
  isAmountValid (amount, type) {
    let amountRegex = /^\d*(\.\d*){0,1}$/

    if (amountRegex.test(amount) && accounting.unformat(amount) > 0) {
      return type === DEPOSIT ||
        (type === WITHDRAWAL && amount <= this.props.balance)
    } else {
      return false
    }
  },

  // return 'error' if an amount has been entered but is invalid
  handleValidAmountStyling (type) {
    let typeName = type + 'Value'
    let fieldValue = this.state[typeName]

    if (fieldValue && !this.isAmountValid(fieldValue, type)) {
      return 'error'
    }
  },

  // used to submit new transaction with 'enter' key
  handleKeyboard (type, e) {
    let typeName = type + 'Value'

    if (e.key === 'Enter' && this.isAmountValid(this.state[typeName], type)) {
      this.handleNewTransaction(type)
    }
  },

  // update inputs values
  handleChange (type) {
    let refName = type + 'Input'
    let stateName = type + 'Value'
    let state = {}

    state[stateName] = this.refs[refName].getValue()

    this.setState(state)
  },

  // create transaction object
  handleNewTransaction (type) {
    let refName = type + 'Input'

    // clear inputs
    this.setState({
      depositValue: '',
      withdrawalValue: ''
    })

    let transaction = {
      timestamp: Math.floor(Date.now() / 1000)
    }

    // add negative sign for withdrawals
    let amount = accounting.unformat(this.refs[refName].getValue())
    transaction.amount = type === DEPOSIT ? amount : -1 * amount

    this.props.onNewTransaction(transaction)
  },

  render () {
    let faCurrency = 'fa-' + this.props.currency.toLowerCase()
    let classesCurrency = classNames('fa', faCurrency)

    return (
      <form>
        <Row>
          <Col xs={6}>
            <Input
              type='text'
              value={this.state.depositValue}
              bsStyle={this.handleValidAmountStyling(DEPOSIT)}
              ref='depositInput'
              addonBefore={<i className={classesCurrency}></i>}
              onChange={this.handleChange.bind(this, DEPOSIT)}
              onKeyDown={this.handleKeyboard.bind(this, DEPOSIT)}
              buttonAfter={
                <Button
                  href='#'
                  disabled={!this.isAmountValid(this.state.depositValue, DEPOSIT)}
                  onClick={this.handleNewTransaction.bind(this, DEPOSIT)}>
                  <i className='fa fa-plus text-success'></i>
                </Button>
              }
              placeholder='Deposit'
              style={{'zIndex': 10}}
            />
          </Col>

          <Col xs={6}>
            <Input
              type='text'
              value={this.state.withdrawalValue}
              bsStyle={this.handleValidAmountStyling(WITHDRAWAL)}
              ref='withdrawalInput'
              addonBefore={<i className={classesCurrency}></i>}
              onChange={this.handleChange.bind(this, WITHDRAWAL)}
              onKeyDown={this.handleKeyboard.bind(this, WITHDRAWAL)}
              buttonAfter={
                <Button
                  href='#'
                  disabled={!this.isAmountValid(this.state.withdrawalValue, WITHDRAWAL)}
                  onClick={this.handleNewTransaction.bind(this, WITHDRAWAL)}>
                  <i className='fa fa-minus text-danger'></i>
                </Button>
              }
              placeholder='Withdraw'
              style={{'zIndex': 10}}
            />
          </Col>
        </Row>
      </form>
    )
  }

})

module.exports = TransactionAction
