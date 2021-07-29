import { Router } from "express";
import { StudentController } from "./controllers/StudentController";

const router = Router();

const studentController = new StudentController();

router.get("/students", studentController.index);
router.get("/students/:id", studentController.show);
router.get("/students/ra/:ra", studentController.findStudentByRa);
router.post("/students", studentController.store);
router.put("/students/:id", studentController.update);
router.delete("/students/:id", studentController.destroy);

export { router };