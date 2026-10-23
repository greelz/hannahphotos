import Image from "next/image";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { notFound } from "next/navigation";

import { r2 } from "../../../lib/r2";

async function getPhotos(slug: string) {
  const prefix = `production/${slug}/`;

  const result = await r2.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET!,
      Prefix: prefix,
    }),
  );

  if (!result.Contents?.length) {
    return null;
  }

  const photos = await Promise.all(
    result.Contents.filter((obj) => obj.Key && !obj.Key.endsWith("/")).map(
      async (obj) => {
        const command = new GetObjectCommand({
          Bucket: process.env.R2_BUCKET!,
          Key: obj.Key!,
        });

        const url = await getSignedUrl(r2, command, {
          expiresIn: 60 * 10, // 10 minutes
        });

        return {
          key: obj.Key!,
          url,
        };
      },
    ),
  );

  return photos;
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;

  const photos = await getPhotos(slug);

  if (!photos) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">{slug}</h1>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.key} className="mb-4 break-inside-avoid">
            <Image
              src={photo.url}
              alt=""
              width={500}
              height={500}
              className="w-full h-auto rounded-lg transition-all hover:scale-[1.02] duration-100 cursor-pointer"
              unoptimized
            />
          </div>
        ))}
      </div>
    </main>
  );
}
