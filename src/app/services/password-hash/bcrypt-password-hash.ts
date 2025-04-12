import bcrypt from "bcryptjs";
export class BcryptPasswordHash {
	constructor(private readonly salt: number) {}

	async hash(password: string): Promise<string> {
		return await bcrypt.hash(password, this.salt);
	}

	async compare(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}
}
