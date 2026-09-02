import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const fileName = params.name;
  
  // Look in both public/pins and pinterest_output
  const publicPath = path.join(process.cwd(), 'public', 'pins', fileName);
  const outputPath = path.join(process.cwd(), 'pinterest_output', fileName);

  let targetPath = null;
  if (fs.existsSync(publicPath)) {
    targetPath = publicPath;
  } else if (fs.existsSync(outputPath)) {
    targetPath = outputPath;
  }

  if (!targetPath) {
    return new Response('Image Not Found', { status: 404 });
  }

  const imageBuffer = fs.readFileSync(targetPath);

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
