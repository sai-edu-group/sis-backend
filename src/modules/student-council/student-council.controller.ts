// CORE //
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { StudentCouncilService } from './student-council.service';

@Controller('student-council')
export class StudentCouncilController {
  constructor(private readonly service: StudentCouncilService) {}

  @Get('by-year')
  async getByYear(@Query('year') year?: string) {
    if (!year) throw new BadRequestException('year is required');
    const n = parseInt(year, 10);
    if (isNaN(n)) throw new BadRequestException('year must be a number');
    return this.service.getByYear(n);
  }
}
