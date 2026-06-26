import e from "express";
import cors from "cors";

const app = e();
app.use(cors());
app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.listen(3000 || process.env.PORT);

let users = [
  { username: "rafa" },
  { username: "cristina" },
  { username: "Ralph" },
  { username: "Venellope" },
];

let messages = [
  { text: "hola", user1: "jose", user2: "felipe" },
  { text: "que tal", user1: "felipe", user2: "jose" },
  { text: "bien", user1: "jose", user2: "felipe" },
];

app.get("", (req, res) => {
  res.send({ text: "hello from my api" });
});

app.get("/users", (req, res) => {
  res.send({ users: users });
});

app.post("/register-user", (req, res) => {
  let user = req.body.user;
  users.push(user);
  res.send({ user: user, status: "ok" });
});

app.post("/login-user", (req, res) => {
  let user = req.body.user;
  let result = users.find((u) => u.username == user.username);

  res.send({ user: result, status: "ok" });
});

app.post("/register-message", (req, res) => {
  messages.push(req.body.message);
  console.log(messages);
  res.send({ data: req.body.message, status: "ok" });
});

app.post("/get-messages", (req, res) => {
  let user1 = req.body.user1;
  let user2 = req.body.user2;
  console.log(user1, user2);

  let result = [];
  messages.forEach((m) => {
    if (
      (m.user1 == user1 && m.user2 == user2) ||
      (m.user1 == user2 && m.user2 == user1)
    ) {
        result.push(m)
    }
  });
  res.send({ messages: result, status: "ok" });
});
