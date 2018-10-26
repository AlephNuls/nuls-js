describe('creating QR codes', () =>
{
	beforeEach(() =>
	{
		jest.resetModules();
		jest.clearAllMocks();
	});

	test('an address', async () =>
	{
		const { QRCode } = require('@/index');
		const code = await QRCode.create('Nse1TYHc6Rxs84iimrnygSF2kqrUAQM6');

		expect(code).toMatchSnapshot();
	});

	test('an address with an amount', async () =>
	{
		const { QRCode } = require('@/index');
		const code = await QRCode.create('Nse1TYHc6Rxs84iimrnygSF2kqrUAQM6', { amount: 10 });

		expect(code).toMatchSnapshot();
	});

	test('error correction level option setting `L`', async () =>
	{
		const { QRCode } = require('@/index');
		const code = await QRCode.create('Nse1TYHc6Rxs84iimrnygSF2kqrUAQM6', undefined, { errorCorrectionLevel: 'L' });

		expect(code).toMatchSnapshot();
	});

	test('throw error', async () =>
	{
		const PkgQRCode = require('qrcode');
		let errorMessage = 'No error thrown.';

		PkgQRCode.toDataURL = jest.fn(() =>
		{
			throw new Error('Error message');
		});

		const { QRCode } = require('@/index');

		try
		{
			await QRCode.create('Nse1TYHc6Rxs84iimrnygSF2kqrUAQM6', { amount: 10 });
		}
		catch(error)
		{
			errorMessage = error.message;
		}

		expect(errorMessage).toBe('Error message');
	});
});