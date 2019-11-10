import React, { Component } from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import RecommendItem from "../../components/recommend_item/RecommendItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import HttpUtils from '../../utils/http.util';
import { Slide } from 'react-slideshow-image';
import { addToCart } from '../app/actions';

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
        this.state = {
            id: location.pathname.split('/')[2],
            product: {},
            best_seller_list: [],
            productQuantity: 1,
            name: "",
            message: "",
            star: 0
        }
        this.displayPrice = this.displayPrice.bind(this);
    }

    displayPrice(price) {
        return price.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "đ";
    }

    handleNameChange(){
        this.setState({
            name: event.target.value
        })
    }

    handleMessageChange(){
        this.setState({
            message: event.target.value
        })
    }

    handleSubmitReview(){
        HttpUtils.postJson('/reviews', {
            name: this.state.name,
            star: this.state.star,
            content: this.state.message,
            productId: this.state.id
        },{
            Authorization: 'Bearer ' +localStorage.getItem('userToken')
        }).then(data => {
            this.setState({
                name: "",
                message: ""
            })
            window.location.reload()
        }).catch(err=> {
                this.setState({
                name: "",
                message: ""
            })
            window.location.reload()
        })
    }


    componentDidMount() {
        HttpUtils.getJson('/products/' + this.state.id)
            .then(data => {
                var temp_star_arr = [0, 0, 0, 0, 0]
                for (var i = 0; i < data.data.reviews.length; i++) {
                    if (data.data.reviews[i].star <= 1) {
                        temp_star_arr[0] += 1
                    } else if (data.data.reviews[i].star === 2) {
                        temp_star_arr[1] += 1
                    } else if (data.data.reviews[i].star === 3) {
                        temp_star_arr[2] += 1
                    } else if (data.data.reviews[i].star === 4) {
                        temp_star_arr[3] += 1
                    } else {
                        temp_star_arr[4] += 1
                    }
                }

                var temp_star_average = 0
                for (var i = 0; i < temp_star_arr.length; i++) {
                    temp_star_average += temp_star_arr[i] * (i + 1)
                }
                this.setState({
                    product: data.data,
                    star_arr: temp_star_arr,
                    star_average: temp_star_arr.reduce((a, b) => a + b, 0) === 0 ? 0 : temp_star_average / temp_star_arr.reduce((a, b) => a + b, 0) 
                })
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

    rate(){
        this.setState({
            star: event.target.value
        })
    }

    handleAddToCart(product) {
        const tempArr = new Array(parseInt(this.state.productQuantity)).fill(0)
        tempArr.map(x => this.props.addToCart(product))
    }

    render() {
        const product = this.state.product
        if (Object.keys(product).length === 0) {
            return <div>Loading...</div>
        }
        // window.scrollTo(0, 0) 
        return (
            <div>
                <Header />
                <section className="blog-banner-area" id="blog">
                    <div className="container h-100">
                        <div className="blog-banner">
                            <div className="text-center">
                                <h1>Shop Single</h1>
                                <nav aria-label="breadcrumb" className="banner-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Shop Single</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="product_image_area">
                    <div className="container">
                        <div className="row s_product_inner">
                            <div className="col-lg-6">
                                <div className="slide-container">
                                    <Slide {...properties}>
                                        {product.images.map(img =>
                                            <div className="single-prd-item" key={img.id}>
                                                <img className="img-fluid" src={img.url} alt="" />
                                            </div>
                                        )}
                                    </Slide>
                                </div>
                            </div>
                            <div className="col-lg-5 offset-lg-1">
                                <div className="s_product_text">
                                    <h3>{product.name}</h3>
                                    <h2>{this.displayPrice(product.sellPrice)}</h2>
                                    <ul className="list">
                                        <li><a className="active" href="#"><span>Category</span> : {product.category.name}</a></li>
                                        <li><a href="#"><span>Availibility</span> : {product.availableCount}</a></li>
                                    </ul>
                                    <p dangerouslySetInnerHTML={{ __html: product.shortDescription }}></p>
                                    <div className="product_count">
                                        <label>Quantity:</label>
                                        <input type="number" min={1} name="qty" id="sst" defaultValue={1} className="input-text qty mr-4" onChange={e => this.setState({ productQuantity: e.target.value })} />
                                        <Link className="button primary-btn" to="#" onClick={() => this.handleAddToCart(product)}>Add to Cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="product_description_area">
                    <div className="container">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                                    aria-selected="false">Specification</a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
                                aria-selected="false">Comments</a>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link active" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review"
                                    aria-selected="false">Reviews</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab" dangerouslySetInnerHTML={{ __html: product.description }}>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="table-responsive">
                                    <table className="table">
                                        {product.attributes.map(att => (
                                            <tbody>
                                                <h4>{att.key}</h4>
                                                {att.subAttributes.map(attr => (
                                                    <tr>
                                                        <td>
                                                            <h5>{attr["key"]}</h5>
                                                        </td>
                                                        <td>
                                                            <h5>{attr["value"]}</h5>
                                                        </td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                            {/* <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="comment_list">
                                            <div className="review_item">
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="img/product/review-1.png" alt=""/>
                                                    </div>
                                                    <div className="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                                                        <a className="reply_btn" href="#">Reply</a>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                            <div className="review_item reply">
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="img/product/review-2.png" alt=""/>
                                                    </div>
                                                    <div className="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                                                        <a className="reply_btn" href="#">Reply</a>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                            <div className="review_item">
                                                <div className="media">
                                                    <div className="d-flex">
                                                        <img src="img/product/review-3.png" alt=""/>
                                                    </div>
                                                    <div className="media-body">
                                                        <h4>Blake Ruiz</h4>
                                                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                                                        <a className="reply_btn" href="#">Reply</a>
                                                    </div>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="review_box">
                                            <h4>Post a comment</h4>
                                            <form className="row contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Full name"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" id="email" name="email" placeholder="Email Address"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" id="number" name="number" placeholder="Phone Number"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea className="form-control" name="message" id="message" rows="1" placeholder="Message"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <button type="submit" value="submit" className="btn primary-btn">Submit Now</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="review-tab">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row total_rate">
                                            <div className="col-6">
                                                <div className="box_total">
                                                    <h5>Overall</h5>
                                                    <h4>{this.state.star_average}</h4>
                                                    <h6>({this.state.star_arr.reduce((a, b) => a + b, 0)} reviews)</h6>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="rating_list">
                                                    <h3>Based on {this.state.star_arr.reduce((a, b) => a + b, 0)} Reviews</h3>
                                                    <ul className="list">
                                                        <table>
                                                            <tr>
                                                                <td>5 Star</td>
                                                                <td className="sty_star"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                                                            className="fa fa-star"></i><i className="fa fa-star"></i></td>
                                                            <td>{this.state.star_arr[4]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>4 Star</td>
                                                                <td className="sty_star"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                                                            className="fa fa-star"></i></td>
                                                            <td>{this.state.star_arr[3]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>3 Star</td>
                                                                <td className="sty_star"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></td>
                                                            <td>{this.state.star_arr[2]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>2 Star</td>
                                                                <td className="sty_star"><i className="fa fa-star"></i><i className="fa fa-star"></i></td>
                                                            <td>{this.state.star_arr[1]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>1 Star</td>
                                                                <td className="sty_star"><i className="fa fa-star"></i></td>
                                                            <td>{this.state.star_arr[0]}</td>
                                                            </tr>
                                                        </table>
                                                        {/* <li><a href="#">5 Star <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                                                            className="fa fa-star"></i><i className="fa fa-star"></i> {this.state.star_arr[4]}</a></li>
                                                        <li><a href="#">4 Star <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                                                            className="fa fa-star"></i><i className="fa fa-star"></i> {this.state.star_arr[3]}</a></li>
                                                        <li><a href="#">3 Star <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                                                            className="fa fa-star"></i><i className="fa fa-star"></i> {this.state.star_arr[2]}</a></li>
                                                        <li><a href="#">2 Star <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                                                            className="fa fa-star"></i><i className="fa fa-star"></i> {this.state.star_arr[1]}</a></li>
                                                        <li><a href="#">1 Star <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i
                                                            className="fa fa-star"></i><i className="fa fa-star"></i> {this.state.star_arr[0]}</a></li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review_list">
                                            {product.reviews.map(rw =>
                                                <div className="review_item">
                                                    <div className="media">
                                                        <div className="media-body">
                                                            <h4>{rw.name}</h4>
                                                              {(() => {
                                                                switch (rw.star) {
                                                                case 1:   
                                                                    return <span><i className='fa fa-star'></i></span>;
                                                                case 2:
                                                                    return <span><i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i></span>;
                                                                case 3:
                                                                    return <span><i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i></span>;
                                                                case 4:
                                                                    return <span><i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i></span>;
                                                                case 5:
                                                                    return <span><i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i>
                                                                                <i className='fa fa-star'></i></span>;
                                                                }
                                                            })()}
                                                        </div>
                                                    </div>
                                                    <p>{rw.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="review_box">
                                            <h4>Add a Review</h4>
                                            <p>Your Rating:</p>
                                            <div class="stars">
                                                <input class="star star-5" id="star-5" type="radio" name="star" value="5" onClick={this.rate.bind(this)} />
                                                <label class="star star-5" for="star-5"></label>
                                                <input class="star star-4" id="star-4" type="radio" name="star" value="4" onClick={this.rate.bind(this)}/>
                                                <label class="star star-4" for="star-4"></label>
                                                <input class="star star-3" id="star-3" type="radio" name="star" value="3" onClick={this.rate.bind(this)}/>
                                                <label class="star star-3" for="star-3"></label>
                                                <input class="star star-2" id="star-2" type="radio" name="star" value="2" onClick={this.rate.bind(this)}/>
                                                <label class="star star-2" for="star-2"></label>
                                                <input class="star star-1" id="star-1" type="radio" name="star" value="1" onClick={this.rate.bind(this)}/>
                                                <label class="star star-1" for="star-1"></label>
                                            </div>
                                            <form action="#/" className="form-contact form-review mt-3">
                                                <div className="form-group">
                                                    <input className="form-control" name="name" type="text" placeholder="Enter your name" value={this.state.name} onChange={this.handleNameChange.bind(this)} required />
                                                </div>
                                                {/* <div className="form-group">
                                <input className="form-control" name="email" type="email" placeholder="Enter email address" required/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" name="subject" type="text" placeholder="Enter Subject"/>
                            </div> */}
                                                <div className="form-group">
                                                    <textarea className="form-control different-control w-100" name="textarea" id="textarea" value={this.state.message} onChange={this.handleMessageChange.bind(this)} cols="30" rows="5" placeholder="Enter Message"></textarea>
                                                </div>
                                                <div className="form-group text-center text-md-right mt-3">
                                                    <button type="button" className="button button--active button-review" onClick={this.handleSubmitReview.bind(this)}>Submit Now</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section className="related-product-area section-margin--small mt-0">
                    <div className="container">
                        <div className="section-intro pb-60px">
                            <p>Popular Item in the market</p>
                            <h2>Top <span className="section-intro__style">Product</span></h2>
                        </div>
                        <div className="row">
                            {this.state.best_seller_list.map(item =>
                                <RecommendItem item={item} key={item.id} />
                            )}
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product))
    }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);