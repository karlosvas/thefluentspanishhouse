import { type ErrorAxios } from "../types/types";

export function isErrorAxios(error: any): error is ErrorAxios {
  return (error as ErrorAxios).status !== undefined && (error as ErrorAxios).message !== undefined;
}
