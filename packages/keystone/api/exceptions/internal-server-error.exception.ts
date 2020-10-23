import { HttpStatus } from '../../constants/http-status.enum';
import { HttpException } from './http.exception';

/**
 * Defines an HTTP exception for *Internal Server Error* type errors.
 *
 * @see [Base Exceptions](https://docs.nestjs.com/exception-filters#base-exceptions)
 *
 * @publicApi
 */
export class InternalServerErrorException extends HttpException {
    /**
     * Instantiate an `InternalServerErrorException` Exception.
     *
     * @example
     * `throw new InternalServerErrorException()`
     *
     * @usageNotes
     * The HTTP response status code will be 500.
     * - The `objectOrError` argument defines the JSON response body or the message string.
     * - The `description` argument contains a short description of the HTTP error.
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: this will be the value 500.
     * - `message`: the string `'Internal Server Error'` by default; override this by supplying
     * a string in the `objectOrError` parameter.
     *
     * If the parameter `objectOrError` is a string, the response body will contain an
     * additional property, `error`, with a short description of the HTTP error. To override the
     * entire JSON response body, pass an object instead. Nest will serialize the object
     * and return it as the JSON response body.
     *
     * @param objectOrError string or object describing the error condition.
     * @param description a short description of the HTTP error.
     */
    constructor(
        objectOrError?: string | object | any,
        description = 'Internal Server Error',
    ) {
        super(
            HttpException.createBody(
                objectOrError,
                description,
                HttpStatus.INTERNAL_SERVER_ERROR,
            ),
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
