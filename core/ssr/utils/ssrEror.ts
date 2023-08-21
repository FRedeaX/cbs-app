export class SSRError extends Error {
  /**
   *
   * @param message Причина ошибки.
   * @param location Место возникновения ошибки.
   * @param errorType Тип ошибки.
   */
  constructor(
    message: string,
    public location?: string | object,
    public errorType?: string,
  ) {
    super(message);
    this.location = location;
    this.errorType = errorType;
  }
}
