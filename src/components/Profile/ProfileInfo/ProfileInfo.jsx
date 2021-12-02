import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
	return (
		<div>
			<div className={s.image}>
				<img src="https://static.dw.com/image/18813153_303.jpg" alt="" />
			</div>
			<div className={s.discriptionBlock}>
				ava + discription
			</div>
		</div>
	)
}
export default ProfileInfo;