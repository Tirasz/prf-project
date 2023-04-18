export function validateObjectId(objectId): { err: any, objectId: string | null } {
  if (!objectId) {
    return { err: 'Missing id!', objectId: null }
  }

  if (!objectId.match(/^[0-9a-fA-F]{24}$/)) {
    return { err: 'Object id is not valid!', objectId: null }
  }

  return { err: null, objectId };
}