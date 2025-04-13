import { Router } from "express";
import { accountController } from "../../infra/container/account.container";
import { loginController } from "../../infra/container/auth.container";
import { requestReversalController } from "../../infra/container/request-reversal.container";
import { transactionController } from "../../infra/container/transaction.container";
import { userController } from "../../infra/container/user.container";
import { AccountRoutes } from "./account/account.routes";
import { LoginRoutes } from "./auth/login.routes";
import { RequestReversalRoutes } from "./request-reversal/request-reversal.routes";
import { TransactionRoutes } from "./transaction/transaction.routes";
import { UserRoutes } from "./user/user.routes";

const routes = Router();

const userRoutes = new UserRoutes(userController);
const transactionRoutes = new TransactionRoutes(transactionController);
const accountRoutes = new AccountRoutes(accountController);
const loginRoutes = new LoginRoutes(loginController);
const requestReversalRoutes = new RequestReversalRoutes(
	requestReversalController,
);

routes.use(userRoutes.getRoutes());
routes.use(transactionRoutes.getRoutes());
routes.use(accountRoutes.getRoutes());
routes.use(loginRoutes.getRoutes());
routes.use(requestReversalRoutes.getRoutes());

export { routes };
