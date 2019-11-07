import React, {Component} from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MapContainer from "../../components/google_map/Map";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtils from '../../utils/http.util';
const mapStyles1 = [
    {
        featureType: "all",
        stylers: [
        { saturation: -90 },
        { lightness: 50 }
        ]
    },
    {elementType: 'labels.text.fill', stylers: [{color: '#A3A3A3'}]}
    ];
const mapStyles = {
    width: '100%',
    height: '100%',
  }
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
        return (
            <div>
            <Header/>
            <section class="blog-banner-area" id="contact">
                <div class="container h-100">
                    <div class="blog-banner">
                        <div class="text-center">
                            <h1>Contact Us</h1>
                            <nav aria-label="breadcrumb" class="banner-breadcrumb">
                                <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Contact Us</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>


            <section class="section-margin--small">
                <div class="container">
                <div class="d-none d-sm-block mb-5 pb-4">
                    <div id="map" style={{height: "420px", width: "50%"}}>
                    <MapContainer/>
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-4 col-lg-3 mb-4 mb-md-0">
                    <div class="media contact-info">
                        <span class="contact-info__icon"><i class="ti-home"></i></span>
                        <div class="media-body">
                        <h3>Bach Khoa University</h3>
                        <p>268 Ly Thuong Kiet, District 10, Ho Chi Minh City</p>
                        </div>
                    </div>
                    <div class="media contact-info">
                        <span class="contact-info__icon"><i class="ti-headphone"></i></span>
                        <div class="media-body">
                        <h3>000000000</h3>
                        <p>Mon to Fri 9am to 6pm</p>
                        </div>
                    </div>
                    <div class="media contact-info">
                        <span class="contact-info__icon"><i class="ti-email"></i></span>
                        <div class="media-body">
                        <h3>pdt@hcmut.edu.vn</h3>
                        <p>Send us your query anytime!</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-8 col-lg-9">
                    <form action="#/" class="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                        <div class="row">
                        <div class="col-lg-5">
                            <div class="form-group">
                            <input class="form-control" name="name" id="name" type="text" placeholder="Enter your name"/>
                            </div>
                            <div class="form-group">
                            <input class="form-control" name="email" id="email" type="email" placeholder="Enter email address"/>
                            </div>
                            <div class="form-group">
                            <input class="form-control" name="subject" id="subject" type="text" placeholder="Enter Subject"/>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="form-group">
                                <textarea class="form-control different-control w-100" name="message" id="message" cols="30" rows="5" placeholder="Enter Message"></textarea>
                            </div>
                        </div>
                        </div>
                        <div class="form-group text-center text-md-right mt-3">
                        <button type="submit" class="button button--active button-contactForm">Send Message</button>
                        </div>
                    </form>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);