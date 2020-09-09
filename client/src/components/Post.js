import React from 'react';
import styled from 'styled-components'

const PostCard = styled.div`
background: #E7F0FD;
width: 20%;
margin: 2%;
padding: 2%;
box-sizing: border-box;
border: 1 px solid black;
display: flex;
flex-direction: column;
align-items: flex-start;
box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
border-radius: 8px;
`
const Name = styled.h2`
display: flex;
width: 100%;
justify-content: center;
`

const Label = styled.p`
font-weight: bold;
`
const Detail = styled.div`
display: flex;
width: 80%;
justify-content: space-between;
`


const Post = (props) =>{
 
    return(

        <PostCard>
            <Name>{props.post.title}</Name>
          <Detail>
            
            <p>{props.post.contents} </p>
        </Detail>


        </PostCard>
    )
}

export default Post;