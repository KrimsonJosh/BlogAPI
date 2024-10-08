import express from "express";
import bodyParser from "body-parser";
/*
This file makes the API responses and acts as the API for this project

2 seperate ports running for both backends

3000 --> 4000 ---> 3000   
pretty cool
*/
const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts" , (req,res) =>{
  console.log(posts);
  res.json(posts);

})
//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req,res)=>{
  const post = posts.find((pest) => pest.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "post not found"});
  res.json(post);

})
//CHALLENGE 3: POST a new post
app.post("/posts" , (req,res)=> {
  const newid= lastId+1
  const post={
    id: newid,
    title: req.body.title,
    author:req.body.author,
    content:req.body.content,
    date:new Date(),//sets date to when user posted it 

  };
  lastId=newid;
  posts.push(post);
  console.log(posts.slice(-1));
  res.status(201).json(post);//success


})
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id" ,(req,res)=>{
  const id = parseInt(req.params.id);

  const ExistingOne=posts.find((post) => post.id === id); // finds existing post object and puts it in existingone

  const replacementpost = {
    id: id, // if no body then just do the existing one
    title: req.body.title || ExistingOne.title,
    author:req.body.author || ExistingOne.author,
    content:req.body.content || ExistingOne.content,
    date:req.body.date || ExistingOne.date,
  };

  if(!ExistingOne){
    return res.Status(404).json({message: `Post was not found`});

  }
  const searchIdx= posts.findIndex((tempost)=> tempost.id === id);//fidns index where tempost has id

  posts[searchIdx] = replacementpost;

  console.log(posts[searchIdx]);
  res.json(replacementpost);
} );
//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id" , (req,res) => {
  const id= parseInt(req.params.id);
  const searchidx= posts.findIndex((post)=> post.id === id);

  if(searchidx>-1){
    posts.splice(searchidx, 1);
    res.sendStatus(200);
  }
  else{
    res
    .status(404)
    .json({error: `There is no post id at ${id}.`});
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
