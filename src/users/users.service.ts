import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  getUser() {}
  async join(email: string, nickname: string, password: string): Promise<void> {
    if (!email) {
      throw new BadRequestException('이메일이 없습니다.');
    }
    if (!nickname) {
      throw new BadRequestException('닉네임이 없습니다.');
    }
    if (!password) {
      throw new BadRequestException('패스워드가 없습니다.');
    }
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('잘못된 요청값입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
