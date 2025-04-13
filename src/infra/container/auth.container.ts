import { BcryptPasswordHash } from "../../app/services/password-hash/bcrypt-password-hash";
import { LoginUseCase } from "../../app/use-cases/auth/login.usecase";
import { LoginController } from "../../interfaces/controllers/auth/login.controller";
import { RepoUserTeste } from "../db/prisma/user.repository";

const userRepositoryTeste = new RepoUserTeste();
const bcryptPasswordHash = new BcryptPasswordHash(10);

const loginUseCase = new LoginUseCase(userRepositoryTeste, bcryptPasswordHash);

export const loginController = new LoginController(loginUseCase);
