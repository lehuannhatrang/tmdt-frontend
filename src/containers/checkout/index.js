import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {createStructuredSelector} from 'reselect';
import {
    selectCartProducts,
} from "../app/selectors"
import { convertNumberToVND } from "../../helper/convertVND";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartProducts: [],
        }
    }

    displayPrice(price) {
        return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "đ";
    }

    componentDidMount() {
        this.setState({
            cartProducts: []
        })
    }

    render() {
        const { cartProducts } = this.props;
        console.log(cartProducts)
        return(
            <div>
                <Header/>
                <section class="blog-banner-area" id="category">
                    <div class="container h-100">
                        <div class="blog-banner">
                            <div class="text-center">
                                <h1>Product Checkout</h1>
                                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                        </ol>
                    </nav>
                            </div>
                        </div>
                </div>
                </section>
                <section class="checkout_area section-margin--small">
    <div class="container">
        <div class="billing_details">
            <div class="row">
                <div class="col-lg-8">
                    <h3>Billing Details</h3>
                    <form class="row contact_form" action="#" method="post" novalidate="novalidate">
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="Fname" name="Fname" placeholder="First name"/>
                            <span class="placeholder" data-placeholder="First name" ></span>
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="Lname" name="Lname" placeholder="Last name"/>
                            <span class="placeholder" data-placeholder="Last name" ></span>
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="number" name="number" placeholder="Phone Number"/>
                            <span class="placeholder" data-placeholder="Phone number"></span>
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="email" name="email" placeholder="Email"/>
                            <span class="placeholder" data-placeholder="Email Address"></span>
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <input type="text" class="form-control" id="address" name="address" placeholder="Address"/>
                            <span class="placeholder" data-placeholder="Email Address"></span>
                        </div>
                        <div class="col-md-12 form-group mb-0">
                        <textarea class="form-control" name="note" id="note" rows="1" placeholder="Notes"></textarea>
                        </div>
                    </form>
                </div>
                <div class="col-lg-4">
                    <div class="order_box">
                        <h2>Your Order</h2>
                        <ul class="list">
                            <li><a href="#"><h4>Product <span>Total</span></h4></a></li>
                            {cartProducts.map(product => {
                                return(
                                    <div class="row">
                                        <div class="col-md-6 form-group p_star"><p>{product.name}</p></div>
                                        <div class="col-md-2 form-group p_star"><span class="middle">x{product.quantity}</span></div>
                                        <div class="col-md-4 form-group p_star text-right"><span class="last">{convertNumberToVND(product.sellPrice*product.quantity)} VND</span></div>
                                    </div>
                                    // <li><a href="#">{product.name} <span class="middle">x{product.quantity}</span> <span class="last">{convertNumberToVND(product.sellPrice*product.quantity)} VND</span></a></li>
                                )
                            })
                            }
                            {cartProducts.length === 0 && <label>No item</label>}
                        </ul>
                            <ul class="list list_2">
                                <li><a href="#">Total <span>{convertNumberToVND(cartProducts.reduce((a, b) => {
                                    return a + b.sellPrice * b.quantity;
                                }, 0))} VND</span></a></li>
                            </ul>
                        
                        <div class="text-center">
                          <Link class="button button-paypal" to="/done">Order</Link>
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

Checkout.defaultProps = {
    cartProducts: [],
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

const mapStateToProps = createStructuredSelector({
    cartProducts: selectCartProducts(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);