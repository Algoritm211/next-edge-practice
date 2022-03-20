import {NextApiRequest, NextApiResponse} from "next";

interface PostNextApiRequest extends NextApiRequest {
  query: { postId: string }
}

export default async function handler(req: PostNextApiRequest, res: NextApiResponse) {
  const {postId} = req.query

  if (!postId) {
    return res.status(500).json({error: 'postId is required'});
  }

  const rawResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await rawResponse.json();

  return res.status(200).json({title: post.title});
}
