const FormNewComment = () => {
  return (
    <form className="form-comment">
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea id="comment" name="comment" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormNewComment;
