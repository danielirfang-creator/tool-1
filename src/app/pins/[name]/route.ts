import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const fileName = params.name;
  const filePath = path.join(process.cwd(), 'pinterest_output', fileName);

  if (!fs.existsSync(filePath)) {
    return new Response('Image Not Found', { status: 404 });
  }

  const imageBuffer = fs.readFileSync(filePath);

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
