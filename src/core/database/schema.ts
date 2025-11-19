export interface AnnouncementTable {
  id: number;
  title: string;
  description: string;
  date: Date;
  image_url: string | null;
  created_at: Date;
}

export interface ContactTable {
  id: number;
  full_name: string;
  email: string;
  phone_number: string | null;
  message: string;
  created_at: Date;
}

export interface Database {
  announcements: AnnouncementTable;
  contacts: ContactTable;
  // future: students, results, etc.
}
