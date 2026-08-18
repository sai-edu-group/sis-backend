# Database Tables

MariaDB database `erpschool`, read through Kysely. Column definitions below are the live `information_schema` definitions, verified 2026-08-18. Every column except the auto-increment primary keys and the three `created_on` columns is nullable.

| Table | Primary key | Rows |
| --- | --- | --- |
| `master_school` | `id` | 3 |
| `master_session` | `id` | 28 |
| `master_class` | `id` | 37 |
| `master_careerexam` | `id` | 9 |
| `sis_awards` | `id` | 42 |
| `result_cbse_sis` | `id` | 2,191 |
| `result_career_sis` | `id` | 684 |
| `web_sis_scouncil` | `id` | 357 |
| `web_global_saioneers` | `id` | 125 |
| `web_sis_pressrelease` | `id` | 95 |
| `sis_web_gallery` | `gallery_id` | 128 |
| `sis_web_year` | `year_id` | 19 |
| `sis_blog` | `blog_id` | 722 |
| `blog_category` | `category_id` | 3 |

## `master_school`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `school_name` | `longtext` | Yes | |
| `school_address` | `longtext` | Yes | |
| `status` | `varchar(10)` | Yes | |
| `logofile` | `varchar(100)` | Yes | |

## `master_session`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `session_name` | `varchar(100)` | Yes | |
| `session_startdate` | `date` | Yes | |
| `session_enddate` | `date` | Yes | |
| `schoolid` | `varchar(100)` | Yes | |
| `active_session` | `varchar(10)` | Yes | |
| `status` | `int(2)` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `master_class`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `class_name` | `varchar(100)` | Yes | |
| `icard_name` | `varchar(50)` | Yes | |
| `il_name` | `varchar(100)` | Yes | |
| `cil_name` | `varchar(100)` | Yes | |
| `principal_name` | `varchar(100)` | Yes | |
| `boardid` | `varchar(50)` | Yes | |
| `schoolid` | `varchar(100)` | Yes | |
| `status` | `int(2)` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |
| `sorting` | `int(11)` | Yes | |

## `master_careerexam`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `career_exam_name` | `varchar(100)` | Yes | |
| `schoolid` | `int(11)` | Yes | |
| `status` | `int(11)` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `sis_awards`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `awardname` | `varchar(100)` | Yes | |
| `session_name` | `varchar(100)` | Yes | |
| `awarddesc` | `varchar(100)` | Yes | |
| `thumbnailimg` | `longtext` | Yes | |
| `status` | `int(11)` | Yes | |
| `awardrecdate` | `date` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `result_cbse_sis`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `session_name` | `varchar(50)` | Yes | |
| `admno` | `varchar(50)` | Yes | |
| `studname` | `varchar(250)` | Yes | |
| `class_name` | `varchar(100)` | Yes | |
| `studprofilepic` | `longtext` | Yes | |
| `percentage` | `varchar(250)` | Yes | |
| `status` | `int(2)` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `result_career_sis`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `session_name` | `varchar(50)` | Yes | |
| `admno` | `varchar(50)` | Yes | |
| `studname` | `varchar(250)` | Yes | |
| `class_name` | `varchar(100)` | Yes | |
| `studprofilepic` | `longtext` | Yes | |
| `examname` | `varchar(200)` | Yes | |
| `percentage` | `varchar(250)` | Yes | |
| `schoolid` | `varchar(100)` | Yes | |
| `status` | `int(2)` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `web_sis_scouncil`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `session_name` | `varchar(50)` | Yes | |
| `admno` | `varchar(50)` | Yes | |
| `studname` | `varchar(250)` | Yes | |
| `designation` | `varchar(100)` | Yes | |
| `class_name` | `varchar(100)` | Yes | |
| `studprofilepic` | `longtext` | Yes | |
| `status` | `int(2)` | Yes | |
| `sorting` | `int(11)` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `web_global_saioneers`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `session_name` | `varchar(50)` | Yes | |
| `admno` | `varchar(50)` | Yes | |
| `studname` | `varchar(200)` | Yes | |
| `univname` | `varchar(250)` | Yes | |
| `studprofilepic` | `longtext` | Yes | |
| `countryname` | `varchar(250)` | Yes | |
| `status` | `int(2)` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `web_sis_pressrelease`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `id` | `int(11)` auto_increment | No | PRI |
| `presstitle` | `varchar(100)` | Yes | |
| `pressdate` | `date` | Yes | |
| `presslink` | `longtext` | Yes | |
| `pressthumbnail` | `longtext` | Yes | |
| `pressimage` | `longtext` | Yes | |
| `entrydate` | `datetime` | Yes | |
| `status` | `int(11)` | Yes | |
| `updatedate` | `datetime` | Yes | |

## `sis_web_gallery`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `gallery_id` | `int(10)` auto_increment | No | PRI |
| `gallery_title` | `varchar(255)` | Yes | |
| `gallery_sub_title` | `varchar(255)` | Yes | |
| `gallery_thumbnail` | `varchar(255)` | Yes | |
| `gallery_year` | `int(10)` | Yes | |
| `gallery_photo_path` | `varchar(255)` | Yes | |
| `gallery_photo` | `varchar(2555)` | Yes | |
| `gallery_status` | `int(10)` | Yes | |
| `created_by` | `int(10)` | Yes | |
| `created_on` | `datetime` | No | |

## `sis_web_year`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `year_id` | `int(10)` auto_increment | No | PRI |
| `year_title` | `varchar(255)` | Yes | |
| `year_thumbnail` | `varchar(255)` | Yes | |
| `year_category` | `int(10)` | Yes | |
| `year_photo_path` | `varchar(255)` | Yes | |
| `year_status` | `int(10)` | Yes | |
| `created_by` | `int(10)` | Yes | |
| `created_on` | `datetime` | No | |

## `sis_blog`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `blog_id` | `int(10)` auto_increment | No | PRI |
| `blog_title` | `varchar(255)` | Yes | |
| `blog_details` | `mediumtext` | Yes | |
| `blog_thumbnail` | `varchar(255)` | Yes | |
| `blog_banner` | `varchar(250)` | Yes | |
| `blog_category` | `int(10)` | Yes | |
| `blog_photo_path` | `varchar(255)` | Yes | |
| `blog_photo` | `varchar(2555)` | Yes | |
| `blog_status` | `int(10)` | Yes | |
| `created_by` | `int(10)` | Yes | |
| `created_on` | `datetime` | No | |

## `blog_category`

| Column | Type | Null | Key |
| --- | --- | --- | --- |
| `category_id` | `int(10)` auto_increment | No | PRI |
| `category_title` | `varchar(255)` | Yes | |
| `category_status` | `int(10)` | Yes | |
| `category_icon_path` | `varchar(1000)` | Yes | |
| `created_on` | `datetime` | Yes | |
