// CORE //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely,sql } from "kysely";

// DB Schema //
import { Database } from "../../core/database/schema";

// ENUMS //
import { Tables } from "../../common/enums/database.enum";

const BLOG_TABLE = Tables.BLOGS as "sis_blog";
const BLOG_CATEGORY_TABLE = Tables.BLOG_CATEGORY as "blog_category";

@Injectable()
export class BlogsService {
  // Service to handle blog-related business logic
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}
  // Inject Kysely database instance for query building

  /**
   * Get the 10 latest blogs by date with category information.
   * Fetches blogs with INNER JOIN to blog_category table.
   *
   * @returns Array of latest blogs with category name
   */
  async getLatestBlogs() {
    try {
      // Query the 10 latest blogs with category information
      const blogs = await this.db
        .selectFrom(Tables.BLOGS)
        // Select from sis_blog table
        .innerJoin(
          Tables.BLOG_CATEGORY,
          // INNER JOIN with blog_category table
          (join) =>
            join.onRef(
              "sis_blog.blog_category",
              "=",
              "blog_category.category_id"
            )
        )
        .select([
          "sis_blog.blog_id as id",
          "sis_blog.blog_title as title",
          "sis_blog.blog_details as details",
          "sis_blog.blog_thumbnail as thumbnail",
          "sis_blog.blog_banner as banner",
          "sis_blog.blog_photo_path as photo_path",
          "sis_blog.blog_photo as photo",
          "sis_blog.created_on",
          "blog_category.category_title as category_name",
        ])
        // Sort by creation date in descending order (newest first)
        .orderBy("sis_blog.created_on", "desc")
        // Limit to 10 latest blogs
        .limit(10)
        // Execute the Kysely query
        .execute();

      return blogs;
      // Return the latest blog records with category information
    } catch (error) {
      // Catch any database errors
      throw error;
    }
  }
    /**
   * Get blogs by year with pagination.
   *
   * @param year - Year to filter blogs
   * @param page - Page number
   * @param limit - Number of records per page
   */
async getBlogsByYear(year: number, page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;

    const startDate = new Date(year, 0, 1, 0, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const blogs = await this.db
      .selectFrom(BLOG_TABLE)
      .innerJoin(
        BLOG_CATEGORY_TABLE,
        "sis_blog.blog_category",
        "blog_category.category_id"
      )
      .select([
        "sis_blog.blog_id as id",
        "sis_blog.blog_title as title",
        "sis_blog.blog_details as details",
        "sis_blog.blog_thumbnail as thumbnail",
        "sis_blog.blog_banner as banner",
        "sis_blog.blog_photo_path as photo_path",
        "sis_blog.blog_photo as photo",
        "sis_blog.created_on",
        "blog_category.category_title as category_name",
      ])
      .where("sis_blog.blog_status", "=", 1)
      .where("sis_blog.created_on", ">=", startDate)
      .where("sis_blog.created_on", "<=", endDate)
      .orderBy("sis_blog.created_on", "desc")
      .limit(limit)
      .offset(offset)
      .execute();

    const countResult = await this.db
      .selectFrom(BLOG_TABLE)
      .select(({ fn }) => fn.count<number>("blog_id").as("count"))
      .where("blog_status", "=", 1)
      .where("created_on", ">=", startDate)
      .where("created_on", "<=", endDate)
      .executeTakeFirst();

    return {
      blogs,
      total_count: Number(countResult?.count ?? 0),
    };
  } catch (error) {
    throw error;
  }
}




  /**
   * Get blog details by blog ID.
   *
   * @param id - Blog ID
   */
async getBlogById(id: number) {
  try {
    return await this.db
      .selectFrom(BLOG_TABLE)
      .innerJoin(
        BLOG_CATEGORY_TABLE,
        "sis_blog.blog_category",
        "blog_category.category_id"
      )
      .select([
        "sis_blog.blog_id as id",
        "sis_blog.blog_title as title",
        "sis_blog.blog_details as details",
        "sis_blog.blog_thumbnail as thumbnail",
        "sis_blog.blog_banner as banner",
        "sis_blog.blog_photo_path as photo_path",
        "sis_blog.blog_photo as photo",
        "sis_blog.created_on",
        "blog_category.category_title as category_name",
      ])
      .where("sis_blog.blog_id", "=", id)
      .where("sis_blog.blog_status", "=", 1)
      .executeTakeFirst();
  } catch (error) {
    throw error;
  }
}
}