import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError';
import { QueryFailedError } from 'typeorm';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 紀錄錯誤
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // 自定義錯誤
  if (err instanceof CustomError) {
    return res.status(err.code).json({
      status: 'error',
      message: err.message,
      code: err.code,
      errors: err.errors
    });
  }

  // TypeORM 錯誤
  if (err instanceof QueryFailedError) {
    return res.status(400).json({
      status: 'error',
      message: 'Database Error',
      code: 400,
      errors: err.message
    });
  }

  // Express Validator 錯誤
  if (Array.isArray(err)) {
    const validationErrors = err.map(error => {
      if ('param' in error && 'msg' in error) {
        return {
          field: error.param,
          message: error.msg
        };
      }
      return null;
    }).filter(Boolean);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation Error',
        code: 400,
        errors: validationErrors
      });
    }
  }

  // 預設錯誤處理
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    code: 500,
    errors: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};
