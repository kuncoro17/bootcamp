// src/Comment.js
import React from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div class="ui comments">
  <h3 class="ui dividing header">Comments</h3>
  <div class="comment">
    <a class="avatar">
    <img alt={this.props.name} src={this.props.avatar} />
    </a>
    <div class="content">
      <a class="author"> {this.props.name}</a>
      <div class="metadata">
        <span class="date">{this.props.date}</span>
      </div>
      <div class="text">
      {this.props.chat}
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
  </div>
  <div class="comment">
    <a class="avatar">
    <img alt={this.props.name} src={this.props.avatar} />
    </a>
    <div class="content">
      <a class="author"> {this.props.name}</a>
      <div class="metadata">
        <span class="date">{this.props.date}</span>
      </div>
      <div class="text">
        <p>{this.props.chat}</p>
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
    <div class="comments">
      <div class="comment">
        <a class="avatar">
        <img alt={this.props.name} src={this.props.avatar} />
        </a>
        <div class="content">
          <a class="author"> {this.props.name}</a>
          <div class="metadata">
            <span class="date">Just now</span>
          </div>
          <div class="text">
          {this.props.chat}
          </div>
          <div class="actions">
            <a class="reply">Reply</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="comment">
    <a class="avatar">
    <img alt={this.props.name} src={this.props.avatar} />
    </a>
    <div class="content">
      <a class="author"> {this.props.name}</a>
      <div class="metadata">
        <span class="date">{this.props.date}</span>
      </div>
      <div class="text">
      {this.props.chat}
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
  </div>
  <form class="ui reply form">
    <div class="field">
      <textarea></textarea>
    </div>
    <div class="ui blue labeled submit icon button">
      <i class="icon edit"></i> Add Reply
    </div>
  </form>
</div>
    );
  }
}

export default Comment;
