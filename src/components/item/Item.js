import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../containers/app/selectors";
import {connect} from "react-redux";
import {  addToCart } from "../../containers/app/actions";
import { convertNumberToVND } from "../../helper/convertVND";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        }
        this.displayPrice = this.displayPrice.bind(this);
    }

    displayPrice(price) {
        return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "đ";
    }

    render() {
        const item = this.state.item;
        return (
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card text-center card-product">
                    <div class="card-product__img" style={{height: 254}}>
                        <img onClick={() => location.pathname = `/product/${item.id}`} 
                        class="card-img pointer" src={item.images ? item.images[0].url.includes('http') ? item.images[0].url : "img/product/product1.png" : "img/product/product1.png"} alt=""/>
                        <ul class="card-product__imgOverlay">
                        {/* <li><button><i class="ti-search"></i></button></li> */}
                        <li><button onClick={() => this.props.addToCart(item)}><i class="ti-shopping-cart"></i></button></li>
                        {/* <li><button><i class="ti-heart"></i></button></li> */}
                        </ul>
                    </div>
                    <div class="card-body">
                        <p>{item.category.name || 'Laptop'}</p>
                        <h4 class="card-product__title"><Link href="#" to={`/product/${item.id}`}>{item.name ? item.name.length < 41 ? item.name : `${item.name.slice(0,40)}...` : ''}</Link></h4>
                        <p class="card-product__price">{convertNumberToVND(item.sellPrice)} VND</p>
                    </div>
                </div>
            </div>
            // <div class="col-md-6 col-lg-4 col-xl-3">
            //     <div class="card text-center card-product">
            //     <div class="card-product__img">
            //         <img class="card-img" src={item.images[0].url} alt=""/>
            //         <ul class="card-product__imgOverlay">
            //             <li><Link to={{pathname:"/info"+item.id, product_id: item.id}}><button><i class="ti-search"></i></button></Link></li>
            //             <li><button><i class="ti-shopping-cart"></i></button></li>
            //             <li><button><i class="ti-heart"></i></button></li>
            //         </ul>
            //     </div>
            //     <div class="card-body">
            //         <p>{item.category.name}</p>
            //         <h4 class="card-product__title">
            //             <Link to={{pathname:"/info"+item.id, product_id: item.id}}>{item.name}
            //             </Link>
            //         </h4>
            //         <p class="card-product__price">{this.displayPrice(item.sellPrice)}</p>
            //     </div>
            //     </div>
            // </div>
        )

    }
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser()
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (product) => dispatch(addToCart(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item);