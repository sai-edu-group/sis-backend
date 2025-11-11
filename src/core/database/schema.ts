export interface AnnouncementTable {
  id: number;
  title: string;
  description: string;
  date: Date;
  image_url: string | null;
  created_at: Date;
}

export interface Database {
  announcements: AnnouncementTable;
  // future: students, results, etc.
}
