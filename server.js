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
let reply = new mongodb.Schema({
  reply: String,
});
let schemaModel = mongodb.model("names", schema);
let properModel = mongodb.model("proper", proper);
let replySchema = mongodb.model("reply", reply);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const server = http.createServer(app);

app.post("/reply", async (req, res) => {
  const { message } = req.body;
  let data = new replySchema({
    reply: message,
  });
  await data.save();
  res.status(200).json({
    message: "message sent",
    code: 200,
  });
});

app.get("/:name", async (Req, Res) => {
  const name = Req.params.name;
  console.log("name: ", name);
  let names = await properModel.find({});
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
      code: 444,
      message: `And probably u are judging me just because of that rumors: 
If that would be the case. I have never sent a message to you. or never even talk to you.
but I did.
cause u r thinking that if I would get someone better I will leave the previous one:
Nah, If you don't had in any relation, who would you leave the previous one.?? just don't be in relationships.
but my intentions were never that and nor it will be even tho I am feeling bad to say u no cause I really don't want to hurt someone's feeling:
Okay, if someone's get hurt by it.. I probably being A villian here.. 
(I am just trying to protect you and makesure you are going right).
and agar If we even started a relationship it's not gonna work becoz I don't think u can handle me i have a lot of drama which would surely annoy you so sorry🙏🏻:
I don't want put you in my life.. so good is to be a friend nothing more of it. In our whole conversation. I have never admire anykind of this things.. ??why you just thinking of it?? can you give a reason of it? (required)
I just want, that you should not be in any relationship. that's my whole point.
and I have wasted a lot your time probably:
No, probably I wasted my own, you just don't guilt of it.
so u don't need to make a web app it will surely take time  and I don't want to  disturb you more just stay when the school ends to continue this as a friend:
No, but i don't want to talk to you anymore. if you can't able understand my words. there is no such point to talk to you. i expressed my all feelings to you. but even you don't understand how to reply.
I expecting you to say something your mind wants to say, you just ignoring that texts for sure.
or just leave to end this here:
I will probably. I shall talk to you wednesday and I will make sure if I should continue or not. that might our last conversation.
by have a gud sleep and never say that again that I am gonna to rest innn piece by:
I have now nothing to say, so i am expecting you to say something.. I forcing my energy here means I make sure, my words don't hurt you.
you should be more mature now. we are not kids anymore..`,
    });
  }
  return Res.status(404).json({
    message: "wrong guess",
  });
});

server.listen(8000, () => console.log("server listening on port 8000"));
