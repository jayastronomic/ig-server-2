export default class ApiResponse<T> {
 private constructor(
    private readonly data: T | null,
    private readonly message: string,
    private readonly status: 'error' | 'success',
    private readonly errors: string[] | null
  ) {}

  public static success<T>(data: T, message: string){
    return ApiResponse.create(data, message, 'success', null)
  }

  public static error<T>(message: string, errors: string[] | null){
    return ApiResponse.create(null, message, 'error', errors)
  }

  private static create<T>(data: T, message: string, status: 'error' | 'success', errors: string[]){
    return new ApiResponse(data, message, status, errors);
  }
}
