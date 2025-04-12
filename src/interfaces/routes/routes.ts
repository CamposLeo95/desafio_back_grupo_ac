import { Router } from "express";
import { userController } from "../../infra/container/user.container";
import { UserRoutes } from "./user/user.route";

const routes = Router();

const userRoutes = new UserRoutes(userController);

routes.use(userRoutes.getRoutes());

export { routes };
