import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Kysely, sql } from "kysely";

import { Tables } from "@/common/enums/database.enum";
import { Database } from "@/core/database/schema";

type CareerResultRow = {
  id: number;
  examName: string;
  studentName: string;
  studentProfilePic: string | null;
  percentage: string | null;
  year: number;
};

type CareerExamSummary = {
  name: string;
  slug: string;
  availableYears: number[];
  defaultYear: number;
  cardImage: string;
};

@Injectable()
export class CareerResultsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  async getCareerResultsList() {
    try {
      const rows = await this.fetchCareerRows();

      return {
        status: true,
        statusCode: 200,
        data: {
          view: "list" as const,
          exams: this.buildExamSummaries(rows),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException("Unable to fetch career results");
    }
  }

  async getCareerResultsDetail(examSlug: string, year?: number) {
    try {
      const rows = await this.fetchCareerRows();
      const summaries = this.buildExamSummaries(rows);
      const normalizedSlug = this.slugify(examSlug);
      const exam = summaries.find((item) => item.slug === normalizedSlug);

      if (!exam) {
        throw new NotFoundException(`Career exam '${examSlug}' not found`);
      }

      const selectedYear = year ?? exam.defaultYear;
      const results = rows
        .filter((row) => this.slugify(row.examName) === exam.slug && row.year === selectedYear)
        .map((row) => ({
          id: row.id,
          studentName: row.studentName,
          studentProfilePic: row.studentProfilePic,
          percentage: row.percentage ?? "",
        }));

      return {
        status: true,
        statusCode: 200,
        data: {
          view: "detail" as const,
          exam: {
            name: exam.name,
            slug: exam.slug,
            availableYears: exam.availableYears,
            selectedYear,
            cardImage: exam.cardImage,
            results,
          },
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException("Unable to fetch career result details");
    }
  }

  private async fetchCareerRows(): Promise<CareerResultRow[]> {
    return this.db
      .selectFrom(`${Tables.CAREER_RESULTS} as r`)
      .innerJoin(`${Tables.SESSION} as ms`, (join) =>
        join.on(sql`CAST(r.session_name AS CHAR)`, "=", sql`CAST(ms.id AS CHAR)`),
      )
      .select([
        "r.id as id",
        "r.examname as examName",
        "r.studname as studentName",
        "r.studprofilepic as studentProfilePic",
        "r.percentage as percentage",
        sql<number>`YEAR(ms.session_enddate)`.as("year"),
      ])
      .where("r.status", "=", 1)
      .where(sql<boolean>`TRIM(COALESCE(r.examname, '')) <> ''`)
      .where(sql<boolean>`TRIM(COALESCE(r.studname, '')) <> ''`)
      .orderBy(sql<number>`CAST(COALESCE(NULLIF(r.percentage, ''), '0') AS DECIMAL(10,2))`, "desc")
      .orderBy("r.studname", "asc")
      .execute() as Promise<CareerResultRow[]>;
  }

  private buildExamSummaries(rows: CareerResultRow[]): CareerExamSummary[] {
    const examMap = new Map<string, CareerExamSummary>();

    for (const row of rows) {
      const name = row.examName.trim();
      const slug = this.slugify(name);
      const existing = examMap.get(slug);

      if (!existing) {
        examMap.set(slug, {
          name,
          slug,
          availableYears: [row.year],
          defaultYear: row.year,
          cardImage: `/results/career/${slug}.jpg`,
        });
        continue;
      }

      if (!existing.availableYears.includes(row.year)) {
        existing.availableYears.push(row.year);
        existing.availableYears.sort((a, b) => b - a);
        existing.defaultYear = existing.availableYears[0];
      }
    }

    return Array.from(examMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  private slugify(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, "-");
  }
}
