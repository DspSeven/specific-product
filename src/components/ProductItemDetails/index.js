// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const eachProductConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProductItemDetails extends Component {
  state = {
    productDetails: [],
    apiStatus: eachProductConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getProductData = async () => {
    this.setState({apiStatus: eachProductConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(productDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      /*
      const updatedData = data.map(eachData => ({
        availability: eachData.availability,
        brand: eachData.brand,
        description: eachData.description,
        id: eachData.id,
        imageUrl: eachData.image_url,
        price: eachData.price,
        rating: eachData.rating,
        similarProducts: eachData.similar_products,
        style: eachData.style,
        title: eachData.title,
        totalReviews: eachData.total_reviews,
      }))
      */
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      console.log(updatedData)
      this.setState({
        productDetails: updatedData,
        apiStatus: eachProductConstants.success,
      })
    }
  }
  // render loader

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // render success view

  productSuccessView = () => {
    const {productDetails} = this.state
    const {
      availability,
      brand,
      description,
      id,
      imageUrl,
      price,
      rating,
      similarProducts,
      style,
      title,
      totalReviews,
    } = productDetails
    return (
      <div>
        <img src={imageUrl} alt="product" />
        <h1>{title}</h1>
        <p>Rs {price}</p>
        <p>{rating}</p>
        <p>{totalReviews} Reviews</p>
        <p>{description}</p>
        <p>Available: {availability}</p>
        <p>Brand: {brand}</p>
      </div>
    )
  }

  // starting switch
  startSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case eachProductConstants.success:
        return this.productSuccessView()
      case eachProductConstants.failure:
        return this.productFailureView()
      case eachProductConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {productDetails} = this.state
    console.log(productDetails)
    return <div>{this.startSwitch()}</div>
  }
}
export default ProductItemDetails
