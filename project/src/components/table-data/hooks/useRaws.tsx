import {
  useState,
  useCallback,
  useEffect
} from "react"
import { T } from '@admiral-ds/react-ui';
import type { TableRow } from '@admiral-ds/react-ui';
import styled from 'styled-components';

import { requestTableData } from "../../../api/request-table-data"


const numberFormatter = new Intl.NumberFormat();

const AmountCell = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;

  &[data-disabled='true'] {
    & > * {
      color: ${({ theme }) => theme.color['Neutral/Neutral 30']};
    }
  }
`;
type RowFields = {
  title: string;
  additionalInfo: string;
  tags: React.ReactNode;
  baked: string;
  expires: string;
}
type RowData = TableRow & RowFields;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.color['Cyan/Cyan 10']};
  padding: 16px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding-left: 16px;
  background: ${({ theme }) => theme.color['Special/Elevated BG']};
  & > div {
    margin-bottom: 8px;
  }
`;

const expandedRowRender = (row: RowData) => {
  return (
    <Wrapper>
      <Content>
        <div>Тип сделки: {row.title}</div>
        <div>Дополнительная информация: {row.additionalInfo}</div>
        <div>Тэги: {row.tags}</div>
        <div>...</div>
        <div>Дата изготовления: {new Date(row.baked).toLocaleDateString()}</div>
        <div>Срок годности: {new Date(row.expires).toLocaleDateString()}</div>
      </Content>
    </Wrapper>
  );
};

export const rowList: RowData[] = [
  {
    id: '0001',
    title: 'МНО',
    additionalInfo: new Date('2020-08-06').toLocaleDateString(),
    tags: (
      <AmountCell>
        <T font="Body/Body 2 Short">{numberFormatter.format(18_000_000)}</T>
      </AmountCell>
    ),
    baked: 'RUB',
    expires: "2.5",
    expanded: true,
    expandedRowRender
  },
  {
    id: '0002',
    title: 'МНО',
    additionalInfo: new Date('2020-08-06').toLocaleDateString(),
    tags: (
      <AmountCell>
        <T font="Body/Body 2 Short">{numberFormatter.format(32_500_000_000)}</T>
      </AmountCell>
    ),
    baked: 'RUB',
    expires: "2.5",
    expandedRowRender
  },
  {
    id: '0003',
    title: 'МНО',
    additionalInfo: new Date('2020-08-06').toLocaleDateString(),
    tags: (
      <AmountCell>
        <T font="Body/Body 2 Short">{numberFormatter.format(18_000_000)}</T>
      </AmountCell>
    ),
    baked: 'RUB',
    expires: "2.5",
    expandedRowRender
  },
];

export const useRows = () => {
  const [rows, setRows] = useState(rowList);

  useEffect(() => {
    const fetchTableData = async () => {
      const response = await requestTableData()

      const rows = response.items.map(i => {
        return {
          id: i.id,
          title: i.title,
          additionalInfo: i.additionalInfo,
          tags: (
            <AmountCell>
              <T font="Body/Body 2 Short">{i.tags.join(", ")}</T>
            </AmountCell>
          ),
          baked: new Date(i.baked).toLocaleDateString(),
          expires: new Date(i.expires).toLocaleDateString(),
          expandedRowRender
        }
      })

      setRows(rows)
    }

    fetchTableData()
  }, []);

  const selectionChange = useCallback((ids: Record<string | number, boolean>): void => {
    setRows((rows) => rows.map((row) => ({ ...row, selected: ids[row.id] })));
  }, []);

  const expansionChange = useCallback((ids: Record<string | number, boolean>): void => {
    setRows((rows) => rows.map((row) => ({ ...row, expanded: ids[row.id] })));
  }, []);

  return {
    rows,
    selectionChange,
    expansionChange
  }
}