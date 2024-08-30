export const deleteChildren = async (comment) => {
  if (comment.answer && comment.answer.length > 0) {
    for (const childId of comment.answer) {
      const childComment = await Comment.findById(childId);
      if (childComment) {
        await deleteChildren(childComment);
        await Comment.findByIdAndDelete(childId);
      }
    }
  }
};
