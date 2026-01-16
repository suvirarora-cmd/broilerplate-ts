import { normalizeError, createApiError } from "../error/errorHandler"

describe('errorService', () => {
    it("normalizes API errors",()=>{
        const apiError=createApiError(401,"unauthorized");
        const result=normalizeError(apiError);

        expect(result.source).toBe("API");
        expect(result.statusCode).toBe(401);
    })

    it("normalizes runtime errors", () => {
    const error = new Error("Boom");
    const result = normalizeError(error);

    expect(result.source).toBe("RUNTIME");
    expect(result.message).toBe("Boom");
  });
});
