import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import { selectCartProducts } from '../app/selectors';

class Cart extends Component {
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
        const { cartProducts } = this.props;
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
            
            

            <section class="cart_area">
                <div class="container">
                    <div class="cart_inner">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartProducts.map(product => {
                                        return(
                                        <tr>
                                            <td>
                                                <div class="media">
                                                    <div class="d-flex">
                                                        <img src="img/cart/cart1.png" alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <p>{product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>${product.price}</h5>
                                            </td>
                                            <td>
                                                <div class="product_count">
                                                    <input type="text" name="qty" id="sst" maxlength="12" value={product.quantity} title="Quantity:"
                                                        class="input-text qty"/>
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                                                        class="increase items-count" type="button"><i class="lnr lnr-chevron-up"></i></button>
                                                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) &amp;&amp; sst > 0 ) result.value--;return false;"
                                                        class="reduced items-count" type="button"><i class="lnr lnr-chevron-down"></i></button>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>${product.price*product.quantity}</h5>
                                            </td>
                                        </tr>
                                            
                                        )
                                    })}
                                    {cartProducts.length === 0 && <thead>
                                    <tr>
                                        <th scope="col">No item</th> </tr> </thead>}
                                    
                                    {/* <tr class="bottom_button">
                                        <td>
                                            <a class="button" href="#">Update Cart</a>
                                        </td>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <div class="cupon_text d-flex align-items-center">
                                                <input type="text" placeholder="Coupon Code"/>
                                                <a class="primary-btn" href="#">Apply</a>
                                            </div>
                                        </td>
                                    </tr> */}
                                    <tr>
                                        <td>

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <h5>Subtotal</h5>
                                        </td>
                                        <td>
                                            <h5>${cartProducts.reduce((a, b) => {
                                                return a + b.price*b.quantity;
                                            }, 0)}</h5>
                                        </td>
                                    </tr>
                                    
                                    <tr class="out_button_area">
                                        <td class="d-none-l">

                                        </td>
                                        <td class="">

                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <div class="checkout_btn_inner d-flex align-items-center">
                                                <a class="gray_btn" href="#">Back</a>
                                                <a class="primary-btn ml-2" href="#">Proceed to checkout</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }

}

Cart.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);