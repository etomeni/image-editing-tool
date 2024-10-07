import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
  const data = await res.json();

  return NextResponse.json(data);
}
