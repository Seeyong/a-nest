import { DataSource, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Workspaces } from '../../entities/Workspaces';
import { Channels } from '../../entities/Channels';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const workspaceRepository: Repository<Workspaces> =
      dataSource.getRepository(Workspaces);
    await workspaceRepository.insert([
      {
        id: 1,
        name: 'Sleact',
        url: 'sleact',
      },
    ]);
    const channelsRepository: Repository<Channels> =
      dataSource.getRepository(Channels);
    await channelsRepository.insert([
      {
        id: 1,
        name: '일반',
        WorkspaceId: 1,
        private: false,
      },
    ]);
  }
}
