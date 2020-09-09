import React, {useState, useEffect} from 'react';
import Post from './components/Post';
import axios from 'axios';
import './App.css';
import styled from 'styled-components';

const Posts = styled.div`
display: flex;
flex-wrap: wrap;
`


const App = () => {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    axios
    .get('http://localhost:8000/api/posts/')
    .then(result =>{
      setPosts(result.data.data)
     
    })
  }, [])

  console.log(posts);
  return (
    <div className="App">
      <Posts>
      {posts.map(x => <Post post = {x}/> )}
      </Posts>
    </div>
  );
}

export default App;
