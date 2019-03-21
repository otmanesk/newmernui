import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import cors from "cors";
import chalk from "chalk";

const app = express();
const PORT = 5000;

require("./models/User");
const User = mongoose.model("User");

mongoose.connect(
  "mongodb://localhost:27017/user",
  { useNewUrlParser: true, useMongoClient: true },
  () => console.log(chalk.bgGreen("Connected to the db"))
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");

  // a document instance
  var user1 = new User({
    name: "rajae",
    status: "stagiaire",
    agency: "rabat",
    gender: "femme",
    birthday: "09/11/1996"
  });

  // save model to database
  user1.save(function(err, book) {
    if (err) return console.error(err);
    console.log(user1.name);
  });
});

app.use(cors("*"));

const server = new ApolloServer({ typeDefs, resolvers, context: { User } });
server.applyMiddleware({ app });

app.get("/api", (req, res) => {
  res.json({ ItWorks: "Hell yeaah" });
});

app.listen(PORT, () => {
  console.log(
    chalk.bgGreen(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
});
