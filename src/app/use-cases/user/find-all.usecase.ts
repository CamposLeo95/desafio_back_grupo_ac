import type { User } from "../../../domain/entities/user.entity";
import type { IUserRepository } from "../../../domain/repositories/user.repository";

export class FindAllUsersUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(): Promise<Output> {
		console.log("teste");
		const users = await this.userRepository.findAll();
		return {
			data: users,
		};
	}
}

type Output = {
	data: User[];
};
