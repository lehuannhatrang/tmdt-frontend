import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../containers/app/selectors";
import {connect} from "react-redux";

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
        const item = this.state.item
        return (
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card text-center card-product">
                <div class="card-product__img">
                    <img class="card-img" src={item.images[0].url} alt=""/>
                    <ul class="card-product__imgOverlay">
                    <li><Link to={{pathname:"/info"+item.id, product_id: item.id}}><button><i class="ti-search"></i></button></Link></li>
                    <li><button><i class="ti-shopping-cart"></i></button></li>
                    <li><button><i class="ti-heart"></i></button></li>
                    </ul>
                </div>
                <div class="card-body">
                    <p>{item.category}</p>
                    <h4 class="card-product__title">
                        <Link to={{pathname:"/info"+item.id, product_id: item.id}}>{item.name}
                        </Link>
                    </h4>
                    <p class="card-product__price">{this.displayPrice(item.sellPrice)}</p>
                </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser()
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Item);