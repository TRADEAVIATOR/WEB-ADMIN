import { AxiosError } from "axios";

export async function tryServer<T>(promise: Promise<T>) {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { data: null, error, message };
  }
}
