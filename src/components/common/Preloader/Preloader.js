import React from "react";
import preloader from '../../../assets/images/Circle-Loading.svg'
import s from './Preloader.module.css'

let Preloader = (props) => {
	return <div className={s.wpapperGif}>
		<img src={preloader} />
	</div>
}
export default Preloader