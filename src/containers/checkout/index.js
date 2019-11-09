import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import { selectCartProducts } from '../app/selectors';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartProducts: [],
        }
    }

    componentDidMount() {
        this.setState({
            cartProducts: [
                {
                    name: 'example',
                    price: '100.00',
                    quantity: '2'
                },
                {
                    name: 'example 2',
                    price: '200.00',
                    quantity: '2'
                }
            ]
        })
    }

    render() {
        const { cartProducts } = this.state;
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
                                    <li><a href="#">{product.name} <span class="middle">x{product.quantity}</span> <span class="last">${product.price*product.quantity}</span></a></li>
                                )
                            })
                            }
                            {cartProducts.length === 0 && <label>No item</label>}
                        </ul>
                            <ul class="list list_2">
                                <li><a href="#">Total <span>${cartProducts.reduce((a, b) => {
                                    return a + b.price * b.quantity;
                                }, 0)}</span></a></li>
                            </ul>
                        
                        <div class="text-center">
                          <a class="button button-paypal" href="#">Order</a>
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
    cartProducts : selectCartProducts(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);