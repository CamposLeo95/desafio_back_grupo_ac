import app from "./main";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const FAKE_DB = process.env.FAKE_DB || "false";

app.listen(PORT, () => {
	console.log(`FAKE_DB: ${FAKE_DB}`);
	console.log(`Server is running on port ${PORT} 🚀`);
});
