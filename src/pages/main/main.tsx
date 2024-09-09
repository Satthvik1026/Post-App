import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;

}

export const Main = () => {
    const [postlist, setpostlist] = useState<Post[] | null>(null);
    const postsref = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsref);
        setpostlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
        );
    };


    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="main-page">
            {postlist?.map((post) => (
                <div className="post-card" key={post.id}>
                    <Post post={post} />
                </div>
            ))}
        </div>
    );
}