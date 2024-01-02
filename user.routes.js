import express from "express";
const router = express.Router();

let userList = [
  {
    id: 1,
    firstName: "alish",
    lastName: "thapa",
    email: "alish@gmail.com",
    address: "Chitwan",
  },
];
// add user

router.post("/user/add", (req, res) => {
  //console.log(req.body);

  const newUser = req.body;
  userList.push(newUser);
  // console.log(userList);
  return res.status(201).send("adding user");
});

// user list
router.get("/user/list", (req, res) => {
  return res.status(200).send(userList);
});

// edit user
router.put("/user/edit/:id", (req, res) => {
  // extract id from params
  const userIdToBeEdited = Number(req.params.id);

  // extract new values from req.body
  const newValues = req.body;

  // check if user with provided id exists
  const requiredUser = userList.find((item, index, self) => {
    return item.id === userIdToBeEdited;
  });

  // if not movie throw error
  if (!requiredUser) {
    return res.status(404).send({ message: "User is not found here." });
  }

  // edit user
  const updatedUserList = userList.map((item) => {
    if (item.id === userIdToBeEdited) {
      return {
        id: requiredUser.id,
        ...newValues,
      };
    } else {
      return item;
    }
  });

  userList = structuredClone(updatedUserList);

  // send appropriate response
  return res.status(200).send({ message: "User is Updated Successfully." });
});

// Delete user
router.delete("/user/delete/:id", (req, res) => {
  // extract id from req.params
  const userIdToBeDeleted = +req.params.id;

  // check if movie with provided id exists
  const requiredUser = userList.find((item) => {
    return item.id === userIdToBeDeleted;
  });

  // if not user throw error
  if (!requiredUser) {
    return res.status(404).send({ message: "user does not exist." });
  }

  // delete user
  const newUserList = userList.filter((item) => {
    return item.id !== userIdToBeDeleted;
  });

  // update original array
  userList = structuredClone(newUserList);

  // send appropriate response
  return res.status(200).send({ message: "user is updated successfully." });
});

//get user details
router.get("/user/details/:id", (req, res) => {
  // extract user id from params
  const userId = +req.params.id;

  // check if user with provided id exists
  const requiredUser = userList.find((item) => {
    if (item.id === userId) {
      return item;
    }
  });

  // if not user throw error
  if (!requiredUser) {
    return res.status(404).send({ message: "user does not exists." });
  }

  // return response with user details
  return res.status(200).send(requiredUser);
});

export default router;
