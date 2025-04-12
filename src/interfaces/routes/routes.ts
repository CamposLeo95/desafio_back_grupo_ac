import { Router } from "express";
import { accountController } from "../../infra/container/account.container";
import { transactionController } from "../../infra/container/transaction.container";
import { userController } from "../../infra/container/user.container";
import { AccountRoutes } from "./account/account.routes";
import { TransactionRoutes } from "./transaction/transaction.routes";
import { UserRoutes } from "./user/user.routes";

const routes = Router();

const userRoutes = new UserRoutes(userController);
const transactionRoutes = new TransactionRoutes(transactionController);

const accountRoutes = new AccountRoutes(accountController);

routes.use(userRoutes.getRoutes());
routes.use(transactionRoutes.getRoutes());
routes.use(accountRoutes.getRoutes());

export { routes };
