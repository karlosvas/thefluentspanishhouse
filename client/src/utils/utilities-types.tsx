import {
  PublicationCardType,
  type ErrorResponseHelper,
  type Member,
  type Comment,
} from 'types/types';

// Función de tipo guardia para verificar si un objeto es de tipo ErrorResponseHelper
export function isErrorResponseHelper(
  error: unknown
): error is ErrorResponseHelper {
  return (
    typeof error === 'object' &&
    error !== null &&
    'err' in error &&
    'status' in error &&
    'statusText' in error
  );
}

// Función de tipo guardia para verificar si un objeto es de tipo Member
export const isMember = (obj: unknown): obj is Member => {
  if (typeof obj !== 'object' || obj === null) return false;

  const member = obj as Member;
  const statusOptions = [
    'subscribed',
    'unsubscribed',
    'cleaned',
    'pending',
    'transactional',
  ];

  return (
    typeof member.email_address === 'string' &&
    statusOptions.includes(member.status) &&
    ['html', 'text'].includes(member.email_type) &&
    (member.merge_fields === undefined ||
      typeof member.merge_fields === 'object') &&
    (member.tags === undefined || Array.isArray(member.tags)) &&
    (member.status_if_new === undefined ||
      statusOptions.includes(member.status_if_new)) &&
    (member.update_existing === undefined ||
      typeof member.update_existing === 'boolean')
  );
};

// Función de tipo guardia para verificar si un objeto es de tipo PublicationCardType
export function isPublicationCardType(
  obj: unknown
): obj is PublicationCardType {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as PublicationCardType)._id === 'string' &&
    typeof (obj as PublicationCardType).title === 'string' &&
    typeof (obj as PublicationCardType).subtitle === 'string' &&
    typeof (obj as PublicationCardType).content === 'string' &&
    typeof (obj as PublicationCardType).base64_img === 'string' &&
    typeof (obj as PublicationCardType).currentPage === 'number'
  );
}

// Función de tipo guardia para verificar si un objeto es un array de Comment
export function isCommentArray(obj: unknown): obj is Comment[] {
  return (
    Array.isArray(obj) &&
    obj.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item._id === 'string' &&
        typeof item.pattern_id === 'string' &&
        typeof item.owner === 'object' &&
        item.owner !== null &&
        typeof item.owner.uid === 'string' &&
        typeof item.owner.displayName === 'string' &&
        typeof item.owner.email === 'string' &&
        typeof item.owner.photoURL === 'string' &&
        typeof item.data === 'string' &&
        typeof item.likes === 'number' &&
        Array.isArray(item.likedBy) &&
        Array.isArray(item.answers)
    )
  );
}

// Función de tipo guardia para verificar si un objeto es de tipo Comment
export const isComment = (obj: unknown): obj is Comment => {
  if (typeof obj !== 'object' || obj === null) return false;

  const comment = obj as Comment;
  return (
    comment._id === 'string' &&
    typeof comment.pattern_id === 'string' &&
    comment.owner &&
    typeof comment.owner.uid === 'string' &&
    typeof comment.owner.displayName === 'string' &&
    typeof comment.owner.email === 'string' &&
    typeof comment.owner.photoURL === 'string' &&
    typeof comment.data === 'string' &&
    typeof comment.likes === 'number' &&
    Array.isArray(comment.likedBy) &&
    comment.likedBy.every((id: unknown) => typeof id === 'string') &&
    Array.isArray(comment.answers) &&
    comment.answers.every((answer: unknown) => isComment(answer))
  );
};
