let React = require('react');

let ReactBootstrap = require('react-bootstrap');
let Nav = ReactBootstrap.Nav;
let NavItem = ReactBootstrap.NavItem;
let Navbar = ReactBootstrap.Navbar;

// top menu
let MainMenu = React.createClass({
  render() {
    return (
      <Navbar brand='Wallet' toggleNavKey={0}>
        <Nav eventKey={0}>
          <NavItem eventKey={2} href='#' onClick={this.props.onResetClick}>Reset</NavItem>
          <NavItem eventKey={3} href='https://github.com/mehl321/wallet/'>View source</NavItem>
        </Nav>
      </Navbar>
    );
  }

});

module.exports = MainMenu;