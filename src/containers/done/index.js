import React, { Component } from 'react';
import Header from "../../components/header/Header";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from '../../components/footer/Footer';

class Done extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
        this.setLoading = this.setLoading.bind(this);
        this.setLoading();
    }

    componentDidMount() {
        this.setState({
        });
    }

    setLoading() {
        setInterval(() => {
            if (this.state.loading) this.setState({ loading: false })
        }, 4000)
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                <Header />
                <div class="text-center" style={styles.checked_done}>
                    {loading && <i class="fa fa-cog fa-spin text-muted" ></i>}
                    {!loading && <i class="fa fa-check-circle text-primary"  aria-hidden="true"></i>}
                    <div class="checkout_btn_inner d-flex align-items-center">
                        <Link class={`primary-btn ml-2 ${loading ? "text-muted" : "text-primary"}`} to="/">Continue shopping</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

const styles = {
    checked_done: {
        minHeight:500,
        fontSize: 50,
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    }
}

export default connect()(Done);