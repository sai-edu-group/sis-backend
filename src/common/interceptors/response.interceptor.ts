// CORE //
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";
import type { Observable } from "rxjs";

// UTILS //
import { successResponse } from "@/common/utils/response.util";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If controller already returned a formatted object
        if (data && data.status !== undefined && data.statusCode !== undefined) {
          return data;
        }
        return successResponse(data);
      }),
    );
  }
}
