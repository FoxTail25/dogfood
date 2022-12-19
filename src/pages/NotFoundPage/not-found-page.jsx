import { NotFound } from "../../components/NotFound/NotFound"

export const NotFoundPage = () => {
    return (
        <div className="container container_inner">
            <NotFound title='По вашему запросу ничего не найдено' buttonText="На главную" />
        </div>
    )
}