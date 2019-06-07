export const accountApiInstance = {
	getBalance: jest.fn()
}

export const AccountApi = jest.fn().mockImplementation(() => {
	return accountApiInstance;
})