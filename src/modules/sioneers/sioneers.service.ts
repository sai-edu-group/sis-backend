// CORE //
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Kysely } from "kysely";

// DB SCHEMA //
import { Database } from "@/core/database/schema";

// SERVICE //
@Injectable()
export class SioneersService {
  constructor(
    @Inject("DB") private readonly db: Kysely<Database>,
  ) {}


  /**   * Fetch sioneers data for a given academic year
   * @param year 
   * @throws 
   */
async getSioneersByYear(year: number) {
    if(!year){
        throw new InternalServerErrorException('Invalid year provided');
    }
// Define start and end dates for the academic year
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const end = new Date(year, 11, 31, 23, 59, 59, 999);
    // Query to the database where display sioneers within the date range also status is active (1)
    try{
        const row=await this.db.selectFrom('web_global_saioneers') .select(['id','admno as admissionNumber','univname as universityName','class_name as className','studprofilepic as profilePicture','countryname as countryName',
  ]).where('status','=',1).where('entrydate','>=',start).where('entrydate','<=',end).orderBy('id').execute();
        return row;
    }
// Error handling for database query
    catch (error) 
    {
      throw new InternalServerErrorException({
        message: 'Unable to fetch sioneers data',
        detail: error?.message ?? String(error),
      });
    }
}
}