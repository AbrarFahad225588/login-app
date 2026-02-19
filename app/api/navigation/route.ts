// app/api/navigation/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'navigation.json');

// Helper to read data
async function readData() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// GET: Fetch all links
export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

// POST: Add a new link
export async function POST(request: Request) {
  const data = await readData();
  const body = await request.json();
  
  const newItem = { id: data.length+1, ...body };
  data.push(newItem);
  
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(newItem, { status: 201 });
}