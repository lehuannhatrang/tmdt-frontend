import React, {Component} from 'react';
import Header from "../../components/header/Header";

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Header user={{id : "123"}} />
        );
    }

}

export default DashBoard;