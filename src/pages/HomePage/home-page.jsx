import { Banner } from "../../components/Banner/banner"
import { Hero } from "../../components/Hero/hero"
import banner_sale from './img/banner.jpg';
import banner_product1 from './img/banner_2.jpg';
import banner_product2 from './img/banner_3.jpg';
import h from './home.module.css'


export const HomePage = () => {

    // const goods = [
    //     {
    //         id: 1,
    //         image: './cards/img1.png',
    //         old_price: '840 p',
    //         quantity: '1шт',
    //         text: 'Рога оленя для собак весом от 10 до 30 кг. Размер L',
    //     },
    //     {
    //         id: 2,
    //         image: './cards/img2.png',
    //         old_price: '450 p',
    //         quantity: '200 мл',
    //         text: 'Сельдовое масло',
    //     },
    //     {
    //         id: 3,
    //         image: './cards/img3.png',
    //         old_price: '550 p',
    //         quantity: '495 p',
    //         text: 'бублик из бычьего корня', 
    //     },
    //     {
    //         id: 4,
    //         image: './cards/img4.png',
    //         old_price: '240 p',
    //         quantity: '1 p',
    //         text: 'Лопаточный хрящ говяжий для собак',
    //     }
    // ]

    return (
        <>
            <Hero />
            <div className="container">
                <Banner
                    extraClass='banner_big'
                    bg={banner_sale}
                />

                <div className={h.banner__group}>
                    <Banner
                        extraClass='banner_middle'
                        bg={banner_product1}
                    />


                    <Banner
                        extraClass='banner_middle'
                        bg={banner_product2}
                    />
                </div>
            </div>
        </>
    )
}