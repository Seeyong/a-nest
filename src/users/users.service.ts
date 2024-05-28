import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '../entities/Users';
import { DataSource } from 'typeorm';
import bcrypt from 'bcrypt';
import { ChannelMembers } from '../entities/ChannelMembers';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  getUser(): void {}
  async join(email: string, nickname: string, password: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user: Users = await queryRunner.manager
        .getRepository(Users)
        .findOne({
          where: { email },
        });
      if (user) {
        throw new UnauthorizedException('이미 존재하는 사용자입니다.');
      }
      const hashedPassword: string = await bcrypt.hash(password, 12);
      const returned = queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: (await returned).id,
        WorkspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: (await returned).id,
        ChannelId: 1,
      });
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
