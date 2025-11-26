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
  class_name: string;
  studprofilepic: string | null;
  countryname: string;
  status: number;
  entrydate: Date;
  updatedate: Date;
}

// Export all the Tables
export interface Database {
  master_school: MasterSchoolTable;
  sis_awards: SisAwardsTable;
  result_cbse_sis: ResultCbseSisTable;
  master_class: MasterClassTable;
  web_sis_pressrelease: WebSisPressreleaseTable;
  web_sis_scouncil: WebSisScouncilTable;
  web_global_saioneers: WebGlobalSaioneersTable;
}
