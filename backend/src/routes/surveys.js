const express = require("express"); const router = express.Router(); const c = require("../controllers/surveyController"); const {authenticate}=require("../middleware/auth");
router.post("/",authenticate,c.createSurvey); router.get("/",c.getSurveys); router.get("/:id",c.getSurveyById); router.post("/responses",authenticate,c.submitResponse); module.exports = router;
