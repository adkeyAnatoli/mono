'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWebsite } from '../../context/WebsiteProvider';

interface IImageLinkProps {
  src: string;
  height: number;
  width: number;
  alt: string;
  title?: string;
}

const ImageLink: React.FC<IImageLinkProps> = ({
  src,
  height,
  width,
  alt,
  title,
}) => {
  const { website } = useWebsite();
  if (!website)
    return (
      <Link
        href={`#`}
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
  const offer = website.offers[0];
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('redirectLink', offer?.link);
    window.open(`/casino/${offer.id}`, '_blank');
  };

  return (
    <Link
      href={`/casino/${offer.id}`}
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
