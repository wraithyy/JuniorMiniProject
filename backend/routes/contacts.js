const router = require("express").Router();
const contactController = require("../controllers/contactController");
// Contact routes

router.get("/", contactController.index);
router.post("/", contactController.new);
router.get("/:contact_id", contactController.view);
router.patch("/:contact_id", contactController.update);
router.put("/:contact_id", contactController.update);
router.delete("/:contact_id", contactController.delete);

module.exports = {
  router,
  basePath: "/contacts",
};
