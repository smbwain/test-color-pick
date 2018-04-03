import React, { Component } from 'react';
import CustomColorPicker from './CustomColorPicker';
import PropTypes from "prop-types";

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: null,
        };
    }
    componentDidMount() {
        fetch('http://www.mocky.io/v2/5a37a7403200000f10eb6a2d').then(response => response.json()).then(colors => {
            this.setState({
                colors,
            });
        });
    }
    render() {
        const {colors} = this.state;
        if (!colors) {
            return (
                <div>Loading</div>
            );
        }
        return (
            <CustomColorPicker colors={colors} {...this.props}/>
        );
    }
}

ColorPicker.propTypes = {
    onChange: PropTypes.func,
};

export default ColorPicker;
