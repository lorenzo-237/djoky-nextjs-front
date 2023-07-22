import { SessionDjoky } from '@/constants';

export function convertUserToSessionDjkoy(user: User): SessionDjoky {
  return {
    userId: user.id,
    username: user.username,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
  };
}
