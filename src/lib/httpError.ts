export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

export const throwIfNotOk = (res: Response, message: string) => {
  if (!res.ok) {
    throw new HttpError(message, res.status);
  }
};