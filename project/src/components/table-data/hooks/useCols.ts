import {
  useCallback,
  useState
} from "react"
import type { Column } from '@admiral-ds/react-ui';


export const columnList: Column[] = [
  {
    name: 'title',
    title: 'Название',
  },
  {
    name: 'additionalInfo',
    title: 'Описание',
    width: 150,
  },
  {
    name: 'tags',
    title: 'Тэги',
    width: 170,
  },
  {
    name: 'baked',
    title: 'Дата изготовления',
  },
  {
    name: 'expires',
    title: 'Срок годности',
  },
];

export const useCols = () => {
  const [cols, setCols] = useState(columnList);

  const resize = useCallback(({ name, width }: { name: string; width: string }) => {
    setCols((cols) => cols.map((col) => (col.name === name ? { ...col, width } : col)));
  }, []);

  return {
    cols,
    resize
  }
}