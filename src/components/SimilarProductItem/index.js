// Write your code here
// Write your code here
const SimilarProductItem = props => {
  const {productDetails} = props
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
  return (
    <li>
      <img src={imageUrl} alt={`similar product ${title}`} />
      <h1>{title}</h1>
      <p>Rs {price}</p>
      <p>{rating}</p>
      <p>{totalReviews} Reviews</p>
      <p>{description}</p>
      <p>Available: {availability}</p>
      <p>Brand: {brand}</p>
    </li>
  )
}
export default SimilarProductItem
