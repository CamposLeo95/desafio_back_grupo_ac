import { Router } from "express";
import { verifyToken } from "../../../middlewares/verify-token";
import type { RequestReversalController } from "../../controllers/request-reversal/request-reversal.contoller";

export class RequestReversalRoutes {
	private routes: Router;
	constructor(
		private readonly requestReversalController: RequestReversalController,
	) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.routes.post(
			"/request-reversal/:idTransaction",
			verifyToken,
			this.requestReversalController.requestReversal.bind(
				this.requestReversalController,
			),
		);

		this.routes.get(
			"/request-reversal",
			verifyToken,
			this.requestReversalController.findAll.bind(
				this.requestReversalController,
			),
		);

		this.routes.put(
			"/request-reversal/pending/:idRequestReversal",
			verifyToken,
			this.requestReversalController.pendingRequestReversal.bind(
				this.requestReversalController,
			),
		);

		this.routes.put(
			"/request-reversal/reject/:idRequestReversal",
			verifyToken,
			this.requestReversalController.rejectRequestReversal.bind(
				this.requestReversalController,
			),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
