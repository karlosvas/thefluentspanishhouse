interface EditProps {
  commentText: string;
}

const Edit: React.FC<EditProps> = ({ commentText }) => {
  const url_api =
    import.meta.env.VITE_VERCEL_ENV === "production"
      ? import.meta.env.VITE_URL_API
      : "http://localhost:3001";

  fetch(`${url_api}/api/comments`, {
    method: "PUT",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({ newComment: commentText }),
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      width="20px"
      height="20px"
      stroke="currentColor"
      className="svgIcons"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
};

export default Edit;
