import { Response } from 'express';

const handleHTTPErrorLog = (res: Response, error: Error) => {
  res.status(500).send({ error: error.message });
};

export function handleServerError(res: Response, error: unknown): void {
  res.status(500).json({
    message: 'Server error',
    error: error instanceof Error ? error.message : String(error),
  });
}

export { handleHTTPErrorLog };
