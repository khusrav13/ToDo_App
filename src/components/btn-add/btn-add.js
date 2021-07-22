import React, {Component}from 'react';
import './btn-add.css';

export default class ButtonAdd extends Component {

    render() {
        return (
            <span className="btns">
                <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => this.props.onItemAdded("Hello World")}>Add button </button>
            </span>

            
        );
    };

};