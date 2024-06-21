// src/Content.js
import React from 'react';
import { faker } from '@faker-js/faker';
const avatar_data = faker.image.avatar();
const data={
      image1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsm0ixWRhsibED61_DBEKUFqKzZ1OUzoSbA&s",
     image2:"https://media.licdn.com/dms/image/C5103AQFXPqT9bBj3Cg/profile-displayphoto-shrink_200_200/0/1575090745863?e=2147483647&v=beta&t=VL6gzCfV22u7mbZRoYlAJNeGWd-C6L0I9yr9ZymdA9k",
    image3 :"https://graduation.apps.binus.ac.id/wp-content/uploads/graduation/photo_profile/2714/2301895321.jpg?t=1718942980",
    image4:"data:image/jpeg;base64,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",
  name: faker.name.fullName(),
  Comment: faker.lorem.sentence()  ,
  
  };
  const dates = {
    date1: faker.date.recent().toLocaleString(),
    date2: faker.date.recent().toLocaleString(),
    date3: faker.date.recent().toLocaleString(),
    date4: faker.date.recent().toLocaleString(),
  };
  
function Content() {
  return (
    <main className="content">
    <div class="ui comments">
  <h3 class="ui dividing header">{data.name}</h3>
  <div class="comment">
    <a class="avatar">
    <img src={data.image1} alt="avatar" />
    </a>
    <div class="content">
      <a class="author">{data.name}</a>
      <div class="metadata">
        <span class="date">{dates.date1}</span>
      </div>
      <div class="text">
      {data.Comment}
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
  </div>
  <div class="comment">
    <a class="avatar">
      <img src={data.image2}/>
    </a>
    <div class="content">
      <a class="author">{data.name}</a>
      <div class="metadata">
        <span class="date">{dates.date1}</span>
      </div>
      <div class="text">
        <p>{data.Comment}</p>
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
    <div class="comments">
      <div class="comment">
        <a class="avatar">
          <img src={data.image3}/>
        </a>
        <div class="content">
          <a class="author">{data.name}</a>
          <div class="metadata">
            <span class="date">{dates.date1}</span>
          </div>
          <div class="text">
            {data.Comment}
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
      <img src={data.image4}/>
    </a>
    <div class="content">
      <a class="author">{data.name}</a>
      <div class="metadata">
        <span class="date">{dates.date1}</span>
      </div>
      <div class="text">
      {data.Comment}
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
      </div>
    </div>
  </div>
  <form class="ui reply form">
    <div class="field">
      <textarea>
        
      </textarea>
    </div>
    <div class="ui blue labeled submit icon button">
      <i class="icon edit"></i> Add Reply
    </div>
  </form>
</div>
    </main>
  );
}

export default Content;
