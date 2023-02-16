import cn from 'classnames'
import b from './banner.module.css'


export const Banner = ({bg, extraClass}) => {
    return (
        <div className={cn(b.banner, { [b[extraClass]]: !!extraClass})} style={{backgroundImage: `url(${bg})`}}>
        </div>
    )
}