// CORE //
import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";

// DB Schema //
import { Database } from "../../core/database/schema";

// ENUMS //
import { Tables } from "../../common/enums/database.enum";

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
        .selectFrom(Tables.BLOG)
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
}
