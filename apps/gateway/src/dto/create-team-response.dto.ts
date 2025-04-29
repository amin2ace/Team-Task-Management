import { Expose } from 'class-transformer';

export class CreateTeamResponseDto {
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  members?: string[];

  @Expose()
  avatarUrl?: string;
}
