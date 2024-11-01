import Button from "@/components/reusable/Button";
import ImgUser from "@/components/svg-component/ImgUser";
import { postChildrenComment } from "@/scripts/render-data";
import { isCommentArray } from "@/utilities/utilities-types";
import { useRef } from "react";
import toast from "react-hot-toast";
import { type ResponseProps, type Comment } from "types/types";


const Response : React.FC<ResponseProps> = ({ 
    user,
    setIsResponse,
    comment,
    childs,
    setChilds }) => {

    const responseComment = useRef<HTMLTextAreaElement>(null);
    
    // Manejar el envio de un comentario hijo
    const handleSubmitChildren = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Creamos un nuevo comentario
        if (
        responseComment.current &&
        responseComment.current.value.trim() !== "" &&
        user &&
        user.uid &&
        user.displayName &&
        user.email
        ) {
            const newCommentData: Comment = {
                _id: "",
                pattern_id: comment._id,
                owner: {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL || "",
                },
                data: responseComment.current.value,
                likes: 0,
                likedBy: [],
                answers: [],
            };
            // Limpiamos el input y lo cerramos
            responseComment.current.value = "";
            setIsResponse(false);
            try {
                const newComment = await postChildrenComment(newCommentData, comment._id);
                const updatedComments = [newComment, ...childs];
                if (isCommentArray(updatedComments)) setChilds(updatedComments);
            } catch (error) {
                console.error("Error:", error);
            }
        } else toast.error("Do you need login to comment");
    };

    return (
        <div className="response-comment">
            <ImgUser photoURL={user?.photoURL} />
            <form onSubmit={handleSubmitChildren}>
                <textarea placeholder="Text here..." ref={responseComment} />
                <Button type="submit">Submit</Button>
            </form>
      </div>
    );
};
  
export default Response;
  