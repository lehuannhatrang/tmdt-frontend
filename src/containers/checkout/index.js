import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';

class Checkout extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.setState({
    //         products: [
    //             {
    //                 name: 'example',
    //                 price: '100.00',
    //                 quantity: '2'
    //             },
    //             {
    //                 name: 'example 2',
    //                 price: '200.00',
    //                 quantity: '2'
    //             }
    //         ]
    //     })
    // }

    render() {
        return(
            <div>
                <Header/>
                <section class="blog-banner-area" id="category">
                    <div class="container h-100">
                        <div class="blog-banner">
                            <div class="text-center">
                                <h1>Shopping Cart</h1>
                                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                        </ol>
                    </nav>
                            </div>
                        </div>
                </div>
                </section>
                <section class="checkout_area section-margin--small">
    <div class="container">
        <div class="returning_customer">
            <div class="check_title">
                <h2>Returning Customer? <a href="#">Click here to login</a></h2>
            </div>
            <p>If you have shopped with us before, please enter your details in the boxes below. If you are a new
                customer, please proceed to the Billing & Shipping section.</p>
            <form class="row contact_form" action="#" method="post" novalidate="novalidate">
                <div class="col-md-6 form-group p_star">
                    <input type="text" class="form-control" placeholder="Username or Email*" onfocus="this.placeholder=''" onblur="this.placeholder = 'Username or Email*'" id="name" name="name"/>
                </div>
                <div class="col-md-6 form-group p_star">
                    <input type="password" class="form-control" placeholder="Password*" onfocus="this.placeholder=''" onblur="this.placeholder = 'Password*'" id="password" name="password"/>
                </div>
                <div class="col-md-12 form-group">
                    <button type="submit" value="submit" class="button button-login">Login</button>
                    <div class="creat_account">
                        <input type="checkbox" id="f-option" name="selector"/>
                        <label for="f-option">Remember me</label>
                    </div>
                    <a class="lost_pass" href="#">Lost your password?</a>
                </div>
            </form>
        </div>
        <div class="cupon_area">
            <div class="check_title">
                <h2>Have a coupon? <a href="#">Click here to enter your code</a></h2>
            </div>
            <input type="text" placeholder="Enter coupon code"/>
            <a class="button button-coupon" href="#">Apply Coupon</a>
        </div>
        <div class="billing_details">
            <div class="row">
                <div class="col-lg-8">
                    <h3>Billing Details</h3>
                    <form class="row contact_form" action="#" method="post" novalidate="novalidate">
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="name" name="name" placeholder="Full name"/>
                            <span class="placeholder" data-placeholder="First name" ></span>
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="number" name="number" placeholder="Phone Number"/>
                            <span class="placeholder" data-placeholder="Phone number"></span>
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="email" name="email" placeholder="Email"/>
                            <span class="placeholder" data-placeholder="Email Address"></span>
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <select class="country_select">
                                <option value="1">Country</option>
                                <option value="2">Country</option>
                                <option value="4">Country</option>
                            </select>
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <select class="country_select">
                                <option value="1">Country</option>
                                <option value="2">Country</option>
                                <option value="4">Country</option>
                            </select>
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <select class="country_select">
                                <option value="1">Country</option>
                                <option value="2">Country</option>
                                <option value="4">Country</option>
                            </select>
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="address" name="address" placeholder="Address"/>
                            <span class="placeholder" data-placeholder="Email Address"></span>
                        </div>
                        <div class="col-md-12 form-group mb-0">
                        <textarea class="form-control" name="note" id="note" rows="1" placeholder="Notes"></textarea>
                        </div>
                        <div class="col-md-12 form-group">
                            <div class="creat_account">
                                <input type="checkbox" id="f-option2" name="selector"/>
                                <label for="f-option2">Create an account?</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-lg-4">
                    <div class="order_box">
                        <h2>Your Order</h2>
                        <ul class="list">
                            <li><a href="#"><h4>Product <span>Total</span></h4></a></li>
                            <li><a href="#">Fresh Blackberry <span class="middle">x 02</span> <span class="last">$720.00</span></a></li>
                            <li><a href="#">Fresh Tomatoes <span class="middle">x 02</span> <span class="last">$720.00</span></a></li>
                            <li><a href="#">Fresh Brocoli <span class="middle">x 02</span> <span class="last">$720.00</span></a></li>
                        </ul>
                        <ul class="list list_2">
                            <li><a href="#">Subtotal <span>$2160.00</span></a></li>
                            <li><a href="#">Shipping <span>Flat rate: $50.00</span></a></li>
                            <li><a href="#">Total <span>$2210.00</span></a></li>
                        </ul>
                        <div class="payment_item">
                            <div class="radion_btn">
                                <input type="radio" id="f-option5" name="selector"/>
                                <label for="f-option5">Check payments</label>
                                <div class="check"></div>
                            </div>
                            <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                Store Postcode.</p>
                        </div>
                        <div class="payment_item active">
                            <div class="radion_btn">
                                <input type="radio" id="f-option6" name="selector"/>
                                <label for="f-option6">Paypal </label>
                                <img src="img/product/card.jpg" alt=""/>
                                <div class="check"></div>
                            </div>
                            <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                account.</p>
                        </div>
                        <div class="creat_account">
                            <input type="checkbox" id="f-option4" name="selector"/>
                            <label for="f-option4">I’ve read and accept the </label>
                            <a href="#">terms & conditions*</a>
                        </div>
                        <div class="text-center">
                          <a class="button button-paypal" href="#">Proceed to Paypal</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);