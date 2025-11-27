import type { ApiResponseData } from "@/common/types/response.type";

export function successResponse<T>(
  data: T,
  message = "Success",
  statusCode = 200,
): ApiResponseData<T> {
  return {
    status: true,
    statusCode,
    data,
    message,
    error: null,
  };
}

export function errorResponse(
  message = "Something went wrong",
  statusCode = 500,
  error: any = null,
): ApiResponseData<null> {
  return {
    status: false,
    statusCode,
    data: null,
    message,
    error,
  };
}
