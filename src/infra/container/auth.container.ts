import { BcryptPasswordHash } from "../../app/services/password-hash/bcrypt-password-hash";
import { LoginUseCase } from "../../app/use-cases/auth/login.usecase";
import { LoginController } from "../../interfaces/controllers/auth/login.controller";
import { FakeRepoUser } from "../db/Fake/user.repository";

const fakeRepoUser = new FakeRepoUser();
const bcryptPasswordHash = new BcryptPasswordHash(10);

const loginUseCase = new LoginUseCase(fakeRepoUser, bcryptPasswordHash);

export const loginController = new LoginController(loginUseCase);
