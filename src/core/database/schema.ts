export interface MasterSchoolTable {
  id: number;
  school_name: string;
  school_address: string;
  status: string;
}

export interface SisAwardsTable {
  id: number;
  awardname: string;
  session_name: string;
  awarddesc: string;
  thumbnailimg: string | null;
  status: number;
  entrydate: Date;
  awardrecdate: Date;
  updatedate: Date;
}

export interface ResultCbseSisTable {
  id: number;
  session_name: string;
  admno: string;
  studname: string;
  class_name: string;
  studprofilepic: string | null;
  percentage: string;
  status: number;
  entrydate: Date;
  updatedate: Date;
}

export interface ResultCareerSisTable {
  id: number;
  session_name: string | null;
  admno: string | null;
  studname: string | null;
  class_name: string | null;
  studprofilepic: string | null;
  examname: string | null;
  percentage: string | null;
  schoolid: string | null;
  status: number | null;
  entrydate: Date | null;
  updatedate: Date | null;
}

export interface MasterClassTable {
  id: number;
  class_name: string;
  il_name: string;
  cil_name: string;
  principal_name: string;
  boardid: string;
  schoolid: string;
  status: number;
  entrydate: Date;
  updatedate: Date;
}

export interface WebSisPressreleaseTable {
  id: number;
  presstitle: string;
  pressdate: Date;
  presslink: string;
  pressthumbnail: string;
  pressimage: string;
  entrydate: Date;
  status: number;
  updatedate: Date;
}

export interface WebSisScouncilTable {
  id: number;
  session_name: string;
  admno: string;
  studname: string;
  designation: string;
  class_name: string;
  studprofilepic: string | null;
  countryname: string;
  status: number;
  sorting: number;
  entrydate: Date;
  updatedate: Date;
}

export interface WebGlobalSaioneersTable {
  id: number;
  session_name: string;
  admno: string;
  univname: string;
  studprofilepic: string | null;
  countryname: string;
  status: number;
  entrydate: Date;
  updatedate: Date;
}

export interface SisWebGalleryTable {
  gallery_id: number;
  gallery_title: string;
  gallery_sub_title: string;
  gallery_thumbnail: string;
  gallery_year: number;
  gallery_photo_path: string;
  gallery_photo: string;
  gallery_status: number;
  created_by: number;
  created_on: Date;
}

export interface SisBlogsTable {
  blog_id: number;
  blog_title: string;
  blog_details: string;
  blog_thumbnail: string;
  blog_banner: string;
  blog_category: number;
  blog_photo_path: string;
  blog_photo: string;
  blog_status: number;
  created_by: number;
  created_on: Date;
}

export interface SisBlogCategoryTable {
  category_id: number;
  category_title: string;
  category_status: number;
  category_icon_path: string;
  created_on: Date;
}

export interface SisWebYearTable {
  year_id: number;
  year_title: string | null;
  year_thumbnail: string | null;
  year_category: number | null;
  year_photo_path: string | null;
  year_status: number | null;
  created_by: number | null;
  created_on: Date;
}
export interface MasterSessionTable {
  id: number;
  session_name: string | null;
  session_startdate: Date | null;
  session_enddate: Date | null;
  schoolid: string | null;
  status: number | null;
  entrydate: Date | null;
  updatedate: Date | null;
}

export interface MasterCareerExamTable {
  id: number;
  career_exam_name: string | null;
  status: number | null;
  entrydate: Date | null;
  updatedate: Date | null;
}

// Export all the Tables
export interface Database {
  master_school: MasterSchoolTable;
  sis_awards: SisAwardsTable;
  result_cbse_sis: ResultCbseSisTable;
  result_career_sis: ResultCareerSisTable;
  master_class: MasterClassTable;
  web_sis_pressrelease: WebSisPressreleaseTable;
  web_sis_scouncil: WebSisScouncilTable;
  web_global_saioneers: WebGlobalSaioneersTable;
  sis_web_gallery: SisWebGalleryTable;
  sis_blog: SisBlogsTable;
  blog_category: SisBlogCategoryTable;
  sis_web_year: SisWebYearTable;
  master_session: MasterSessionTable;
  master_careerexam: MasterCareerExamTable;
}
