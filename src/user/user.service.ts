import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  generateRandomPassword(length: number) {
    let password = '';
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const array = new Uint32Array(length);
    // global.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }

    return password;
  }

  generateSalt() {
    return crypto.randomBytes(128).toString('base64');
  }

  generateHashedPass(password: string, salt: string) {
    return crypto.createHmac('sha512', salt).update(password).digest('hex');
  }

  async sendPasswordEmail(password: string) {
    const transporter = nodemailer.createTransport({
      service: 'mail.service',
      auth: {
        user: 'some-noreply-mail@mail.com',
        pass: 'password123',
      },
    });

    await transporter.sendMail({
      from: '"Aura Pool" <some-noreply-mail@mail.com>',
      to: 'farm_admin@mail.com',
      subject: '',
      text: `Your temporary password is ${password}. Please change that as soon as possible`,
      html: `<b>Your temporary password is ${password}. Please change that as soon as possible</b>`,
    });
  }

  async createFarmAdmin(createUserDto: CreateUserDto): Promise<User> {
    const password = this.generateRandomPassword(12);
    const salt = this.generateSalt();
    const hashedPass = this.generateHashedPass(password, salt);

    const user = {
      email: createUserDto.email,
      salt,
      hashedPass,
      role: 'farm_admin',
    };

    const farmAdmin = await User.create(user);

    await this.sendPasswordEmail(password);

    return farmAdmin;
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  getUser(email: string): Promise<User> {
    const user = this.userModel.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
