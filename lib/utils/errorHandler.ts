import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  field?: string;
}

export function handleApiError(error: unknown): ApiError {
  let apiError: ApiError = {
    message: "Something went wrong. Please try again.",
  };

  if (error instanceof AxiosError) {
    const response = error.response;

    apiError = {
      message: response?.data?.message || error.message,
      status: response?.status,
      code: response?.data?.code,
      field: response?.data?.field,
    };

    switch (response?.status) {
      case 400:
        toast.error(apiError.message);
        break;
      case 401:
        toast.error("Please log in to continue");
        break;
      case 403:
        toast.error("You don't have permission to do this");
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 500:
        toast.error("Server error. Please try again later.");
        break;
      default:
        if (response?.status && response.status >= 400) {
          toast.error(apiError.message);
        }
    }
  } else if (error instanceof Error) {
    apiError.message = error.message;
    toast.error(error.message);
  }

  console.error("API Error:", apiError);
  return apiError;
}

export interface TryServerResult<T> {
  data: T | null;
  error: Error | null;
  message: string | null;
  status?: number;
}

export async function tryServer<T>(
  promise: Promise<T>
): Promise<TryServerResult<T>> {
  try {
    const data = await promise;
    return {
      data,
      error: null,
      message: null,
    };
  } catch (err: unknown) {
    let message = "Something went wrong";
    let error: Error | null = null;
    let status: number | undefined;

    if (err instanceof AxiosError) {
      message = err.response?.data?.message ?? err.message;
      status = err.response?.status;
      error = err;
    } else if (err instanceof Error) {
      message = err.message;
      error = err;
    } else {
      message = String(err);
      error = new Error(message);
    }

    console.error("Server operation failed:", { message, status });

    return {
      data: null,
      error,
      message,
      status,
    };
  }
}
