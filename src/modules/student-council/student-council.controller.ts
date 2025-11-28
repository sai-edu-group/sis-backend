// CORE //
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { StudentCouncilService } from '@/modules/student-council/student-council.service';

@Controller('student-council')
export class StudentCouncilController {
  constructor(private readonly service: StudentCouncilService) {}
  /**
 * GET 
 * @param year 
 * @returns 
 */
  @Get('by-year')
  async getByYear(@Query('year') year?: string) {
    if (!year) throw new BadRequestException('year is required');
   const academicYear = parseInt(year, 10);
    if (isNaN(academicYear)) throw new BadRequestException('year must be a number');
    return this.service.getByYear(academicYear);
  }
}
