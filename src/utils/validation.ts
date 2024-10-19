export const USERNAME_REGEX = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/gi;
// Six chars, number and char
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export function normalisedUsername(username: string): string {
	return username.trim().toLowerCase();
}
