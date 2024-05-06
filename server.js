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
      message: `Hey, Hello My name is Arbind. Just an ordinary student,
with an IQ of 144. (INTJ-T)
I have had no friends till now. So I just want to create some memories with someone who can understand me, and I can do so too. We have only had 11 months.
I just can't be someone's friend if she or he has a girlfriend or boyfriend.

(I am not comfortable in it)
So leave these things; I just don't like them.
I know I am sending it to you because I really like you. It's so rare for me to talk to anyone or give them such valuable time. If you receive it, you are lucky.
I know you may have some interest in your boyfriend. But I will be sure that, analyzing everything you said and your behavior, it won't seem that you have any feelings for him.
You just don't know what a relationship means. it not about you are the GF and he is  BF. even as friends. You understand what it means.
So I just wanted to say, if you can't leave your boyfriend, I am just continuing to be alone and happy. I am not forcing you to do anything at all. If you have even a little feeling for me, just let me know. Then I will know I chose the right person. Just listen to your mind and heart and make the decision. If you want to experience something big and such as what you saw in a movie, Just be with me, and let's do something big together. I know you don't know anything about programming, but I'm not a finding a programmer, just the type of person with the mindset. (we have 11 months.)
Sorry for that unexpected behavior where I held your hand. I actually just don't want to see you fall from that. but after all, you proved me wrong. and btw it's may uncomfortable for you. (sorry 2x)
I don't say sorry; it's also super rare that I am saying it to someone.
So just leave your boyfriend He may waste your time, for sure.
Otherwise, I will not be there for you. Just go and enjoy with your BF. This is what I was saying.
If you understand my words, then just say what you have in mind. Say whatever you won't; I don't care much. Don't think I get hurt or something.
I'm waiting for your reply. I just want to hear your real thoughts. *be honest*

I know just everything what is a lie and what is a truth.`,
    });
  }
  return Res.status(404).json({
    message: "wrong guess",
  });
});

server.listen(8000, () => console.log("server listening on port 8000"));
