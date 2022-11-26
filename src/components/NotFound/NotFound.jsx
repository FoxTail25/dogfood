import React from "react";
import notFound from './img/ic-notfound.svg';
import { Link } from 'react-router-dom';
import f from './styles.module.css';
// import  f  from './index.module.css';

export const NotFound = ( {children, title, buttonText = "На главную", buttonAction} ) => {
	return (
		<>
			<div className={f.notFound}>
                <div className={f.red}>Sorry</div>
				<img src={notFound} className={f.image} aria-hidden="true" alt="Ничего не найдено" />
				<h1 className={f.title}>{title}</h1>
				{children && children}
				{buttonAction
					? <a href="#" className="btn" onClick={buttonAction}>{buttonText}</a>
					: <Link to="/" className="btn" >{buttonText}</Link>
				}
			</div>

		</>
	);
}
