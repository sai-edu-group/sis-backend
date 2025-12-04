// MODULES //
import { SioneersService } from "./sioneers.service";

// OTHERS //
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

@Controller("sioneers")
export class SioneersController {
  constructor(private readonly sioneersService: SioneersService) {}

  /**
   * Fetches sioneers (students) for a given academic year.
   *
   * @param year - Academic year as a number (e.g., 2024)
   * @returns List of sioneers for that year
   */
  @Get("get-sioneers")
  async getSioneers(@Query("year") year: string) {
    // validate year query parameter
    if (!year) {
      throw new BadRequestException("Year query parameter is required");
    }

    // Parse year to integer
    const academicYear = parseInt(year, 10);

    // Check if the parsed year is a valid number
    if (isNaN(academicYear)) {
      throw new BadRequestException("Year must be a valid number");
    }

    // Fetch and return sioneers data for the specified year
    return this.sioneersService.getSioneersByYear(academicYear);
  }
}
