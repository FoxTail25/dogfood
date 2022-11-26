
import Spinner from "../../components/Spinner/Spinner"
import api from "../../utils/api"
import { useEffect, useState, useCallback} from "react"
import { Product } from "../../components/Product/product"
import { useParams } from "react-router-dom";
import { useContext } from "react"
import { CardContext } from "../../context/cardContext";

export const ProductPage = ({isLoading}) => {


  const { productId } = useParams();
  const [product, setProduct] = useState(null)
  const [errorState, setErrorState] = useState(null)
  

  const {handleLike} = useContext(CardContext);


  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });

  }, [product, handleLike])


  useEffect(() => {
    api.getProductById(productId)
      .then(( productData ) => {
        setProduct(productData)
      })
      .catch(err => setErrorState(err))
  }, [])

  return (
    <>
        <div className='content__cards'>
          {isLoading

            ? <Spinner />
            : !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike}/>
          }
        </div>
        {errorState && <notFound/>}
    </>
  )
}