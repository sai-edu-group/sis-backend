// CORE //
import { Body, Controller, Post } from "@nestjs/common";

// SERVICES //
import { ContactService } from "@/modules/contact/contact.service";

// DTO //
import type { CreateContactDto } from "@/modules/contact/dto/create-contact.dto";
import type { CreateNewsletterDto } from "@/modules/contact/dto/create-newsletter.dto";

@Controller("contacts")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * POST: "/contacts"
   * @param payload 
   * @returns 
   */
  @Post()
  createContact(@Body() payload: CreateContactDto) {
    return this.contactService.createContact(payload);
  }

  /**
   * POST: "/contacts/newsletter"
   * @param payload 
   * @returns 
   */
  @Post("newsletter")
  subscribeNewsletter(@Body() payload: CreateNewsletterDto) {
    return this.contactService.subscribeNewsletter(payload);
  }
}
