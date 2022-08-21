const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  add,
  users,
  userById,
  update,
  deleteuser,
  verifyProfile,
  revokePortal,
  accessPortal,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.route("/add").post(
  check("firstName", "Please enter first name for user").not().isEmpty(),
  check("lastName", "Please enter last name for user").not().isEmpty(),
  check("email", "Please enter an email address").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("email", "Email already exists. Please try another.").exists(),
  check("password", "Please enter an password").not().isEmpty(),
  check("password", "Password must be greater then 6 characters").isLength({ min: 6 }),
  check("phone", "Please enter phone number").not().isEmpty(),
  check("phone", "Number must contain dash after company code").isLength({ min: 12 }),
  check("dob", "dob is required for the user").not().isEmpty(),
  add
);
router.route("/all").get(auth, users);
router.route("/get-single/:id").get(auth, userById);
router.route("/:id").put(
    check("firstName", "Please enter first name for user").not().isEmpty(),
    check("lastName", "Please enter last name for user").not().isEmpty(),
    check("email", "Please enter an email address").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("email", "Email already exists. Please try another.").exists(),
    check("phone", "Please enter phone number").not().isEmpty(),
    check("phone", "Number must contain dash after company code").isLength({ min: 12 }),
    check("dob", "dob is required for the user").not().isEmpty(),
  auth,
  update
);
router.route("/:id").delete(auth, deleteuser);
router.route("/verify-profile/:id").get(auth, verifyProfile);
router.route("/revoke-portal/:id").get(auth, revokePortal);
router.route("/access-portal/:id").get(auth, accessPortal);

module.exports = router;
