import React, {Component} from 'react';

class Selection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { options } = this.props;
        return (
            <select>
                {options.map(option => (
                    <option value={option.value} onClick={() => console.log(option.value)}>{option.label|| ''}</option>
                ))}
            </select>
        )
    }
}

Selection.defaultProps = {
    options: [],
}

export default Selection;