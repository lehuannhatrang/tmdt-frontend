import React, {Component} from 'react';
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import Axios from 'axios';
import HttpUtils from '../../utils/http.util'
import $ from "jquery";

const SERVER_URL = "https://vitinhvui.herokuapp.com"

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trending_list: [],
            best_seller_list: [],
        }
    }

    componentDidMount() {
        // Get trending product list
        // Axios.get(SERVER_URL + '/api/products')
        //   .then(res => {
        //     this.setState({
        //         trending_list: res.data.data
        //     });
        //   })

        // Get best seller product list
        // Axios.get(SERVER_URL + '/api/products')
        //   .then(res => {
        //     this.setState({
        //         best_seller_list: [...res.data.data, {id: "2"}, {id: "3"}, {id: "4"},{id: "5"}]
        //     });
        //   })

          HttpUtils.getJson('/api/products')
          .then(data => {
            
          })
          .catch(err => {

          })
      }


    render() {
        console.log(this.state.best_seller_list, '------------------------')
        return(
            <div>
                <Header/>
                <main class="site-main">
                    <section class="hero-banner">
                    <div class="container">
                        <div class="row no-gutters align-items-center pt-60px">
                        <div class="col-5 d-none d-sm-block">
                            <div class="hero-banner__img">
                            <img class="img-fluid" src="img/home/hero-banner.png" alt=""/>
                            </div>
                        </div>
                        <div class="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
                            <div class="hero-banner__content">
                            <h4>Shop is fun</h4>
                            <h1>Browse Our Premium Product</h1>
                            <p>Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.</p>
                            <a class="button button-hero" href="#">Browse Now</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                    <section class="section-margin mt-0">
                    <div class="owl-carousel owl-theme hero-carousel">
                        <div class="hero-carousel__slide">
                        <img src="img/home/hero-slide1.png" alt="" class="img-fluid"/>
                        <a href="#" class="hero-carousel__slideOverlay">
                            <h3>Wireless Headphone</h3>
                            <p>Accessories Item</p>
                        </a>
                        </div>
                        <div class="hero-carousel__slide">
                        <img src="img/home/hero-slide2.png" alt="" class="img-fluid"/>
                        <a href="#" class="hero-carousel__slideOverlay">
                            <h3>Wireless Headphone</h3>
                            <p>Accessories Item</p>
                        </a>
                        </div>
                        <div class="hero-carousel__slide">
                        <img src="img/home/hero-slide3.png" alt="" class="img-fluid"/>
                        <a href="#" class="hero-carousel__slideOverlay">
                            <h3>Wireless Headphone</h3>
                            <p>Accessories Item</p>
                        </a>
                        </div>
                    </div>
                    </section>
                    <section class="section-margin calc-60px">
                        <div class="container">
                            <div class="section-intro pb-60px">
                            <p>Popular Item in the market</p>
                            <h2>Trending <span class="section-intro__style">Product</span></h2>
                            </div>
                            <div class="row">
                                {this.state.trending_list.map(item => 
                                <div class="col-md-6 col-lg-4 col-xl-3" key={item.id}>
                                    <div class="card text-center card-product">
                                    <div class="card-product__img">
                                        <img class="card-img" src="img/product/product1.png" alt=""/>
                                        <ul class="card-product__imgOverlay">
                                        <li><button><i class="ti-search"></i></button></li>
                                        <li><button><i class="ti-shopping-cart"></i></button></li>
                                        <li><button><i class="ti-heart"></i></button></li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <p>{item.category}</p>
                                        <h4 class="card-product__title"><a href="single-product.html">{item.name}</a></h4>
                                        <p class="card-product__price">{item.sellPrice}</p>
                                    </div>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                        </section>
                        <section class="offer" id="parallax-1" data-anchor-target="#parallax-1" data-300-top="background-position: 20px 30px" data-top-bottom="background-position: 0 20px">
                            <div class="container">
                                <div class="row">
                                <div class="col-xl-5">
                                    <div class="offer__content text-center">
                                    <h3>Up To 50% Off</h3>
                                    <h4>Winter Sale</h4>
                                    <p>Him she'd let them sixth saw light</p>
                                    <a class="button button--active mt-3 mt-xl-4" href="#">Shop Now</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </section>

                        <section class="section-margin calc-60px">
                            <div class="container">
                                <div class="section-intro pb-60px">
                                <p>Popular Item in the market</p>
                                <h2>Best <span class="section-intro__style">Sellers</span></h2>
                                </div>
                                <div class="owl-carousel owl-theme " id="bestSellerCarousel">
                                    {/* <div class="owl-stage-outer">
                                    <div class="owl-stage" > */}
                                    {this.state.best_seller_list.map(item =>
                                        // <div class="owl-item" style={{width: "255px", marginRight: "30px"}} key={item.id}>
                                        <div class="card text-center card-product">
                                            <div class="card-product__img">
                                            <img class="img-fluid" src="img/product/product1.png" alt=""/>
                                            <ul class="card-product__imgOverlay">
                                                <li><button><i class="ti-search"></i></button></li>
                                                <li><button><i class="ti-shopping-cart"></i></button></li>
                                                <li><button><i class="ti-heart"></i></button></li>
                                            </ul>
                                            </div>
                                            <div class="card-body">
                                            <p>Accessories</p>
                                            <h4 class="card-product__title"><a href="single-product.html">Quartz Belt Watch</a></h4>
                                            <p class="card-product__price">$150.00</p>
                                            </div>
                                        </div>
                                        // </div>
                                    )}
                                    {/* </div>
                                    </div> */}
                                </div>
                            </div>
                        </section>
                </main>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);