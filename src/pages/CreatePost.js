import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { Timestamp } from "firebase/firestore"; // Import Timestamp
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    const createPost = async () => {
        navigate("/");
        console.log(auth.currentUser.photoURL);
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid ,photoURLUser:auth.currentUser.photoURL}, // Add the author's name and id
            timestamp: Timestamp.now(), // Add the current timestamp
            
        });
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth]);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input
                        placeholder="Title..."
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="inputGp">
                    <label> Post:</label>
                    <textarea
                        placeholder="Post..."
                        onChange={(event) => setPostText(event.target.value)}
                    />
                </div>
                <button onClick={createPost}> Submit Post</button>
            </div>
        </div>
    );
}

export default CreatePost;
