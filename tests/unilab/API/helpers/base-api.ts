export class BaseAPI {
  protected static getHeaders(token: string) {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  }
}