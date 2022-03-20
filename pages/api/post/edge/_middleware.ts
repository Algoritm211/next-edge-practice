import {NextFetchEvent, NextRequest} from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl;
  console.log(url)
  let postId = null;
  url.searchParams.forEach((value, key) => {
    if (key === 'postId') {
      postId = value;
      return
    }
  })

  if (!postId) {
    return new Response(JSON.stringify({error: 'postId is required'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const rawResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await rawResponse.json();

  return new Response(JSON.stringify({title: post.title}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
