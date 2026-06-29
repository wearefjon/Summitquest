from typing import Any


class SummitQuestException(Exception):
    status_code: int = 500
    error_code: str = "INTERNAL_ERROR"
    message: str = "An unexpected error occurred"

    def __init__(
        self,
        message: str | None = None,
        details: dict[str, Any] | None = None,
    ) -> None:
        self.message = message or self.__class__.message
        self.details = details
        super().__init__(self.message)


class NotFoundError(SummitQuestException):
    status_code = 404
    error_code = "NOT_FOUND"
    message = "Resource not found"


class ValidationError(SummitQuestException):
    status_code = 422
    error_code = "VALIDATION_ERROR"
    message = "Validation failed"


class AuthenticationError(SummitQuestException):
    status_code = 401
    error_code = "AUTHENTICATION_ERROR"
    message = "Authentication failed"


class AuthorizationError(SummitQuestException):
    status_code = 403
    error_code = "AUTHORIZATION_ERROR"
    message = "Not authorized"


class ConflictError(SummitQuestException):
    status_code = 409
    error_code = "CONFLICT"
    message = "Resource conflict"
