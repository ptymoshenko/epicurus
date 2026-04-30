import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve } from 'path'

const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } =
  process.env

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local')
  process.exit(1)
}
if (!SANITY_API_TOKEN) {
  console.error('Missing SANITY_API_TOKEN in .env.local — create one at sanity.io/manage > API > Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-04-30',
  token: SANITY_API_TOKEN,
  useCdn: false,
})

const projects = [
  {
    title: 'Surfers Paradise',
    slug: 'surfers-paradise',
    image: 'public/images/work-1.png',
    tags: ['Social Media', 'Photography'],
    lightTags: false,
    tall: true,
    order: 1,
  },
  {
    title: 'Cyberpunk Caffe',
    slug: 'cyberpunk-caffe',
    image: 'public/images/work-2.png',
    tags: ['Social Media', 'Photography'],
    lightTags: true,
    tall: false,
    order: 2,
  },
  {
    title: 'Agency 976',
    slug: 'agency-976',
    image: 'public/images/work-3.png',
    tags: ['Social Media', 'Photography'],
    lightTags: true,
    tall: false,
    order: 3,
  },
  {
    title: 'Minimal Playground',
    slug: 'minimal-playground',
    image: 'public/images/work-4.png',
    tags: ['Social Media', 'Photography'],
    lightTags: false,
    tall: true,
    order: 4,
  },
]

async function uploadImage(imagePath) {
  const stream = createReadStream(resolve(imagePath))
  const asset = await client.assets.upload('image', stream, {
    filename: imagePath.split('/').pop(),
  })
  return asset._id
}

async function seed() {
  for (const project of projects) {
    // Skip if already exists
    const existing = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]._id`,
      { slug: project.slug }
    )
    if (existing) {
      console.log(`Skipping (already exists): ${project.title}`)
      continue
    }

    console.log(`Uploading image for: ${project.title}...`)
    const imageAssetId = await uploadImage(project.image)

    await client.create({
      _type: 'project',
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAssetId },
      },
      tags: project.tags,
      lightTags: project.lightTags,
      tall: project.tall,
      order: project.order,
    })

    console.log(`✓ Created: ${project.title}`)
  }

  console.log('\nDone! Refresh your homepage to see the projects.')
}

seed().catch(console.error)
