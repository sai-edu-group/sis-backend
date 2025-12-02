// MODULES //
import { SioneersService } from "@/modules/sioneers/sioneers.service";

// OTHERS //
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";

@Controller("sioneers")
export class SioneersController {
    constructor(private readonly sioneersService: SioneersService) {}

    /**
     * Returns sioneers (students) for a given academic year.
     *
     * @param year 
     * @returns 
     */
    
    @Get("get-sioneers")
    async getSioneers(@Query("year") year: string) {
        // Validate year query parameter  
        if (!year) {
            throw new BadRequestException("Year query parameter is required");
        }

        const academicYear = parseInt(year, 10);

        // Check if the parsed year is a valid number
        if (isNaN(academicYear)) {
            throw new BadRequestException("Year must be a valid number");
        }

        return this.sioneersService.getSioneersByYear(academicYear);
    }
}
