import { useNavigate } from "react-router-dom"
import s from './index.module.css'


export const ContentHeader = ({title, children}) => {
    
    const navigate = useNavigate();

    return (


        <div>

            {/* <Link className="button-back" to="/">Назад</Link> РАБОТАЕТ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ */}
            <a className="button-back" href='#' onClick={() => navigate(-1)}>Назад</a>
            <h1 className={s.productTitle}>{title}</h1>
            {children}

        </div>


    )
}