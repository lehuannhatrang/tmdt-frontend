import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Header/>
                
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);