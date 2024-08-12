import { PrismaClient } from "@prisma/client";

const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const prisma = new PrismaClient();

app.post("/register", async (req: any, res: any) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  res.send(user);
});

app.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });
  if (user) {
    if (user.password === password) {
      res.status(200).send(user.email);
    } else {
      res.status(401).send("Invalid password");
    }
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
