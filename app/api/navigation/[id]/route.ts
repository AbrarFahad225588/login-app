// app/api/navigation/[id]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'navigation.json');

async function readData() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// PATCH: Update a link
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const data = await readData();

  const index = data.findIndex((item:any) => item.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  data[index] = { ...data[index], ...body };
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(data[index]);
}

// DELETE: Remove a link
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await readData();

  const newData = data.filter((item: any) => item.id !== id);
  await fs.writeFile(filePath, JSON.stringify(newData, null, 2));

  return NextResponse.json({ message: 'Deleted successfully' });
}