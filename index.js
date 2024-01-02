import express from "express";

import movieRoutes from "./movie.routes.js";// on the fly change 

import userRoutes from "./user.routes.js";
const app = express();

// to make app understand json
app.use(express.json());

//  register routes
app.use(movieRoutes);
app.use(userRoutes);

// port
const port = 5000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
