import Footer from "../../components/Footer/footer"
import Header from "../../components/Header/header"
import Logo from "../../components/Logo/logo"
import Search from "../../components/Search/search"
import Spinner from "../../components/Spinner/Spinner"
import api from "../../utils/api"
import { useEffect, useState } from "react"
import { isLiked } from "../../utils/product"
import { Product } from "../../components/Product/product"

export const ProductPage = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState([null])

    const handleRequest = () => {
        setIsLoading(true)
        api.search(searchQuery)
          .then((searchResult) => {
            console.log(searchResult)
          })
          .catch(err => console.log(err))
          .finally(()=> {setIsLoading(false)});
      }

      const handleFormSubmit = (e) => {
        e.preventDefault()
        handleRequest()
      }

      function handleProductLike() {
        const liked = isLiked(product.likes, currentUser._id)
        api.changeLikeProd(product._id, liked)
          .then((newProduct) => {
            setProduct(newProduct);
          })
    
      }
  
      useEffect(() => {
        setIsLoading(true)
        Promise.all([api.getProductById('622c77e877d63f6e70967d22'), api.getUserInfo()])
          .then(([productData, userData]) => {
            setCurrentUser(userData)
            setProduct(productData)
          })
          .catch(err => console.log(err))
          .finally(setIsLoading(false))
      }, [])


    return (
        <>
        <Header >
          <>
            <Logo className='logo logo_place_header' href='/' />
            {/* <Search/> */}
            <Search onSubmit={handleFormSubmit} />
          </>
        </Header>
        <main className='content container'>
          {/* <Sort /> */}
          <div className='content__cards'>
            {isLoading
              ?<Spinner/>
              :<Product {...product} currentUser={currentUser} onProductLike={handleProductLike}/>
            }
          </div>
        </main>
        <Footer />
      </>
    )
}