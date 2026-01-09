// CORE //
import { Controller, Get } from "@nestjs/common";

// SERVICES //
import { BlogsService } from "./blogs.service";

@Controller("blogs")
export class BlogsController {
  // Blogs controller to handle HTTP requests
  constructor(private readonly blogsService: BlogsService) {}
  // Inject BlogsService for handling blog operations

  /**
   * GET: /blogs/get-latest
   *
   * Fetch the 10 latest blogs with category information.
   * Returns: { id, title, details, thumbnail, banner, photo_path, photo, created_on, category_name }
   *
   * @returns Array of latest blogs
   */
  @Get("get-latest")
  getLatestBlogs() {
    // Fetch the 10 latest blogs with category information
    return this.blogsService.getLatestBlogs();
  }
}
