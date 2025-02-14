'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IImageLinkProps } from '@/app/interfaces/imageLinkInterface';
import { useRedirect } from '@/app/context/RedirectContext';

const ImageLink: React.FC<IImageLinkProps> = ({
  link,
  id,
  src,
  height,
  width,
  alt,
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
        style={{ cursor: 'pointer' }}
      />
    </Link>
  );
};

export default ImageLink;
