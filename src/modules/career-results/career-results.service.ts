import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Kysely, sql } from "kysely";

import { Tables } from "../../common/enums/database.enum";
import { Database } from "../../core/database/schema";

type CareerResultRow = {
  id: number;
  examName: string;
  studentName: string;
  studentProfilePic: string | null;
  percentage: string | null;
  sessionName: string;
};

type CareerExamSummary = {
  name: string;
  slug: string;
  availableSessions: string[];
  defaultSession: string;
  cardImage: string;
};

type CareerExamListItem = {
  name: string;
  slug: string;
  cardImage: string;
};

@Injectable()
export class CareerResultsService {
  constructor(@Inject("DB") private readonly db: Kysely<Database>) {}

  async getCareerResultsList() {
    try {
      const rows = await this.fetchCareerRows();
      const summaries = this.buildExamSummaries(rows);

      return {
        status: true,
        statusCode: 200,
        data: this.buildExamListItems(summaries),
      };
    } catch (error) {
      console.error("Career results list query failed:", error);
      throw new InternalServerErrorException("Unable to fetch career results");
    }
  }

  async getCareerResultsDetail(examSlug: string, session: string) {
    try {
      const rows = await this.fetchCareerRows();
      const summaries = this.buildExamSummaries(rows);
      const normalizedSlug = this.slugify(examSlug);
      const exam = summaries.find((item) => item.slug === normalizedSlug);
      const normalizedSession = session.trim();

      if (!exam) {
        throw new NotFoundException(`Career exam '${examSlug}' not found`);
      }

      const examRows = rows.filter((row) => this.slugify(row.examName) === exam.slug);

      const filteredResults = examRows
        .filter((row) => row.sessionName === normalizedSession)
        .map((row) => ({
          id: row.id,
          studentName: row.studentName,
          studentProfilePic: row.studentProfilePic,
          percentage: row.percentage ?? "",
        }));

      return {
        status: true,
        statusCode: 200,
        data: filteredResults,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error("Career results detail query failed:", error);
      throw new InternalServerErrorException("Unable to fetch career result details");
    }
  }

  private async fetchCareerRows(): Promise<CareerResultRow[]> {
    return this.db
      .selectFrom(`${Tables.CAREER_RESULTS} as r`)
      .leftJoin(`${Tables.EXAMS} as ce`, (join) =>
        join.on(sql`CAST(r.examname AS CHAR)`, "=", sql`CAST(ce.id AS CHAR)`),
      )
      .leftJoin(`${Tables.SESSION} as ms`, (join) =>
        join.on(sql`CAST(r.session_name AS CHAR)`, "=", sql`CAST(ms.id AS CHAR)`),
      )
      .select([
        "r.id as id",
        sql<string>`COALESCE(NULLIF(TRIM(ce.career_exam_name), ''), NULLIF(TRIM(r.examname), ''))`.as(
          "examName",
        ),
        "r.studname as studentName",
        "r.studprofilepic as studentProfilePic",
        "r.percentage as percentage",
        sql<string>`COALESCE(NULLIF(TRIM(ms.session_name), ''), NULLIF(TRIM(r.session_name), ''))`.as(
          "sessionName",
        ),
      ])
      .where("r.status", "=", 1)
      .where(
        sql<boolean>`COALESCE(NULLIF(TRIM(ce.career_exam_name), ''), NULLIF(TRIM(r.examname), '')) IS NOT NULL`,
      )
      .where(sql<boolean>`TRIM(COALESCE(r.studname, '')) <> ''`)
      .where(
        sql<boolean>`COALESCE(NULLIF(TRIM(ms.session_name), ''), NULLIF(TRIM(r.session_name), '')) IS NOT NULL`,
      )
      .orderBy("ms.session_name", "desc")
      .orderBy(sql<number>`CAST(COALESCE(NULLIF(r.percentage, ''), '0') AS DECIMAL(10,2))`, "asc")
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
          availableSessions: [row.sessionName],
          defaultSession: row.sessionName,
          cardImage: `/results/career/${slug}.jpg`,
        });
        continue;
      }

      if (!existing.availableSessions.includes(row.sessionName)) {
        existing.availableSessions.push(row.sessionName);
        existing.availableSessions.sort((a, b) => b.localeCompare(a));
        existing.defaultSession = existing.availableSessions[0];
      }
    }

    return Array.from(examMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  private buildExamListItems(exams: CareerExamSummary[]): CareerExamListItem[] {
    return exams.map(({ name, slug, cardImage }) => ({
      name,
      slug,
      cardImage,
    }));
  }

  private slugify(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, "-");
  }
}
