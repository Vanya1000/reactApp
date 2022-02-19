import { ResponseType, ResultCodesEnum } from './../api/api';
import { usersAPI } from './../api/user-api';
import { actions, follow, unfollow } from "./usersReducer"

jest.mock('./../api/user-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
	dispatchMock.mockClear();
	getStateMock.mockClear();
	userAPIMock.setFollow.mockClear();
	userAPIMock.setUnfollow.mockClear();
})

const result: ResponseType = {
	resultCode: ResultCodesEnum.Success,
	messages: [],
	data: {}
}

test('success follow thunk', async () => {
	userAPIMock.setFollow.mockReturnValue(Promise.resolve(result));

	const thunk = follow(1)
	
	await thunk(dispatchMock, getStateMock, {})
	
	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSucsess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false))
	
})

test('success unfollow thunk', async () => {
	userAPIMock.setUnfollow.mockReturnValue(Promise.resolve(result));

	const thunk = unfollow(1)

	await thunk(dispatchMock, getStateMock, {})

	expect(dispatchMock).toBeCalledTimes(3)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSucsess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false))
})
