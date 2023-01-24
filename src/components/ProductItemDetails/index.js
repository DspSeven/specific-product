// Write your code here
// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
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
    cartStatus: 1,
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
    } else {
      this.setState({
        apiStatus: eachProductConstants.failure,
      })
    }
  }
  // render loader

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // plus one
  addOne = () => {
    const {cartStatus} = this.state
    this.setState({cartStatus: cartStatus + 1})
  }

  // minus one
  removeOne = () => {
    const {cartStatus} = this.state
    this.setState({cartStatus: cartStatus - 1})
  }

  // render success view

  productSuccessView = () => {
    const {productDetails, cartStatus} = this.state
    const cart = JSON.stringify(cartStatus)
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      similarProducts,
      style,
      title,
      totalReviews,
    } = productDetails
    console.log(similarProducts)
    const simPro = similarProducts.map(data => ({
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
    }))
    console.log(simPro)
    return (
      <div>
        <div>
          <img src={imageUrl} alt="product" />
          <h1>{title}</h1>
          <p>Rs {price}</p>
          <p>{rating}</p>
          <p>{totalReviews} Reviews</p>
          <p>{description}</p>
          <p>Available: {availability}</p>
          <p>Brand: {brand}</p>
          <div>
            <button type="button" onClick={this.removeOne} data-testid="minus">
              <BsDashSquare />
            </button>
            <p>{cart}</p>
            <button type="button" onClick={this.addOne} data-testid="plus">
              <BsPlusSquare />
            </button>
          </div>
          <button type="button">Add to Cart</button>
          <p>Similar Products</p>
        </div>
        <ul>
          {simPro.map(product => (
            <SimilarProductItem productDetails={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  // go back
  goBack = () => {
    const {history} = this.props
    history.replace('/products')
  }

  // product failure view
  productFailureView = () => {
    console.log('request failure')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1>Product Not Found</h1>
        <button type="button" onClick={this.goBack}>
          Continue Shopping
        </button>
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
