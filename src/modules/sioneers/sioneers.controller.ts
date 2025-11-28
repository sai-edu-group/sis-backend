// CORE //
import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";

// SERVICES //
import { SioneersService } from "@/modules/sioneers/sioneers.service";

// CONTROLLER //
@Controller("sioneers")
export class SioneersController {
    constructor(private readonly sioneersService: SioneersService) {}

    /**
     * GET 
     * @param year 
     * @returns 
    */
   

   @Get('get-sioneers')
   async getSioneers(@Query('year')year?:string)
   {
    // Validate year query parameter //  
    if(!year)
        {
           throw new BadRequestException('Year query parameter is required');
        }
        
        const academicYear=parseInt(year,10);
        // Check if the parsed year is a valid number //
        if(isNaN(academicYear))
            {
                throw new BadRequestException('Year must be a valid number');
            }
            
            return this.sioneersService.getSioneersByYear(academicYear);
        }
    }



