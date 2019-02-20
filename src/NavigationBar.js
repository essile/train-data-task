import React, { Component } from 'react';
import { Navbar, NavbarBrand, } from 'reactstrap';

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className='navBar' style={{backgroundColor:'#58a618'}} dark expand="md">
                    <NavbarBrand href="/">Aseman junatiedot</NavbarBrand>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;