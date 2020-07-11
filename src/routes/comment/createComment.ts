import { Router, Request, Response } from 'express';

import { restricted } from '../../middlewares/restricted';
import validate from '../../middlewares/validate';
import { CommentMethods } from '../../database/comment/comment.statics';

const router = Router();

router.post(
  '/ticket/:ticketId/comment',
  restricted,
  async (req: Request, res: Response) => {
    try {
      const ticketComment = req.body;
      ticketComment.created_by = req.decoded.id;
      const { created_by, comment } = ticketComment;

      const { newComment } = await CommentMethods.createComment({
        ticketId: req.params.ticketId,
        params: { created_by, comment },
      });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as createCommentRouter };
