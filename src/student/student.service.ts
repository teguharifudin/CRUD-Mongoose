import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { IStudent } from './interface/student.interface';
import { Model } from "mongoose";
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel: Model<IStudent>) { }

    async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
        const newStudent = await new this.studentModel(createStudentDto);
        return newStudent.save();
    }

    async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
        const existingStudent = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
        if (!existingStudent) {
            throw new NotFoundException('Student #${id} not found');
        }
        return existingStudent;
    }

    async getAllStudents(): Promise<IStudent[]> {
        const studentData = await this.studentModel.find();
        if (!studentData || studentData.length == 0) {
            throw new NotFoundException('Students data not found!');
        }
        return studentData;
    }

    async getStudent(id: string): Promise<IStudent> {
        const existingStudent = await this.studentModel.findById(id).exec();
        if (!existingStudent) {
            throw new NotFoundException('Student #${id} not found');
        }
        return existingStudent;
    }

    async deleteStudent(id: string): Promise<IStudent> {
        const deletedStudent = await this.studentModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            throw new NotFoundException('Student #${id} not found');
        }
        return deletedStudent;
    }
}