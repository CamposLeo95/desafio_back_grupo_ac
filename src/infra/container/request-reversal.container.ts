import { FindAllRequestReversalUseCase } from "../../app/use-cases/request-reversal/find-all.usecase";
import { PendingRequestReversalUseCase } from "../../app/use-cases/request-reversal/pending-request-reversal.usecase";
import { RejectRequestReversalUseCase } from "../../app/use-cases/request-reversal/reject-request-reversal.usecase";
import { RequestReversalUseCase } from "../../app/use-cases/request-reversal/request-reversal.usecase";
import { RequestReversalController } from "../../interfaces/controllers/request-reversal/request-reversal.contoller";
import { FakeRepoRequestReversal } from "../db/Fake/request-reversal.repository";
import { FakeRepoTransaction } from "../db/Fake/transaction.repository";

const fakeRepoRequestReversal = new FakeRepoRequestReversal();
const fakeRepoTransaction = new FakeRepoTransaction();

const requestReversalUseCase = new RequestReversalUseCase(
	fakeRepoRequestReversal,
	fakeRepoTransaction,
);

const findAllRequestReversalUseCase = new FindAllRequestReversalUseCase(
	fakeRepoRequestReversal,
);
const pendingRequestReversalUseCase = new PendingRequestReversalUseCase(
	fakeRepoRequestReversal,
);
const rejectRequestReversalUseCase = new RejectRequestReversalUseCase(
	fakeRepoRequestReversal,
);

export const requestReversalController = new RequestReversalController(
	requestReversalUseCase,
	findAllRequestReversalUseCase,
	pendingRequestReversalUseCase,
	rejectRequestReversalUseCase,
);
