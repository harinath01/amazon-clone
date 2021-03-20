import React from 'react';
import './Product.css';
import { useStateValue} from './StateProvider.js'

function Product({ id, title, image, price, rating }) {
  const [{ basket} , dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      }
    });
  }

  return (
    <div className='product' key={id}>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      {/* <p className='product__price'>
        <small>$</small>
        <strong>{price}</strong>
      </p> */}

      <img src={image} alt='' />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product
