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
            <header class="header_area">
                <div class="main_menu">
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <div class="container">
                        <Link class="navbar-brand logo_h" to="/"><img src="img/logo.png" alt=""/></Link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto mr-auto">
                            <li class="nav-item active"><Link class="nav-link" to="/">Home</Link></li>
                            <li class="nav-item submenu dropdown">
                                <Link to="/shopping" class="nav-link">Shopping</Link>
                            </li>
                            {/* <li class="nav-item submenu dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                aria-expanded="false">Blog</a>
                                <ul class="dropdown-menu">
                                <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                                <li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
                                </ul>
                                            </li> */}
                            {/* <li class="nav-item submenu dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                aria-expanded="false">Pages</a>
                                <ul class="dropdown-menu">
                                <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                                <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
                                </ul>
                            </li> */}
                            <li class="nav-item"><Link class="nav-link" to="/contact">Contact</Link></li>
                            </ul>

                            <ul class="nav-shop">
                            {/* <li class="nav-item"><button><i class="ti-search"></i></button></li> */}
                            <li class="nav-item"><Link to="/cart"><button><i class="ti-shopping-cart"></i><span class="nav-shop__circle">{cartTotalItem}</span></button></Link></li>
                            <li class="nav-item"><Link class="button button-header" to="/shopping">Buy Now</Link></li>
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