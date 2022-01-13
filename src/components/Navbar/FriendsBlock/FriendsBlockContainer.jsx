import StoreContext from '../../../StoreContext';
import FriendsBlock from './FriendsBlock';
import s from './FriendsBlock.module.css';
import FriendsItem from './FriendsItem/FriendsItem';

const FriendsBlockContainer = () => {
	return (
		<StoreContext.Consumer>
			{(store) => {
				let state = store.getState();
				return <FriendsBlock friends={state.sidebar.friends} />
			}}
		</StoreContext.Consumer>
	)
}

export default FriendsBlockContainer;