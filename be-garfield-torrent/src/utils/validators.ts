export function validateUserId(userId): { err: any, userId: string | null } {
  if (!userId) {
    return { err: 'Missing user id!', userId: null }
  }

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return { err: 'User id is not valid!', userId: null }
  }

  return { err: null, userId };
}