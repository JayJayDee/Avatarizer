export class AvatarizerInitError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class ResourceNotFoundError extends AvatarizerInitError {
  constructor(missingResPath: string) {
    super(`resource not found: ${missingResPath}`);
  }
}

export class MalformedResourceError extends AvatarizerInitError {
  constructor(cause: string) {
    super(cause);
  }
}