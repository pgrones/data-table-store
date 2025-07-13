import { useState } from 'react';
import { useTotals } from '@lib';
import { Divider, Group, NumberInput, Text } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

export const Totals = () => {
  const { totalEntities, pageSize, setPageSize } = useTotals();
  const [value, setValue] = useState(pageSize);

  const handlePageSizeChange = useDebouncedCallback(
    (value: number) => {
      setPageSize(value);
    },
    { delay: 500 }
  );

  const handleChange = (value: number | string) => {
    if (typeof value === 'string') return;

    setValue(value);
    handlePageSizeChange(value);
  };

  const max = Math.min(totalEntities, 500);

  return (
    <Group wrap="nowrap">
      <Text c="dimmed" size="sm">
        {totalEntities} Entries
      </Text>

      <Divider orientation="vertical" />

      <NumberInput
        w={80}
        value={value}
        onChange={handleChange}
        min={1}
        max={max}
        allowDecimal={false}
        clampBehavior="strict"
        step={10}
        styles={{ input: { minHeight: 32, height: 32 } }}
      />
      <Text c="dimmed" size="sm">
        Entries per page
      </Text>
    </Group>
  );
};
