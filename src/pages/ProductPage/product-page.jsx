
import Spinner from "../../components/Spinner/Spinner"
import api from "../../utils/api"
import { useEffect, useState, useCallback} from "react"
import { Product } from "../../components/Product/product"
import { useParams } from "react-router-dom";
import { useContext } from "react"
import { CardContext } from "../../context/cardContext";
import { useApi } from "../../hooks/useApi";

export const ProductPage = () => {

  
  const { productId } = useParams();
  const {handleLike} = useContext(CardContext);

  // const [product, setProduct] = useState(null)
  // const [errorState, setErrorState] = useState(null)

  const handleGetProduct = () => api.getProductById(productId);

  const {data: product,
    setData: setProduct,
    loading: isLoading,
    error: errorState
  } = useApi(handleGetProduct)



  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });

  }, [product, handleLike])

 


  // useEffect(() => {
  //   api.getProductById(productId)
  //     .then(( productData ) => {
  //       setProduct(productData)
  //     })
  //     .catch(err => setErrorState(err))
  // }, [])

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