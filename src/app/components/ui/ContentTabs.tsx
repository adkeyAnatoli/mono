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
};

export function ContentTabs({ items, defaultValue }: Props) {
  if (items.length === 0) {
    return null;
  }

  const first = items[0]!.value;
  const resolvedDefault =
    defaultValue && items.some((i) => i.value === defaultValue)
      ? defaultValue
      : first;

  return (
    <Tabs.Root className={styles.root} defaultValue={resolvedDefault}>
      <Tabs.List className={styles.listUnderline} aria-label="Section tabs">
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            className={styles.triggerUnderline}
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
