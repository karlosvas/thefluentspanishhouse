// import { useState } from "react";

// const Comments = () => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   const handleChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (newComment.trim() !== "") {
//       setComments([...comments, newComment]);
//       setNewComment("");
//     }
//   };

//   return (
//     <div>
//       <h3>Comentarios de Usuarios</h3>

//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={newComment}
//           onChange={handleChange}
//           placeholder="Escribe tu comentario..."
//           rows={4}
//           cols={50}
//         />
//         <br />
//         <button type="submit">Enviar Comentario</button>
//       </form>
//       <div>
//         <h3>Comentarios Anteriores:</h3>
//         {comments.length === 0 ? (
//           <p>No hay comentarios aún.</p>
//         ) : (
//           <ul>
//             {comments.map((comment, index) => (
//               <li key={index}>{comment}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Comments;
