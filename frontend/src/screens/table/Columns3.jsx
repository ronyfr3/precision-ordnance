export const COLUMNS = [
  {
    Header: "image",
    accessor: "image",
    disableFilters: true, //to disable filter input for this column
    disableSortBy: true, //to disable sort for this column
    Cell: (tableProps) => (
      // console.log(tableProps?.row?.original?.image[0].filename)
      <img src={`/uploads/${tableProps?.row?.original?.image[0].filename}`} alt='' />
    ),
  },
  {
    Header: "product name",
    accessor: "product_name",
  },
  {
    Header: "price",
    accessor: "price",
  },
  {
    Header: "status",
    accessor: "status",
  },
];
