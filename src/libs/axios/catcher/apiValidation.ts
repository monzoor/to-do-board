export function apiValidation(error: any): never {
  if (
    typeof window !== "undefined" &&
    error.response &&
    error.response.status === 422
  ) {
    const event = new CustomEvent("globalError", { detail: error.message });
    window.dispatchEvent(event);
  }

  throw error;
}
