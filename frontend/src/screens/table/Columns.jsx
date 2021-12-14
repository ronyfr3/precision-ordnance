export const COLUMNS = [
  {
    Header: 'image',
    accessor: 'image',
    disableFilters: true, //to disable filter input for this column
    disableSortBy: true, //to disable sort for this column
    Cell: (tableProps) => {
      return <img src={`/uploads/${tableProps?.row?.original?.files?.files[0]?.filename}`} alt='' />
    },
  },
  {
    id: (row) => row.id,
    Header: 'name',
    accessor: (row) => row.productInfo.title,
  },
  {
    Header: 'category',
    accessor: 'category',
  },
  {
    Header: 'brand',
    accessor: 'brand',
  },
  {
    // id: row => row.id,
    Header: 'price',
    accessor: (row) => row.productInfo.price,
  },
];
