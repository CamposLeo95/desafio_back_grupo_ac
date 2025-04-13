import { FindAllRequestReversalUseCase } from "../../app/use-cases/request-reversal/find-all.usecase";
import { PendingRequestReversalUseCase } from "../../app/use-cases/request-reversal/pending-request-reversal.usecase";
import { RejectRequestReversalUseCase } from "../../app/use-cases/request-reversal/reject-request-reversal.usecase";
import { RequestReversalUseCase } from "../../app/use-cases/request-reversal/request-reversal.usecase";
import { RequestReversalController } from "../../interfaces/controllers/request-reversal/request-reversal.contoller";
import { FakeRepoRequestReversal } from "../db/Fake/request-reversal.repository";
import { FakeRepoTransaction } from "../db/Fake/transaction.repository";
import { PrismaRepoRequestReversal } from "../db/prisma/request-reversal.repository";
import { PrismaRepoTransaction } from "../db/prisma/transaction.repository";
import "dotenv/config";
const FAKE_DB = process.env.FAKE_DB;

const fakeRepoRequestReversal = new FakeRepoRequestReversal();
const fakeRepoTransaction = new FakeRepoTransaction();

const prismaRepoRequestReversal = new PrismaRepoRequestReversal();
const prismaRepoTransaction = new PrismaRepoTransaction();

const activeRepoRequestReversal =
	FAKE_DB === "true" ? fakeRepoRequestReversal : prismaRepoRequestReversal;
const activeRepoTransiction =
	FAKE_DB === "true" ? fakeRepoTransaction : prismaRepoTransaction;

const requestReversalUseCase = new RequestReversalUseCase(
	activeRepoRequestReversal,
	activeRepoTransiction,
);

const findAllRequestReversalUseCase = new FindAllRequestReversalUseCase(
	activeRepoRequestReversal,
);
const pendingRequestReversalUseCase = new PendingRequestReversalUseCase(
	activeRepoRequestReversal,
);
const rejectRequestReversalUseCase = new RejectRequestReversalUseCase(
	activeRepoRequestReversal,
);

export const requestReversalController = new RequestReversalController(
	requestReversalUseCase,
	findAllRequestReversalUseCase,
	pendingRequestReversalUseCase,
	rejectRequestReversalUseCase,
);
