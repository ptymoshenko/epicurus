import { createClient } from '@sanity/client';
import http from 'http';

const TOKEN = 'skh0OiNcntLJ5j82GcLT0yVgIw9KdzP7VU9MyO7AmQPfm6piQrOoYISrDBoEc3IC1GbictENilfdZ2v8Y';

const client = createClient({
  projectId: 'vh1pcsjr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-04-30',
  token: TOKEN,
});

// Figma localhost images mapped to article IDs
const assignments = [
  {
    name: 'Maker Space interior',
    imageUrl: 'http://localhost:3845/assets/6c71830ece9ccfb98937f69afb5e7b7ea628ac9c.png',
    articleId: '57a70d7b-66f3-401e-907c-7584015725eb', // Opening the New Studio Space
  },
  {
    name: 'EAMES book / design',
    imageUrl: 'http://localhost:3845/assets/b7e29b4cad28919cda6647df41f8911c42ba9c3e.png',
    articleId: '3238544b-3166-4a56-ad17-5c723032134f', // Featured in Wallpaper* Magazine
  },
  {
    name: 'Books / magazines stack',
    imageUrl: 'http://localhost:3845/assets/fb635fc4e14e7cb8ece7228d322b1ea08c2668cd.png',
    articleId: '6b1eb055-e0da-426c-985c-d6fabdb64219', // Named in Forbes 30 Under 30
  },
  {
    name: 'Abstract blurry flowers',
    imageUrl: 'http://localhost:3845/assets/e561086c7343b4c3b46f7c5bc594287ae3fe1bc7.png',
    articleId: '6eab3cd7-812e-4c68-85ea-489fc8af52e7', // New Brand Identity for Global Hospitality
  },
  {
    name: 'Person holding portrait',
    imageUrl: 'http://localhost:3845/assets/af3d1deb8e3c129b06db1eeb0c04d5f6d049cdce.png',
    articleId: '18e9dfaa-2be6-4af8-82f1-9b70b465b642', // Solo Exhibition: Portraits in Public Space
  },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
  });
}

async function main() {
  for (const { name, imageUrl, articleId } of assignments) {
    console.log(`\n→ ${name}`);

    const buffer = await fetchBuffer(imageUrl);
    const filename = imageUrl.split('/').pop() + '.png';

    const asset = await client.assets.upload('image', buffer, { filename });
    console.log(`  Uploaded asset: ${asset._id}`);

    const imageField = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    };

    // Patch published document
    await client.patch(articleId).set({ image: imageField }).commit();
    console.log(`  Patched published: ${articleId}`);

    // Patch draft if it exists
    try {
      await client.patch(`drafts.${articleId}`).set({ image: imageField }).commit();
      console.log(`  Patched draft: drafts.${articleId}`);
    } catch {
      // Draft may not exist — skip silently
    }
  }

  console.log('\n✓ All images uploaded and assigned.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
