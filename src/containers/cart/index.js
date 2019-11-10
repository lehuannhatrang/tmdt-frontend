import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {createStructuredSelector} from 'reselect';
import { selectCartProducts } from '../app/selectors';
import {
    addToCart, removeFromCart
} from "../app/actions";
import { convertNumberToVND } from '../../helper/convertVND';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cartProducts: [],
        }
    }

    handleChange(id, event) {
        var temp_arr = [...this.state.cartProducts]
        for (var i=0; i<temp_arr.length;i++ ){
            if (temp_arr[i].id === id){
                temp_arr[i].quantity = event.target.value
            }
        }
        this.setState({
            cartProducts: temp_arr
        })
      }

    componentDidMount() {
        this.setState({
            cartProducts: [
                {
                    id: "1",
                    name: 'example',
                    price: '100.00',
                    quantity: '2'
                },
                {
                    id: "2",
                    name: 'example 2',
                    price: '200.00',
                    quantity: '2'
                }
            ]
        })
    }

    render() {
        const { cartProducts } = this.props;
        console.log(cartProducts)
        const totalPrice = cartProducts.reduce((a, b) => {
            return a + b.sellPrice*b.quantity;
        }, 0)
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
                        <li class="breadcrumb-item"><Link to="#">Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                        </ol>
                    </nav>
                            </div>
                        </div>
                </div>
                </section>
            
            {cartProducts.length === 0 && 
            <div className="text-center mt-4">
                <h4>No Item Found</h4>
                <a class="gray_btn mt-2" href="/shopping">Back to shop</a>

            </div>
            }

            {cartProducts.length > 0 && <section class="cart_area">
                <div class="container">
                    <div class="cart_inner">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price/Unit</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartProducts.map(product => {
                                        return(
                                        <tr key={product.id}>
                                            <td>
                                                <div class="media">
                                                    <div class="d-flex" style={{maxWidth: 180}}>
                                                        <img style={{height: '100%', width: '100%'}} src={product.images ? product.images[0].url : 'img/cart/cart1.png'} alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <p>{product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>{convertNumberToVND(product.sellPrice)} VND</h5>
                                            </td>
                                            <td>
                                                <div class="product_count">
                                                    <input type="text" name="qty" id="sst" maxlength="12" value={product.quantity} title="Quantity:"
                                                        class="input-text qty"/>
                                                    <button onClick={() => this.props.addToCart(product)}
                                                        class="increase items-count" type="button"><i class="fa fa-chevron-up"></i></button>
                                                    <button onClick={() => this.props.removeFromCart(product.id)}
                                                        class="reduced items-count" type="button"><i class="fa fa-chevron-down"></i></button>
                                                </div>
                                            </td>
                                            <td>
                                                <h5>{convertNumberToVND(product.sellPrice*product.quantity)} VND</h5>
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
                                            <h5>
                                                {convertNumberToVND(totalPrice)} VND
                                            </h5>
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
                                                <a class="gray_btn" href="/shopping">Back</a>
                                                <a class="primary-btn ml-2" href="/checkout">Proceed to checkout</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>}
            </div>
        );
    }

}

Cart.defaultProps = {
    cartProducts: [],
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product)),
        removeFromCart: (productId) => dispatch(removeFromCart(productId))
    }
}

const mapStateToProps = createStructuredSelector({
    cartProducts : selectCartProducts(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);