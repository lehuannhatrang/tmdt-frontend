import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {
    selectCurrentUser,
    selectCartProducts,
} from "../../containers/app/selectors";
import {connect} from "react-redux";

class Header extends Component {

    constructor(props) {
        super(props);
    }

    handleLogout() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        const { cartProducts } = this.props;
        const cartTotalItem = cartProducts.reduce((total, currentValue) => total + currentValue.quantity, 0)
        const displayName = this.props.user.userInfo ? this.props.user.userInfo.displayName : '';
        return (
            <header className="header_area">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container">
                        <Link className="navbar-brand logo_h" to="/"><img src="img/logo.png" alt=""/></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
<<<<<<< HEAD
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto mr-auto">
                            <li class="nav-item "><Link class="nav-link" to="/">Home</Link></li>
                            <li class="nav-item submenu dropdown">
                                <Link to="/shopping" class="nav-link">Shopping</Link>
=======
                        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                            <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item submenu dropdown">
                                <Link to="/shopping" className="nav-link">Shopping</Link>
>>>>>>> master
                            </li>
                            {/* <li className="nav-item submenu dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                aria-expanded="false">Blog</a>
                                <ul className="dropdown-menu">
                                <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>
                                <li className="nav-item"><a className="nav-link" href="single-blog.html">Blog Details</a></li>
                                </ul>
                                            </li> */}
                            {/* <li className="nav-item submenu dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                aria-expanded="false">Pages</a>
                                <ul className="dropdown-menu">
                                <li className="nav-item"><a className="nav-link" href="login.html">Login</a></li>
                                <li className="nav-item"><a className="nav-link" href="register.html">Register</a></li>
                                </ul>
                            </li> */}
                            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                            </ul>

                            <ul className="nav-shop">
                            {/* <li className="nav-item"><button><i className="ti-search"></i></button></li> */}
                            <li className="nav-item"><Link to="/cart"><button><i className="ti-shopping-cart"></i><span className="nav-shop__circle">{cartTotalItem}</span></button></Link></li>
                            <li className="nav-item"><Link className="button button-header" to="/shopping">Buy Now</Link></li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                </div>
            </header>
        )

    }
}

Header.defaultProps = {
    cartProducts: [],
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser(),
    cartProducts: selectCartProducts(),
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);