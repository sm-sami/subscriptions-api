import { ZodError } from "zod";

export const handleValidationError = (err: ZodError): string => {
  const [firstError] = err.errors;
  if (firstError.message.includes("Required")) {
    return `Missing required params: ${firstError.path}`;
  }
  return "Validation Error";
};
