import { Link } from 'react-router-dom';
import s from './hero.module.css';
import banner from './img/banner.png'
import arrow from './img/arrow.svg'
import cn from 'classnames';


export const Hero = () => {
    return (
        <div className={s.banner}>

            <div className={cn("container", s.banner__container)}>

                <div className={s.left}>

                    <div className={s.title}>
                        Крафтовые лакомства для собак
                    </div>

                    <p className={s.subtitle}>
                        Всегда свежие лакомства ручной работы с достовкой по России и Миру
                    </p>

                    <Link to='catalog' className={s.link}>Каталог <img src={arrow} alt="стрелка" /></Link>

                </div>

                <div className={s.right}>
                    <img src={banner} alt='Баннер'/>
                </div>
            </div>

        </div>
    )
}