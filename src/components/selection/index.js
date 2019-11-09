import React, {Component} from 'react';

class Selection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { options } = this.props;
        return (
            <select class="custom-select" onChange={e => this.props.onChange(e.target.value)}>
                {options.map(option => (
                    <option value={option.value}>{option.label|| ''}</option>
                ))}
            </select>
        )
    }
}

Selection.defaultProps = {
    options: [],
}

export default Selection;