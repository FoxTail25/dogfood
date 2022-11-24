import Footer from "../../components/Footer/footer"
import Header from "../../components/Header/header"
import Logo from "../../components/Logo/logo"
import Search from "../../components/Search/search"
import Spinner from "../../components/Spinner/Spinner"
import api from "../../utils/api"
import { useEffect, useState } from "react"
import { isLiked } from "../../utils/product"
import { Product } from "../../components/Product/product"
import { useCallback } from "react"

export const ProductPage = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  console.log('ПродуктПейж', isLoading)
  const [product, setProduct] = useState([null])

  console.log('ПродуктПейж', isLoading)

  const handleRequest = useCallback((searchQuery) => {
    setIsLoading(true)
    api.search(searchQuery)
      .then((searchResult) => {
        console.log(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }, [])



  const handleProductLike = useCallback(() => {
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProd(product._id, liked)
      .then((newProduct) => {
        setProduct(newProduct);
      })
  }, [product, currentUser])

const ID_Product ='622c77e877d63f6e70967d22'

  useEffect(() => {
    // setIsLoading(true);
    console.log(isLoading)
    Promise.all([api.getProductById(ID_Product), api.getUserInfo()])
      .then(([productData, userData]) => {
        setCurrentUser(userData)
        setProduct(productData)
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
  }, [])

  // console.log(isLoading);
  return (
    <>
      <Header >
        <>
          <Logo className='logo logo_place_header' href='/' />
          <Search onSubmit={handleRequest} />
        </>
      </Header>
      <main className='content container'>
        {/* <Sort /> */}
        <div className='content__cards'>
          {isLoading

            ? <Spinner />
            : <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />
          }
        </div>
      </main>
      <Footer />
    </>
  )
}