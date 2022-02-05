package response

const BadRequest = "Bad Request."
const NotFound = "Not Found."
const UnprocessableEntity = "Unprocessable Entity."

type Error struct {
	Message string `json:"message"`
	Errors  error  `json:"errors"`
}

type ValidationError struct {
	Message string   `json:"message"`
	Errors  []string `json:"errors"`
}

func BuildError(message string, errors error) Error {
	return Error{
		Message: message,
		Errors:  errors,
	}
}

func BuildValidationError(errors []string) ValidationError {
	return ValidationError{
		Message: UnprocessableEntity,
		Errors:  errors,
	}
}
