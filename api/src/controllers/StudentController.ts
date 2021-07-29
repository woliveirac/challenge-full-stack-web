import {Request, Response} from "express";
import {StudentService} from "../services/StudentService";

export class StudentController {

    async index(request: Request, response: Response) {
        const studentService = new StudentService();
        const students = await studentService.list();
        return response.json(students);
    }

    async findStudentByRa(request: Request, response: Response) {
        const { ra } = request.params;
        const studentService = new StudentService();
        const student = await studentService.findStudentByRa(ra);
        return response.json(student);
    }

    async show(request: Request, response: Response) {
        const { id: student_id } = request.params;
        const studentService = new StudentService();
        const student = await studentService.edit(parseInt(student_id));
        return response.json(student);
    }

    async store(request: Request, response: Response) {
        const { name, email, ra, cpf } = request.body;
        let cleanCPF = cpf.replace(/\D/g, "");
        const studentService = new StudentService();
        const students = await studentService.store({ name, email, ra, cleanCPF });
        return response.json(students);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email } = request.body;
        const studentService = new StudentService();
        const students = await studentService.update(parseInt(id), {name, email});
        return response.json(students);
    }

    async destroy(request: Request, response: Response) {
        const { id: student_id } = request.params;
        const studentService = new StudentService();
        await studentService.delete(parseInt(student_id));
        return response.status(204).send();
    }
}