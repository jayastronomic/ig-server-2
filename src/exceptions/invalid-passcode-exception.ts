import { HttpException, HttpStatus } from "@nestjs/common";

export default class InvalidPasscodeException extends HttpException {
    private static readonly DEFAULT_MESSAGE = "invalid passcode"
    
    constructor() {
        super(InvalidPasscodeException.DEFAULT_MESSAGE, HttpStatus.UNAUTHORIZED);
      }
}