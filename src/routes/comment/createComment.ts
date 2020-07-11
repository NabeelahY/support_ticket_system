import { Router, Request, Response } from 'express';

import { restricted } from '../../middlewares/restricted';
import validate from '../../middlewares/validate';
import { CommentMethods } from '../../database/comment/comment.statics';
import { SupportModel } from '../../database/support/support.model';
import { userCannotComment } from '../../middlewares/userCannotComment';
import { ticketDoesNotExist } from '../../middlewares/ticketDoesNotExist';

const router = Router();

router.post(
  '/ticket/:ticketId/comment',
  restricted,
  ticketDoesNotExist,
  userCannotComment,
  async (req: Request, res: Response) => {
    try {
      const ticketId = req.params.ticketId;

      const ticketComment = req.body;
      ticketComment.created_by = req.decoded.id;
      const { created_by, comment } = ticketComment;

      const { newComment } = await CommentMethods.createComment({
        ticketId: ticketId,
        params: { created_by, comment },
      });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export { router as createCommentRouter };
