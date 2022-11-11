import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import PostOther from './PostOther';

export default function Activity() {

    // Storing all of the friends posts in a state
    const [posts, setPosts] = useState([]);

    // Send http requests to server on page load
    useEffect(() => {
        // Retrieve the list of friends from server through a get request
        axios({
            method: 'get',
            url: 'http://localhost:4000/friends',
            withCredentials: true
        })
        .then(res => {
            // Looping through the friend lists to retrieve the posts through post requests
            res.data.forEach(friend => {
                axios({
                    method: 'post',
                    url: 'http://localhost:4000/friends/posts',
                    withCredentials: true,
                    data: {username: friend}
                })
                .then(res => {
                    setPosts(prev => {
                        const newPosts = [...prev];
                        const prevIds = prev.map(item => item._id);
                        res.data.forEach(post => {
                            if (!prevIds.includes(post._id)) {
                                newPosts.push(post)
                            }
                        })
                        return newPosts;
                    })
                })
                .catch(err => console.log(err.message))
            })
        })
        .catch(err => console.log(err.message))

        // Sort the posts according to the dates in ascending order
        posts.sort((a, b)  => {
            if (a.datePosted < b.datePosted) {
                return 1;
            } else if (a.datePosted > b.datePosted) {
                return -1;
            } else {
                return 0;
            }
        });
    }, [])

    const postElements = posts.map(post => {
        return (
            <PostOther
                key={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
                date={post.datePosted}
                replies={post.replies}

            />
        )
    })

    return (
        <Layout>
            <h2>Activity</h2>
            {postElements}
        </Layout>
    )
}