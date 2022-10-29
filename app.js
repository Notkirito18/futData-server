const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = (url) => {
  return mongoose.connect(url);
};

const FutCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  futId: { type: String, required: true },
  rating: { type: Number },
  position: { type: String },
});
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

const FutCard = mongoose.model("FutCard", FutCardSchema);

router.get("/", async (req, res) => {
  const FutCards = await FutCard.find();
  res.status(200).json({
    FutCards: FutCards,
  });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const FutCards = await FutCard.create(req.body);
    res.status(200).json({ FutCards });
  } catch (error) {
    res.status(400).json({ error });
  }
});
app.use(express.json());
app.use("/api/", router);
app.use("/", (req, res) => {
  res.send("hosting works");
});

const port = 5000;
const start = async () => {
  try {
    await connectDB(envirement.MONGO_CONNECT_STRING);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
//mongodb+srv://kirito:<password>@futdatacluster.g67mlml.mongodb.net/test
