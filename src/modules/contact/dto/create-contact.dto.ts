export interface CreateContactDto {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  reason?: string;
  message: string;
}
