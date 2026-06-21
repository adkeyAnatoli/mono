'use client';

import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import styles from './contentTabs.module.css';

export type ContentTabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
};

type Props = {
  items: ContentTabItem[];
  defaultValue?: string;
  variant?: 'underline' | 'pills';
  className?: string;
};

export function ContentTabs({
  items,
  defaultValue,
  variant = 'underline',
  className,
}: Props) {
  if (items.length === 0) {
    return null;
  }

  const first = items[0]!.value;
  const resolvedDefault =
    defaultValue && items.some((i) => i.value === defaultValue)
      ? defaultValue
      : first;

  const listClass =
    variant === 'pills' ? styles.listPills : styles.listUnderline;
  const triggerClass =
    variant === 'pills' ? styles.triggerPill : styles.triggerUnderline;

  return (
    <Tabs.Root
      className={`${styles.root} ${className ?? ''}`}
      defaultValue={resolvedDefault}
    >
      <Tabs.List className={listClass} aria-label="Section tabs">
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            className={triggerClass}
            value={item.value}
          >
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Content
          key={item.value}
          className={styles.content}
          value={item.value}
        >
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
