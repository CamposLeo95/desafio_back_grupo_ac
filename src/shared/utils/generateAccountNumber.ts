export function generateAccountNumber(): number {
	const min = 10000000;
	const max = 99999999;
	const accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

	return accountNumber;
}
