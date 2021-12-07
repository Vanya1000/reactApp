import s from './FriendsItem.module.css';

const FriendsItem = (props) => {
	return (
		<div className={s.itemFriends}>
			<div className={s.friends}>
				<img src="https://cs6.pikabu.ru/post_img/2017/07/20/9/1500560067172981119.jpg" />
			</div>
			<div>
				{props.name}
			</div>
		</div>
	)
}

export default FriendsItem;