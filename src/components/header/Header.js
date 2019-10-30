import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../containers/app/selectors";
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
        const displayName = this.props.user.userInfo ? this.props.user.userInfo.displayName : '';
        return (
            <header className="app-header navbar">
                <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button">
                    <span className="navbar-toggler-icon" />
                </button>
                <a className="navbar-brand" href="#" />
                <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button">
                    <span className="navbar-toggler-icon" />
                </button>
                <ul className="nav navbar-nav d-md-down-none mr-auto">

                    <li className="nav-item px-3">
                        <Link className="nav-link" to="/">Dashboard</Link>
                    </li>
                    <li className="nav-item px-3">
                        <Link className="nav-link" to="/user">Users</Link>
                    </li>
                    <li className="nav-item px-3">
                        <Link className="nav-link" to="/user/action">Activity</Link>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item px-3">
                        <Link className="nav-link" to={`/user/${this.props.user.id}`}>{displayName}</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link nav-link" data-toggle="dropdown" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <img src="/img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-header text-center">
                                <strong>Settings</strong>
                            </div>
                            <div className="divider" />
                            <a className="dropdown-item" href="#"><i className="fa fa-shield" /> Lock Account</a>
                            <Link onClick={this.handleLogout}  className="dropdown-item" to='/login'><i className="fa fa-lock" /> Logout</Link>
                        </div>
                    </li>
                </ul>
            </header>
        )

    }
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser()
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);