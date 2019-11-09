import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {
    fetchProducts
} from "../app/actions";
import {
    selectProducts
} from "../app/selectors";
import Selection from "../../components/selection";
import Footer from "../../components/footer/Footer";

class Shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType : [
                {
                    value: 'PRICE',
                    label: 'Price'
                },
                {
                    value: 'POPULAR',
                    label: 'Popular'
                },
                {
                    value: 'NAME',
                    label: 'Name'
                }
            ],
            showQuantity: [
                {
                    value: '12',
                    label: 'Show 12'
                },
                {
                    value: '24',
                    label: 'Show 24'
                },
                {
                    value: '48',
                    label: 'Show 48'
                },

            ]
        }
    }

    componentDidMount() {
        this.props.fetchProducts('');
    }

    renderCardProduct(product) {
        return (
            <div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                    <div class="card-product__img">
                        <img onClick={() => this.props.history.push(`/product/${product.id}`)} 
                        class="card-img pointer" src={product.images && product.images.url ? product.images.url.includes('http') ? product.images.url : "img/product/product1.png" : "img/product/product1.png"} alt=""/>
                        <ul class="card-product__imgOverlay">
                        <li><button><i class="ti-search"></i></button></li>
                        <li><button><i class="ti-shopping-cart"></i></button></li>
                        <li><button><i class="ti-heart"></i></button></li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <p>{product.category || 'Laptop'}</p>
                        <h4 class="card-product__title"><a href="#" onClick={() => this.props.history.push(`/product/${product.id}`)}>{product.name ? product.name.length < 41 ? product.name : `${product.name.slice(0,40)}...` : ''}</a></h4>
                        <p class="card-product__price">{product.sellPrice} VND</p>
                    </div>
                </div>
            </div>
        )
    }

    renderCategoriesList() {
        return (
            <div class="sidebar-categories">
                <div class="head">Browse Categories</div>
                <ul class="main-categories">
                <li class="common-filter">
                    <form action="#">
                    <ul>
                        <li class="filter-list">
                            <input class="pixel-radio" type="radio" id="men" name="brand"/>
                            <label for="men">Men</label>
                        </li>
                        <li class="filter-list">
                            <input class="pixel-radio" type="radio" id="women" name="brand"/>
                            <label for="women">Women</label>
                        </li>
                        <li class="filter-list">
                            <input class="pixel-radio" type="radio" id="accessories" name="brand"/>
                            <label for="accessories">Accessories</label>
                        </li>
                        <li class="filter-list">
                            <input class="pixel-radio" type="radio" id="footwear" name="brand"/>    
                            <label for="footwear">Footwear</label>
                        </li>
                        <li class="filter-list">
                            <input class="pixel-radio" type="radio" id="bayItem" name="brand"/>
                            <label for="bayItem">Bay item</label>
                        </li>
                        <li class="filter-list">
                            <input class="pixel-radio" type="radio" id="electronics" name="brand"/>
                            <label for="electronics">Electronics</label>
                        </li>
                        <li class="filter-list">
                            <input class="pixel-radio" type="radio" id="food" name="brand"/>
                            <label for="food">Food</label>
                        </li>
                    </ul>
                    </form>
                </li>
                </ul>
            </div>
        )
    }

    renderProductFilters() {
        return(
            <div class="sidebar-filter">
                <div class="top-filter-head">Product Filters</div>
                <div class="common-filter">
                <div class="head">Brands</div>
                <form action="#">
                    <ul>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="apple" name="brand"/><label for="apple">Apple</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="asus" name="brand"/><label for="asus">Asus</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="gionee" name="brand"/><label for="gionee">Gionee</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="micromax" name="brand"/><label for="micromax">Micromax</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="samsung" name="brand"/><label for="samsung">Samsung</label></li>
                    </ul>
                </form>
                </div>
                <div class="common-filter">
                <div class="head">Color</div>
                <form action="#">
                    <ul>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="black" name="color"/><label for="black">Black</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="balckleather" name="color"/><label for="balckleather">Black
                        Leather</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="blackred" name="color"/><label for="blackred">Black
                        with red</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="gold" name="color"/><label for="gold">Gold</label></li>
                    <li class="filter-list"><input class="pixel-radio" type="radio" id="spacegrey" name="color"/><label for="spacegrey">Spacegrey</label></li>
                    </ul>
                </form>
                </div>
            </div>
        )
    }

    renderPopularProduct(product) {
        return (
            <div class="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                <div class="single-search-product d-flex">
                    <a href="#"><img src="img/product/product-sm-1.png" alt=""/></a>
                    <div class="desc">
                        <a href="#" class="title">{product.name ? product.name.length < 21 ? product.name : `${product.name.slice(0,20)}...` : ''}</a>
                        <div class="price">{product.sellPrice} VND</div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { products } = this.props;
        return(
            <div>
                <Header/>
                <section class="blog-banner-area" id="category">
                    <div class="container h-100">
                        <div class="blog-banner">
                            <div class="text-center">
                                <h1>Shop Category</h1>
                                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Shop Category</li>
                        </ol>
                    </nav>
                            </div>
                        </div>
                </div>
                </section>


            <section class="section-margin--small mb-5">
                <div class="container">
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-5">
                        {this.renderCategoriesList()}
                        {this.renderProductFilters()}
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-7">
                    <div class="filter-bar d-flex flex-wrap align-items-center">
                        <div class="sorting">
                            <Selection options={this.state.sortType} onChange={(value) => console.log(value)} />
                        </div>
                        <div class="sorting mr-auto">
                            <Selection options={this.state.showQuantity} onChange={value => console.log(value)}/>
                        </div>
                        <div>
                        <div class="input-group filter-bar-search">
                            <input type="text" placeholder="Search"/>
                            <div class="input-group-append">
                            <button type="button"><i class="ti-search"></i></button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <section class="lattest-product-area pb-40 category-list">
                        <div class="row">
                            {products.map(product => this.renderCardProduct(product))}
                        </div>
                    </section>
                    </div>
                </div>
                </div>
            </section>

                <section class="related-product-area">
                    <div class="container">
                        <div class="section-intro pb-60px">
                            <p>Popular Item in shop</p>
                            <h2>Top <span class="section-intro__style">Product</span></h2>
                        </div>
                        <div class="row mt-30">
                            {products.map(product => this.renderPopularProduct(product))}
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        );
    }

}

Shopping.defaultProps = {
    products: [],
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProducts: (query) => dispatch(fetchProducts(query))
    }
}

const mapStateToProps = createStructuredSelector({
    products: selectProducts()
});

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);