import { Router } from "express";
import { transactionController } from "../../infra/container/transaction.container";
import { userController } from "../../infra/container/user.container";
import { TransactionRoutes } from "./transaction/transaction.route";
import { UserRoutes } from "./user/user.route";

const routes = Router();

const userRoutes = new UserRoutes(userController);
const transactionRoutes = new TransactionRoutes(transactionController);

routes.use(userRoutes.getRoutes());
routes.use(transactionRoutes.getRoutes());

export { routes };
