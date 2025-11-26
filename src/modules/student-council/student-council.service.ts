 // CORE //
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from '@/core/database/schema';

@Injectable()
export class StudentCouncilService {
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {}

  async getByYear(year: number) {
  if (!Number.isInteger(year)) {
    throw new InternalServerErrorException('invalid year');
  }

  const start = new Date(year, 0, 1, 0, 0, 0, 0);
  const end = new Date(year, 11, 31, 23, 59, 59, 999);

  try {
    const rows = await this.db
      .selectFrom('web_sis_scouncil')
      .select([
        'id',
        'admno as admissionNumber',
        'studname as studentName',
        'designation',
        'class_name as className',
        'studprofilepic as studentProfilePic',
      ])
      .where('status', '=', 1)
      .where('entrydate', '>=', start)
      .where('entrydate', '<=', end)
      .orderBy('sorting')
      .execute();

    return rows;
  } 
  catch (error) 
  {
    console.error('StudentCouncilService.getByYear error:', error);
    throw new InternalServerErrorException({
      message: 'Unable to fetch student council data',
      detail: error?.message ?? String(error),
    });
  }
}
}