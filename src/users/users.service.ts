import { Injectable, UnauthorizedException } from '@nestjs/common';
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
