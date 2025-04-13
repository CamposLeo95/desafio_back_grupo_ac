import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = "8h";

export function generateToken(
	id: string,
	email: string,
	admin: boolean,
): string {
	const token = jwt.sign({ id, email, admin }, JWT_SECRET, {
		expiresIn: JWT_EXPIRATION,
	});

	return token;
}
