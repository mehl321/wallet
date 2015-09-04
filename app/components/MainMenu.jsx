let React = require('react')

let {Navbar, Nav, NavItem} = require('react-bootstrap')

// top menu
module.exports = React.createClass({

  propTypes: {
    onResetClick: React.PropTypes.func
  },

  render () {
    return (
      <Navbar brand='Wallet' toggleNavKey={0}>
        <Nav eventKey={0}>
          <NavItem eventKey={2} href='#' onClick={this.props.onResetClick}>Reset</NavItem>
          <NavItem eventKey={3} href='https://github.com/mehl321/wallet.git'>View source</NavItem>
        </Nav>
      </Navbar>
    )
  }

})
