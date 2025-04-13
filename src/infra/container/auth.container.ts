import { BcryptPasswordHash } from "../../app/services/password-hash/bcrypt-password-hash";
import { LoginUseCase } from "../../app/use-cases/auth/login.usecase";
import { LoginController } from "../../interfaces/controllers/auth/login.controller";
import { FakeRepoUser } from "../db/Fake/user.repository";
import "dotenv/config";
import { PrismaRepoUser } from "../db/prisma/user.repository";

const FAKE_DB = process.env.FAKE_DB;

const fakeRepoUser = new FakeRepoUser();
const prismaRepoUser = new PrismaRepoUser();

const activeRepoUser = FAKE_DB === "true" ? fakeRepoUser : prismaRepoUser;

const bcryptPasswordHash = new BcryptPasswordHash(10);

const loginUseCase = new LoginUseCase(activeRepoUser, bcryptPasswordHash);

export const loginController = new LoginController(loginUseCase);
