import s from './FriendsBlock.module.css';
import FriendsItem from './FriendsItem/FriendsItem';

const FriendsBlock = (props) => {
	let friendsItem = props.friends.map(elementF => <FriendsItem name={elementF.name} key={elementF.id}/>)
	return (
		<div>
			<div className={s.title}>
				Friends
			</div>
			<div className={s.blockFriends}>
				{friendsItem}
			</div>
		</div>
	)
}

export default FriendsBlock;