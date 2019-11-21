import React, {Component} from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Item from "../../components/item/Item";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtils from '../../utils/http.util'
import $ from "jquery";

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trending_list: [],
            best_seller_list: [],
        }
    }

    componentDidMount() {
          HttpUtils.getJson('/products?limit=8')
          .then(data => {
                this.setState({
                    trending_list: data.data,
                    best_seller_list: data.data
                })
                
          })
          .catch(err => {

          })
      }


    render() {
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
                            <h1>Your happiness is our happiness</h1>
                            {/* <p>Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.</p> */}
                            <a class="button button-hero" href="/shopping">Browse Now</a>
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
                                    <Item item={item} key={item.id}/>
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
                                    {/* <p>Him she'd let them sixth saw light</p> */}
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
                                <div class="row">
                                    {this.state.best_seller_list.map(item => 
                                        <Item item={item} key={item.id}/>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section class="subscribe-position">
                            <div class="container">
                                <div class="subscribe text-center">
                                <h3 class="subscribe__title">Get Update From Anywhere</h3>
                                {/* <p>Bearing Void gathering light light his eavening unto dont afraid</p> */}
                                <div id="mc_embed_signup">
                                    <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" class="subscribe-form form-inline mt-5 pt-1">
                                    <div class="form-group ml-sm-auto">
                                        <input class="form-control mb-1" type="email" name="EMAIL" placeholder="Enter your email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '" />
                                        <div class="info"></div>
                                    </div>
                                    <button class="button button-subscribe mr-auto mb-1" type="submit">Subscribe Now</button>
                                    <div style={{position: "absolute", left: "-5000px"}}>
                                        <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex="-1" value="" type="text"/>
                                    </div>

                                    </form>
                                </div>
                                
                                </div>
                            </div>
                        </section>
                        <Footer/>
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