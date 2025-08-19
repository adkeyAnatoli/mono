'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IImageLinkProps } from '@/src/app/interfaces/imageLinkInterface';
import { useRedirect } from '@/src/app/context/RedirectContext';

const ImageLink: React.FC<IImageLinkProps> = ({
  link,
  id,
  src,
  height,
  width,
  alt,
  title,
}) => {
  const { setLink } = useRedirect();
  const handleClick = () => {
    setLink(link);
  };
  return (
    <Link href={`/casino/${id}`} onClick={handleClick}>
      <Image
        src={src}
        height={height}
        width={width}
        alt={alt}
        title={title}
        style={{ cursor: 'pointer' }}
      />
    </Link>
  );
};

export default ImageLink;
