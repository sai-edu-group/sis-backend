// CORE //
import { BadRequestException } from "@nestjs/common";

/**
 * School used when neither the request nor the environment provides one.
 * `2` is SAI International School in `master_school`.
 */
export const FALLBACK_SCHOOL_ID = 2;

/**
 * Resolve the school to scope a query to.
 *
 * `schoolId` is always optional on the API. When the client omits it, the
 * value of `DEFAULT_SCHOOL_ID` is used, falling back to {@link FALLBACK_SCHOOL_ID}.
 *
 * @param schoolId - Raw `schoolId` query parameter, if the client sent one
 * @throws BadRequestException When a value is sent but is not a positive integer
 */
export function resolveSchoolId(schoolId?: string): number {
  const rawSchoolId = schoolId?.trim();

  if (!rawSchoolId) {
    return getDefaultSchoolId();
  }

  const parsedSchoolId = Number(rawSchoolId);

  if (!Number.isInteger(parsedSchoolId) || parsedSchoolId <= 0) {
    throw new BadRequestException("Query parameter 'schoolId' must be a positive integer.");
  }

  return parsedSchoolId;
}

/** Read the default school from the environment, ignoring invalid values. */
function getDefaultSchoolId(): number {
  const configuredSchoolId = Number(process.env.DEFAULT_SCHOOL_ID);

  return Number.isInteger(configuredSchoolId) && configuredSchoolId > 0
    ? configuredSchoolId
    : FALLBACK_SCHOOL_ID;
}
