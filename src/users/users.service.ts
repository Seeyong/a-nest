import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ChannelMembers } from '../entities/ChannelMembers';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    private dataSource: DataSource,
  ) {}

  getUser(): void {}
  async join(
    email: string,
    nickname: string,
    password: string,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    const user: Users = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('잘못된 요청값입니다');
    }
    const hashedPassword: string = await bcrypt.hash(password, 12);
    const returned = this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.workspaceMembersRepository.save({
      UserId: (await returned).id,
      WorkspaceId: 1,
    });
    await this.channelMembersRepository.save({
      UserId: (await returned).id,
      ChannelId: 1,
    });
    return true;
  }
}
