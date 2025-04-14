import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

describe('TeamController', () => {
  let teamController: TeamController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamService],
    }).compile();

    teamController = app.get<TeamController>(TeamController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(teamController.getHello()).toBe('Hello World!');
    });
  });
});
