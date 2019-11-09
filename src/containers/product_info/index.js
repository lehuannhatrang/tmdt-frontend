import React, {Component} from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import RecommendItem from "../../components/recommend_item/RecommendItem";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtils from '../../utils/http.util';
import { Slide } from 'react-slideshow-image';

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  }

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        const id = props.match.params.product_id !== undefined ? props.match.params.product_id : props.location.product_id
        this.state = {
            id: id,
            product: {},
            best_seller_list: [],
        }
        this.displayPrice = this.displayPrice.bind(this);
    }

    displayPrice(price) {
        return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "đ";
    }

    componentDidMount() {
        HttpUtils.getJson('/products/' + this.state.id)
        .then(data => {
            this.setState({
                product: data.data
            })
            console.log(data.data)
        })
        .catch(err => {

        })
        HttpUtils.getJson('/products?limit=8')
          .then(data => {
                this.setState({
                    best_seller_list: data.data
                })
                
          })
          .catch(err => {

          })
      }


    render() {
        const product = this.state.product
        if (Object.keys(product).length === 0){
            return <div>Loading...</div>
        }
        window.scrollTo(0, 0) 
        return(
            <div>
                <Header/>
                <section class="blog-banner-area" id="blog">
                    <div class="container h-100">
                        <div class="blog-banner">
                            <div class="text-center">
                                <h1>Shop Single</h1>
                                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Shop Single</li>
                        </ol>
                    </nav>
                            </div>
                        </div>
                </div>
                </section>
                <div class="product_image_area">
                    <div class="container">
                        <div class="row s_product_inner">
                            <div class="col-lg-6">
                            <div className="slide-container">
                                <Slide {...properties}>
                                    {product.images.map(img => 
                                    <div className="single-prd-item" key={img.id}>
                                        <img class="img-fluid" src={img.url} alt=""/>
                                    </div>
                                    )}
                                </Slide>
                            </div>
                            </div>
                            <div class="col-lg-5 offset-lg-1">
                                <div class="s_product_text">
                                    <h3>{product.name}</h3>
                                    <h2>{this.displayPrice(product.sellPrice)}</h2>
                                    <ul class="list">
                                        <li><a class="active" href="#"><span>Category</span> : {product.category}</a></li>
                                        <li><a href="#"><span>Availibility</span> : {product.availableCount}</a></li>
                                    </ul>
                                    <p>{product.shortDescription}</p>
                                    <div class="product_count">
                                        <label>Quantity:</label>
                                                        <input type="number" min={0} name="qty" id="sst" class="input-text qty"/>
                                                        <Link class="button primary-btn" to="/">Add to Cart</Link>               
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="product_description_area">
                    <div class="container">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                                aria-selected="false">Specification</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
                                aria-selected="false">Comments</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review"
                                aria-selected="false">Reviews</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab" dangerouslySetInnerHTML={{__html: product.description}}>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h5>Width</h5>
                                                </td>
                                                <td>
                                                    <h5>128mm</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Height</h5>
                                                </td>
                                                <td>
                                                    <h5>508mm</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Depth</h5>
                                                </td>
                                                <td>
                                                    <h5>85mm</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Weight</h5>
                                                </td>
                                                <td>
                                                    <h5>52gm</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Quality checking</h5>
                                                </td>
                                                <td>
                                                    <h5>yes</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Freshness Duration</h5>
                                                </td>
                                                <td>
                                                    <h5>03days</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>When packeting</h5>
                                                </td>
                                                <td>
                                                    <h5>Without touch of hand</h5>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h5>Each Box contains</h5>
                                                </td>
                                                <td>
                                                    <h5>60pcs</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="comment_list">
                                            <div class="review_item">
                                                <div class="media">
                                                    <div class="d-flex">
                                                        <img src="img/product/review-1.png" alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                                                        <a class="reply_btn" href="#">Reply</a>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                            <div class="review_item reply">
                                                <div class="media">
                                                    <div class="d-flex">
                                                        <img src="img/product/review-2.png" alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                                                        <a class="reply_btn" href="#">Reply</a>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                            <div class="review_item">
                                                <div class="media">
                                                    <div class="d-flex">
                                                        <img src="img/product/review-3.png" alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                                                        <a class="reply_btn" href="#">Reply</a>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="review_box">
                                            <h4>Post a comment</h4>
                                            <form class="row contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="name" name="name" placeholder="Your Full name"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <input type="email" class="form-control" id="email" name="email" placeholder="Email Address"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="number" name="number" placeholder="Phone Number"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <textarea class="form-control" name="message" id="message" rows="1" placeholder="Message"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 text-right">
                                                    <button type="submit" value="submit" class="btn primary-btn">Submit Now</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="review-tab">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="row total_rate">
                                            <div class="col-6">
                                                <div class="box_total">
                                                    <h5>Overall</h5>
                                                    <h4>4.0</h4>
                                                    <h6>(03 Reviews)</h6>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="rating_list">
                                                    <h3>Based on 3 Reviews</h3>
                                                    <ul class="list">
                                                        <li><a href="#">5 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                                class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                                                        <li><a href="#">4 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                                class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                                                        <li><a href="#">3 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                                class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                                                        <li><a href="#">2 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                                class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                                                        <li><a href="#">1 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                                class="fa fa-star"></i><i class="fa fa-star"></i> 01</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="review_list">
                                            <div class="review_item">
                                                <div class="media">
                                                    <div class="d-flex">
                                                        <img src="img/product/review-1.png" alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                            <div class="review_item">
                                                <div class="media">
                                                    <div class="d-flex">
                                                        <img src="img/product/review-2.png" alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                            <div class="review_item">
                                                <div class="media">
                                                    <div class="d-flex">
                                                        <img src="img/product/review-3.png" alt=""/>
                                                    </div>
                                                    <div class="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="review_box">
                                            <h4>Add a Review</h4>
                                            <p>Your Rating:</p>
                                            <ul class="list">
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                                <li><a href="#"><i class="fa fa-star"></i></a></li>
                                            </ul>
                                            <p>Outstanding</p>
                            <form action="#/" class="form-contact form-review mt-3">
                            <div class="form-group">
                                <input class="form-control" name="name" type="text" placeholder="Enter your name" required/>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="email" type="email" placeholder="Enter email address" required/>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="subject" type="text" placeholder="Enter Subject"/>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control different-control w-100" name="textarea" id="textarea" cols="30" rows="5" placeholder="Enter Message"></textarea>
                            </div>
                            <div class="form-group text-center text-md-right mt-3">
                                <button type="submit" class="button button--active button-review">Submit Now</button>
                            </div>
                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                


                <section class="related-product-area section-margin--small mt-0">
                    <div class="container">
                        <div class="section-intro pb-60px">
                            <p>Popular Item in the market</p>
                            <h2>Top <span class="section-intro__style">Product</span></h2>
                        </div>
                        <div class="row">
                                {this.state.best_seller_list.map(item => 
                                    <RecommendItem item={item} key={item.id}/>
                                )}
                            </div>
                    </div>
                </section>
                <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);