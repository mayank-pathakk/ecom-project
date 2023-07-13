import { Request, Response } from 'express';

const exampleController = async (req: Request, res: Response) => {
  res.status(201).json({});
};

export default exampleController;
