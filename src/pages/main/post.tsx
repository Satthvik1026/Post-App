import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { Post as Ipost } from "./main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: Ipost;
}

interface Like {
    likeid: string;
    userId: string;

}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setlikes] = useState<Like[] | null>(null)


    const likesref = collection(db, "likes");

    const likesDoc = query(likesref, where("postId", "==", post.id));


    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setlikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeid: doc.id })));
    }


    const addlike = async () => {
        try {
            const newDoc = await addDoc(likesref, { userId: user?.uid, postId: post.id });
            if (user) {
                setlikes((prev) => prev ? [...prev, { userId: user?.uid, likeid: newDoc.id }] : [{ userId: user?.uid, likeid: newDoc.id }]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const removelike = async () => {
        try {
            const liketodeleteQuery = query(likesref, where("postId", "==", post.id),
                where("userId", "==", user?.uid));

            const liketodeltedata = await getDocs(liketodeleteQuery);
            const likeId = liketodeltedata.docs[0].id;
            const liketodelete = doc(db, "likes", likeId)
            await deleteDoc(liketodelete);
            if (user) {
                setlikes(
                    (prev => prev && prev.filter((like) => like.likeid !== likeId)
                    ))
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, []);


    return <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>

        <div className="body">
            <p> {post.description}</p>
        </div>

        <div className="footer">
            <p> @{post.username}</p>
            <button onClick={hasUserLiked ? removelike : addlike}>
                {hasUserLiked ? <>&#128078;</> : <> &#128077;</>}
            </button>
            {likes && <p>Likes: {likes?.length}</p>}

        </div>

    </div>
}
// setlikes((prev) => prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]);

