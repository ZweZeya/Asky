import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Layout'

export default function PostPage() {
    const { id } = useParams();
    
    return (
        <Layout>
            Post
        </Layout>
    )
}