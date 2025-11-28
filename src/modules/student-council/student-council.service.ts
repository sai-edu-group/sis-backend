// CORE
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from '@/core/database/schema';

@Injectable()
export class StudentCouncilService {
  constructor(@Inject('DB') private readonly db: Kysely<Database>) {}

  /**
   * Fetches the student council entries for a specific academic year.
   * @param academicYear - The academic year as a number (e.g. 2024)
   * @returns Array of student council records
   */
  async getByYear(academicYear: number) {
    // Validate year input (service assumes controller has already validated)
    if (!Number.isInteger(academicYear)) {
      throw new InternalServerErrorException('Invalid academic year received');
    }

    // Construct date range for given year
    const startOfYear = new Date(academicYear, 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(academicYear, 11, 31, 23, 59, 59, 999);

    try {
      // Query student council rows for the given academic year
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
        .where('entrydate', '>=', startOfYear)
        .where('entrydate', '<=', endOfYear)
        .orderBy('sorting')
        .execute();

      return rows;
    } catch (error) {
      // Wrap database failures in an Internal Server Error response
      throw new InternalServerErrorException({
        message: 'Unable to fetch student council data',
        detail: error?.message ?? String(error),
      });
    }
  }
}
