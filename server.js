let express = require("express");
let http = require("http");
let bodyParser = require("body-parser");

let app = express();

let cors = require("cors");
const mongodb = require("mongoose");
let db;
try {
  (async () => {
    db = await mongodb.connect(
      "mongodb+srv://everywhere:Arbnd2064@cluster0.jnekl3m.mongodb.net/guesss"
    );
  })();
} catch (err) {
  return err;
}
let schema = new mongodb.Schema({
  name: String,
  time: String,
});
let proper = new mongodb.Schema({
  name: String,
});
let schemaModel = mongodb.model("names", schema);
let properModel = mongodb.model("proper", proper);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const server = http.createServer(app);

app.get("/:name", async (Req, Res) => {
  const name = Req.params.name;
  console.log("name: ", name);
  let names = await properModel.find({});
  if (names.length > 1) {
    return Res.status(400).json({
      message: "you can't view this again, sorry",
    });
  }
  let data = new schemaModel({
    name,
    time: new Date().toISOString(),
  });
  await data.save();
  if (names[0].name === name.toLowerCase()) {
    const data = new properModel({
      name,
    });
    await data.save();
    return Res.status(200).json({
      message:
        "I chose you because I genuinely like you. Your personality is unique, and I enjoy our conversations. You're not like anyone else, and that's what makes you special to me. Please don't put yourself down by calling yourself 'dumb'—I find you intelligent and engaging. Let's focus on our connection and building a positive relationship together(friendzone), I think you are like my stereotype.",
    });
  }
  return Res.status(404).json({
    message: "wrong guess",
  });
});

server.listen(8000, () => console.log("server listening on port 8000"));
