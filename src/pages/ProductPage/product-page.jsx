
import { useCallback } from "react"
import { Product } from "../../components/Product/product"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleProdSlice, setProductState } from "../../storage/singleProduct/singleProdSlice";
import { fetchChangrLikeProduct } from "../../storage/products/productSlice";

export const ProductPage = () => {


  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data: product, loading: isLoading, error: errorState } = useSelector(state => state.singleProduct);

  useEffect(() => {
    dispatch(fetchSingleProdSlice(productId))
  }, [dispatch, productId]);





  const handleProductLike = useCallback(() => {

    dispatch(fetchChangrLikeProduct(product))
      .then(updateProduct => {
        dispatch(setProductState(updateProduct.payload.product))
      })

  }, [product, dispatch])

  return (
    <div className="container container_inner">

      <div className='content__cards'>

        {!errorState && !isLoading && <Product {...product} onProductLike={handleProductLike} />}

        {!isLoading && errorState && <notFound />}

      </div>

    </div>
  )
}