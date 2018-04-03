import React from 'react';
import CustomColorPicker from './CustomColorPicker';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('color-picker', () => {

    let colorPicker;
    let currentColor = undefined;

    it('renders without crashing', () => {
        const colors = [{
            name: 'black',
            hex: '#000',
        }, {
            name: 'brown',
            hex: '#5f4611',
        }, {
            name: 'red',
            hex: '#f00',
        }, {
            name: 'lightred',
            hex: '#f96063',
        }, {
            name: 'white',
            hex: '#fff',
        }];

        const onChange = (newColor) => {
            currentColor = newColor;
        };
        colorPicker = mount(<CustomColorPicker colors={colors} onChange={onChange}/>);

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('works after 1st symbol typed', () => {
        colorPicker.find('input').simulate('change', {
            target: {
                value: 'r',
            },
        });

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('shows list 2nd symbol typed', () => {
        colorPicker.find('input').simulate('change', {
            target: {
                value: 're',
            },
        });

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('highlight option after mouse entered', () => {
        colorPicker.find('li').last().simulate('mouseenter');

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('hide option highlighting after mouse left', () => {
        colorPicker.find('ul').simulate('mouseleave');

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('selects color after click on suggested option', () => {
        colorPicker.find('li').last().simulate('mousedown');
        colorPicker.find('input').simulate('blur');

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('deselects color after start writing', () => {
        colorPicker.find('input').simulate('change', {
            target: {
                value: 're',
            },
        });

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('selects color after true name of the color was typed', () => {
        colorPicker.find('input').simulate('change', {
            target: {
                value: 'red',
            },
        });

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('highlights color after click on arrowdown key', () => {
        colorPicker.find('input').simulate('change', {
            target: {
                value: 're',
            },
        });
        colorPicker.find('input').simulate('keydown', {
            key: 'ArrowDown',
        });

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });

    it('selects color after click on enter key', () => {
        colorPicker.find('input').simulate('keydown', {
            key: 'Enter',
        });

        expect(colorPicker.state()).toMatchSnapshot();
        expect(toJson(colorPicker)).toMatchSnapshot();
        expect(currentColor).toMatchSnapshot();
    });
});