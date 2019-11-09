import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../containers/app/selectors";
import {connect} from "react-redux";

class RecommendItem extends Component {

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
            <div class="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                <div class="card text-center card-product">
                    <Link to={{pathname:"/info"+item.id, product_id: item.id}}>
                        <img class="card-img" src={item.images[0].url} alt=""/>
                    </Link>
                </div>
                <div class="desc">
                    <Link to={{pathname:"/info"+item.id, product_id: item.id}} class="title">{item.name}</Link>
                  <div class="price">{this.displayPrice(item.sellPrice)}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecommendItem);