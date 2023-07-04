import * as React from 'react';
import { Table } from '@admiral-ds/react-ui';
import { useRows } from "./hooks/useRaws"
import { useCols } from "./hooks/useCols"


export const DataTable = (props: any) => {
  const {
    rows,
    selectionChange,
    expansionChange
  } = useRows();
  const { cols, resize } = useCols();

  return (
    <Table
      {...props}
      rowList={rows}
      columnList={cols}
      displayRowSelectionColumn
      displayRowExpansionColumn
      onRowSelectionChange={selectionChange}
      onRowExpansionChange={expansionChange}
      onColumnResize={resize}
    />
  );
};