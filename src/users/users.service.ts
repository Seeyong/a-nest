import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  postUsers(email: string, nickname: string, password: string) {
    console.log(email, nickname, password);
  }
}
