import jwt from "jsonwebtoken";
import { AppError } from "../exceptions/app-error";
import type { JwtPayload } from "../types/jwt.type";

export function isUserAdmin(token: string) {
	const { admin }: JwtPayload = jwt.decode(token) as JwtPayload;

	if (!admin) {
		throw new AppError(
			"Usuario nao tem permisão para executar essa ação!",
			403,
		);
	}

	return;
}
