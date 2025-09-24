'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IImageLinkProps {
  link: string;
  id: number;
  src: string;
  height: number;
  width: number;
  alt: string;
  title?: string;
}

const ImageLink: React.FC<IImageLinkProps> = ({
  link,
  id,
  src,
  height,
  width,
  alt,
  title,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('redirectLink', link);
    window.open(`/casino/${id}`, '_blank');
  };

  return (
    <Link
      href={`/casino/${id}`}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block' }}
    >
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
