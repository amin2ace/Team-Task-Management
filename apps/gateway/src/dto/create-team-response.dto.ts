import { PartialType } from '@nestjs/swagger';
import { CreateTeamRequestDto } from './create-team-request.dto';

export class CreateTeamResponseDto implements Partial<CreateTeamRequestDto> {}
