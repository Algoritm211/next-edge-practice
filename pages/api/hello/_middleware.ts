import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  console.log('basicAuth', basicAuth)

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    console.log('auth', auth)
    console.log('buffer', Buffer.from(auth, 'base64').toString())
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':');

    if (user === 'admin' && password === 'password') {
      return NextResponse.next();
    }
  }

  return new Response('Auth required for this route', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  })
}
