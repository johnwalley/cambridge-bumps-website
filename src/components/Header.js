import React from 'react';
import Link from 'gatsby-link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.45rem;
  margin-bottom: 0;
`;

const StyledNavBar = styled(Navbar)`
  background-color: rgb(145, 185, 164);
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
`;

const HeaderLink = styled.h2`
  font-size: 1.0rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0;
`;

const ChartLink = styled.span`
  font-family: Oswald, sans-serif;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <StyledNavBar dark expand="md">
          <NavbarBrand tag={Link} to="/">
            <Title>Cambridge Bumps</Title>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/about/">
                  <HeaderLink>How Bumps Works</HeaderLink>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/posters/">
                  <HeaderLink>Posters</HeaderLink>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <HeaderLink>
                  <DropdownToggle nav caret>
                    Latest Results
                  </DropdownToggle>
                </HeaderLink>
                <DropdownMenu right>
                  {this.props.data.allResultsJson.edges.map(({ node }) => (
                    <DropdownItem key={node.fields.slug}>
                      <Link to={'/latest/' + node.fields.slug}>
                        <ChartLink>{node.fields.slug}</ChartLink>
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <HeaderLink>
                  <DropdownToggle nav caret>
                    Historical Charts
                  </DropdownToggle>
                </HeaderLink>
                <DropdownMenu right>
                  {this.props.data.allResultsJson.edges.map(({ node }) => (
                    <DropdownItem key={node.fields.slug}>
                      <Link to={'/history/' + node.fields.slug}>
                        <ChartLink>{node.fields.slug}</ChartLink>
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </StyledNavBar>
      </div>
    );
  }
}

export default Header;
