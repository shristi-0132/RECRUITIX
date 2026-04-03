const express = require("express");
const router = express.Router();
 
const { getMe, getUserById, updateMe } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
 
router.get("/me", verifyToken, getMe);
router.put("/me", verifyToken, updateMe);
router.get("/:user_id", verifyToken, allowRoles("recruiter"), getUserById);
 
module.exports = router;
