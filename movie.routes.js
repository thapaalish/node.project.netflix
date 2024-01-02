import express from "express";

const router = express.Router();
let movieList = [
  {
    id: 1,
    name: "The Days",
    genre: ["documentary", "history", "drama"],
    type: "series",
    episode: 5,
    rating: 4.5,
  },
];
// add movie

router.post("/movie/add", (req, res) => {
  const newMovie = req.body;

  movieList.push(newMovie);
  // console.log(movieList);
  return res.status(201).send({ message: "Movie is added successfully" });
});

// get movie list

router.get("/movie/list", (req, res) => {
  return res.status(200).send(movieList);
});

// edit movie
router.put("/movie/edit/:id", (req, res) => {
  // extract id from params

  const movieIdToBeEdited = Number(req.params.id);

  // extract new values from req.body
  const newValues = req.body;

  // check if movie with provided id exists

  const requiredMovie = movieList.find((item, index, self) => {
    return item.id === movieIdToBeEdited;
  });

  // if not movie, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }

  // edit movie
  const updatedMovieList = movieList.map((item, index, self) => {
    if (item.id === movieIdToBeEdited) {
      return { ...item, ...newValues };
    } else {
      return item;
    }
  });

  movieList = structuredClone(updatedMovieList);

  // send appropriate response
  return res.status(200).send({ message: "Movie is updated successfully." });
});

// delete movie
router.delete("/movie/delete/:id", (req, res) => {
  // extract id from req.params
  const movieIdToBeDeleted = +req.params.id;

  // check if movie with provided id exists
  const requiredMovie = movieList.find((item, index, self) => {
    return item.id === movieIdToBeDeleted;
  });

  // if not movie, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }

  // delete movie
  const newMovieList = movieList.filter((item, index, self) => {
    return item.id !== movieIdToBeDeleted;
  });

  // update original array
  movieList = structuredClone(newMovieList);

  // send appropriate response
  return res.status(200).send({ message: "Movie is deleted successfully." });
});

// get movie details
router.get("/movie/details/:id", (req, res) => {
  // extract movie id from params
  const movieId = +req.params.id;

  // check if movie with provided id exists
  const requiredMovie = movieList.find((item, index, self) => {
    if (item.id === movieId) {
      return item;
    }
  });

  // if not movie, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist " });
  }

  // return response with movie details
  return res.status(200).send({ requiredMovie });
});

export default router;
