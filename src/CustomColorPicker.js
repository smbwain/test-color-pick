import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CustomColorPicker.css';

const Highlight = ({str, substr}) => {
    const pos = str.indexOf(substr);
    if (pos === -1) {
        return str;
    }
    return (
        <span>
            {str.substr(0, pos)}
            <b>
                {str.substr(pos, substr.length)}
            </b>
            {str.substr(pos+substr.length)}
        </span>
    );
};

class CustomColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            selectedIndex: -1,
            showSuggestionList: false,
            suggestedColors: [],
        };
        this.options = {};
        this.inputKeyDown = this.inputKeyDown.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    selectColor(color) {
        this.setState({
            value: color.name,
            showSuggestionList: false,
            suggestedColors: this.calcSuggestions(color.name),
            selectedIndex: -1,
        }, () => {
            this.input && this.input.focus();
            if (this.props.onChange) {
                this.props.onChange(color);
            }
        });
    }
    calcSuggestions(value) {
        return this.props.colors.filter(color => color.name.indexOf(value) !== -1);
    }
    makeOptionVisibleScroll(top) {
        const color = this.state.suggestedColors[this.state.selectedIndex];
        const option = color && this.options[color.name];
        if (option && this.optionsContainer && (
            (option.offsetTop + option.offsetHeight > this.optionsContainer.scrollTop + this.optionsContainer.clientHeight) ||
            (option.offsetTop < this.optionsContainer.scrollTop)
        )) {
            option.scrollIntoView(top);
        }
    }
    inputChange(event) {
        const newValue = event.target.value;
        this.setState({
            value: newValue,
            showSuggestionList: true,
            suggestedColors: this.calcSuggestions(newValue),
            selectedIndex: -1,
        });
        if (this.props.onChange) {
            this.props.onChange( this.props.colors.find(color => color.name === newValue) );
        }
    }
    inputKeyDown(event) {
        const {selectedIndex, suggestedColors} = this.state;
        if (event.key === 'ArrowDown') {
            if (selectedIndex < suggestedColors.length-1) {
                this.setState({
                    selectedIndex: selectedIndex + 1,
                }, () => {
                    this.makeOptionVisibleScroll(false);
                });
            }
        } else if (event.key === 'ArrowUp') {
            if (selectedIndex > 0) {
                this.setState({
                    selectedIndex: selectedIndex - 1,
                }, () => {
                    this.makeOptionVisibleScroll(true);
                });
            }
        } else if (event.key === 'Enter' && selectedIndex !== -1) {
            this.selectColor(suggestedColors[selectedIndex]);
        } else {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    render() {
        const {value, selectedIndex, showSuggestionList, suggestedColors} = this.state;
        return (
            <div className="custom-color-picker">
                <input
                    value={value}
                    onChange={this.inputChange}
                    onKeyDown={this.inputKeyDown}
                    onFocus={() => {
                        this.setState({
                            showSuggestionList: true,
                        });
                    }}
                    onBlur={() => {
                        this.setState({
                            showSuggestionList: false,
                        });
                    }}
                    ref={input => this.input = input}
                />
                { showSuggestionList && !!suggestedColors.length && value.length > 1 && (
                    <ul
                        className="suggestions-list"
                        onMouseLeave={() => {
                            this.setState({
                                selectedIndex: -1,
                            });
                        }}
                        ref={el => {
                            this.optionsContainer = el;
                        }}
                    >
                        { suggestedColors.map((color, i) => (
                            <li
                                key={color.name}
                                style={{
                                    backgroundColor: i === selectedIndex ? '#cacaca' : 'white'
                                }}
                                onMouseDown={() => {
                                    this.selectColor(color);
                                }}
                                onMouseEnter={() => {
                                    this.setState({
                                        selectedIndex: i,
                                    });
                                }}
                                ref={option => {
                                    this.options[color.name] = option;
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: `#${color.hex}`,
                                    }}
                                />
                                <Highlight str={color.name} substr={value}/>
                            </li>
                        )) }
                    </ul>
                ) }
            </div>
        );
    }
}

CustomColorPicker.propTypes = {
    onChange: PropTypes.func,
    colors: PropTypes.arrayOf(PropTypes.shape({
        hex: PropTypes.string,
        name: PropTypes.string,
    })).isRequired
};

export default CustomColorPicker;
