import { UserEntity } from '../../services/users/entities/user.entity';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;
