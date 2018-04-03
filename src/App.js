import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import {setSelectedColor, setBackgroundColor} from './redux/actions';
import ColorPicker from './ColorPicker';

const hexToRGBA05 = (hex) => {
    return `rgba(${parseInt(hex.substr(0, 2), 16)}, ${parseInt(hex.substr(2, 2), 16)}, ${parseInt(hex.substr(4, 2), 16)}, 0.5)`;
};

class App extends Component {
    constructor() {
        super();
        this.setSelectedColor = this.setSelectedColor.bind(this);
        this.acceptColor = this.acceptColor.bind(this);
    }
    setSelectedColor(color) {
        this.props.dispatch(setSelectedColor(color ? color.hex : null));
    }
    acceptColor() {
        this.props.dispatch(setBackgroundColor(this.props.selectedColor));
    }
    render() {
        const {backgroundColor, selectedColor} = this.props;
        return (
            <div className="App" style={{
                backgroundColor: hexToRGBA05(backgroundColor),
            }}>
                <div style={{float: 'left'}}>
                    <ColorPicker onChange={this.setSelectedColor}/><br/>
                </div>
                <button onClick={this.acceptColor} disabled={!selectedColor}>Accept</button>
            </div>
        );
    }
}

App = connect(
    ({backgroundColor, selectedColor}) => ({
        backgroundColor,
        selectedColor,
    }),
)(App);

export default App;
