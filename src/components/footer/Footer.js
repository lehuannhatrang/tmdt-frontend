import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../containers/app/selectors";
import {connect} from "react-redux";

class Footer extends Component {

    constructor(props) {
        super(props);
    }

    handleLogout() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        // const displayName = this.props.user.userInfo ? this.props.user.userInfo.displayName : '';
        return (
            <footer class="footer mt-4">
                <div class="footer-area">
                    <div class="container">
                        <div class="row section_gap">
                            <div class="col-lg-3 col-md-6 col-sm-6">
                                <div class="single-footer-widget tp_widgets">
                                    <h4 class="footer_title large_title">Our Mission</h4>
                                    <p>
                                        So seed seed green that winged cattle in. Gathering thing made fly you're no 
                                        divided deep moved us lan Gathering thing us land years living.
                                    </p>
                                    <p>
                                        So seed seed green that winged cattle in. Gathering thing made fly you're no divided deep moved 
                                    </p>
                                </div>
                            </div>
                            <div class="offset-lg-1 col-lg-2 col-md-6 col-sm-6">
                                <div class="single-footer-widget tp_widgets">
                                    <h4 class="footer_title">Quick Links</h4>
                                    <ul class="list">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/shopping">Shop</a></li>
                                        <li><a href="/contact">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-6">
                                <div class="single-footer-widget instafeed">
                                    <h4 class="footer_title">Gallery</h4>
                                    <ul class="list instafeed d-flex flex-wrap">
                                        <li><img src="img/gallery/1.jpg" alt=""/></li>
                                        <li><img src="img/gallery/2.jpg" alt=""/></li>
                                        <li><img src="img/gallery/3.jpg" alt=""/></li>
                                        <li><img src="img/gallery/4.jpg" alt=""/></li>
                                        <li><img src="img/gallery/5.jpg" alt=""/></li>
                                        <li><img src="img/gallery/6.jpg" alt=""/></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="offset-lg-1 col-lg-3 col-md-6 col-sm-6">
                                <div class="single-footer-widget tp_widgets">
                                    <h4 class="footer_title">Contact Us</h4>
                                    <div class="ml-40">
                                        <p class="sm-head">
                                            <span class="fa fa-location-arrow"></span>
                                            Vi Tinh Vui
                                        </p>
                                        <p>268 Ly Thuong Kiet, District 10, Ho Chi Minh City</p>
            
                                        <p class="sm-head">
                                            <span class="fa fa-phone"></span>
                                            Phone Number
                                        </p>
                                        <p>
                                            +84 000000000 <br/>
                                            +84 111111111
                                        </p>
            
                                        <p class="sm-head">
                                            <span class="fa fa-envelope"></span>
                                            Email
                                        </p>
                                        <p>
                                            pdt@hcmut.edu.vn <br/>
                                            www.hcmut.edu.vn                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="container">
                        <div class="row d-flex">
                            <p class="col-lg-12 footer-text text-center">
        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
        </p>
                        </div>
                    </div>
                </div>
            </footer>
        )

    }
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser()
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer);