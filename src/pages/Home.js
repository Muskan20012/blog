import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {

        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                timestamp: doc.data().timestamp ? doc.data().timestamp.toDate().toLocaleString() : "N/A"
            })));
        };
        getPosts();
    }, []);

    const deletePost = async (id) => {
        setPostList(postLists.filter((post) => post.id !== id));
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    return (
        <div className="container">
            {postLists.map((post) => (
                <div className="card" key={post.id}>
                    <div className="card__header">
                        <img
                            src={"https://picsum.photos/600/300?" + post.id}
                            alt="card__image"
                            className="card__image"
                            width="600"
                        />
                    </div>
                    <div className="card__body">
                        <span className="tag tag-blue">{post.category || "General"}</span>
                        <h4>{post.title}</h4>
                        <p>{post.postText}</p>
                    </div>
                    <div className="card__footer">
                        <div className="user">
                            <img
                                src={auth.currentUser ? post.author.photoURLUser : "https://i.pravatar.cc/40?img=1"}
                                height={50}
                                alt="user__image"
                                className="user__image"
                            />
                            <div className="user__info">
                                <h5>{post.author.name}</h5>
                                <small>{post.timestamp}</small> {/* Display formatted timestamp */}
                            </div>
                        </div>
                        {isAuth && post.author.id === auth.currentUser.uid && (
                            <div className="deletePost">
                                <button onClick={() => deletePost(post.id)} title="Delete Post" className="delete-button">
                                    &#128465;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
