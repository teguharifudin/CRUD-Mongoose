import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'studentdb'}),
  StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}