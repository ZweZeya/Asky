import React, { useContext, useState, useEffect } from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { UserContext } from '../Context'
import PostProfile from './PostProfile'
import Friend from './Friend'


export default function Profile() {
    const user = useContext(UserContext);

    // Storing new post in a state
    const [newPost, setNewPost] = useState({
        author: "",
        title: "",
        content: ""
    });

    // Storing friends in a state
    const [friends, setFriends] = useState([]);

    const [isClick, setIsClick] = useState(false);

    // Storing all of the user's posts in a state
    const [posts, setPosts] = useState([]);
    const handleChange = (e) => {
        setNewPost(prevPost => {
            return {
                ...prevPost,
                author: user.username,
                [e.target.name]: e.target.value
            }
        });
    };

    // Send get requests to the server upon page load
    useEffect(() => {
        // Retrieve all of the user's posts
        axios({
            method: 'get',
            url: 'http://localhost:4000/posts',
            withCredentials: true
        })
        .then(res => {
            setPosts(res.data);
        })
        .catch(err => console.log(err.message))
        // Retrieve friend list
        axios({
            method: 'get',
            url: 'http://localhost:4000/friends',
            withCredentials: true
        })
        .then(res => {
            setFriends(prevFriends => {
                if (res.data.length > 0) {
                    const newFriends = res.data.map(friend => {
                        return (
                            <Friend key={friend} username={friend} />
                        )
                    })
                    return newFriends
                }
            })
        })
        .catch(err => console.log(err.message))
    }, [])

    // Send a post request to the server to add a post
    const submitPost = () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/posts',
            withCredentials: true,
            data: newPost
        })
        .then(res => {
            if (res.data = "success") {
                window.location.reload(false);
            }
        })
    };

    // Map all the of the user's posts to a custom Post element
    const postElements = posts.map(item => 
        <PostProfile
            key={item._id}
            title={item.title}
            content={item.content} 
        />
    )
    
    const style = {
        display: isClick ? "flex" : "none"
    }

    return (
        <Layout>
            <div className="profile-main">
                <div>
                    <h2>Profile</h2>
                    <h3 className="profile-create" onClick={() => {setIsClick(prevState => !prevState)}}>Create new post</h3>
                    <div className="post-form" style={style}>
                        <input className="post-form-input"name="title" onChange={handleChange} value={newPost.title} type="text" placeholder="Title" required/>
                        <textarea className="post-form-input" name="content" onChange={handleChange} value={newPost.content} rows="7" placeholder="Content" required/>
                        <button className="login-btn" onClick={submitPost}>Post</button>
                    </div>
                    <h3>Your posts: {posts.length}</h3>
                    <div>
                        {postElements}
                    </div>
                </div>
                <div className="profile-friends">
                    <h2>Friends:  {friends ? friends.length : 0}</h2>
                    {friends ? friends : "You have no friends yet"}
                </div>
            </div>
        </Layout>
    )
}