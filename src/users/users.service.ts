import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {}
  postUsers(email: string, nickname: string, password: string) {
    console.log(email, nickname, password);
  }
}
