import {getCustomRepository} from "typeorm";
import {StudentRepository} from "../repositories/StudentRepository";

interface IStudentCreateRequest {
    name: string;
    email: string;
    ra: string;
    cleanCPF: string;
}

interface IStudentUpdateRequest {
    name: string;
    email: string;
}

export class StudentService {

    async list() {
        const studentRepository = getCustomRepository(StudentRepository);

        const students = await studentRepository.find();

        return students;
    }

    async edit(student_id: number) {
        const studentRepository = getCustomRepository(StudentRepository);

        const student = await studentRepository.findOne(student_id);

        return student;
    }

    async findStudentByRa(ra: string) {
        const studentRepository = getCustomRepository(StudentRepository);

        const student = await studentRepository.findOne({where: {ra: ra}});

        return student;
    }

    async store({name, email, ra, cleanCPF}: IStudentCreateRequest) {
        const studentRepository = getCustomRepository(StudentRepository);

        const studentExists = await studentRepository.findOne(ra);

        if(studentExists) {
            throw new Error ("Student already exists");
        }

        return await studentRepository.save({
            name,
            email,
            ra,
            "cpf": cleanCPF
        });;
    }

    
    async update(student_id: number, {name, email}: IStudentUpdateRequest) {
        const studentRepository = getCustomRepository(StudentRepository);

        const student = await studentRepository.findOne(student_id);

        if(!student) {
            throw new Error ("Student not found");
        }

        return await studentRepository.update({
            id: student_id
        }, {name, email});
    }

    
    async delete(student_id: number) {
        const studentRepository = getCustomRepository(StudentRepository);

        return await studentRepository.delete(student_id);
    }
}
