//import statements
import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    //extract post id
    const postId = this.props.match.params.postId;
    fetch('http://localhost:8000/feed/post/' + postId, {
      headers: {
        //set authorization token
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          //error if failed to fetch
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          //get title, creator name, image url, date, and content
          title: resData.post.title,
          author: resData.post.creator.name,
          image: 'http://localhost:8000/' + resData.post.imageUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          content: resData.post.content
        });
      })
      .catch(err => {
        //log any errors
        console.log(err);
      });
  }

  //render posts and post info
  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

//export post
export default SinglePost;
