export const COLUMNS = [
  {
    Header: "image",
    accessor: "image",
    disableFilters: true, //to disable filter input for this column
    disableSortBy: true, //to disable sort for this column
    Cell: (tableProps) => (
      // console.log("8", tableProps?.row)
      <img src={`/uploads/${tableProps?.row?.original?.orderItems[0]?.image[0]?.filename}`} alt='' />
    ),
  },
  {
    // id: (row) => row.id,
    Header: "product name",
    accessor: (row) => row?.orderItems[0]?.title,
  },
  {
    Header: "category",
    accessor: (row) => row?.orderItems[0]?.category,
  },
  {
    Header: "price",
    accessor: (row) => row?.orderItems[0]?.price,
  },
  {
    Header: "status",
    accessor: (row) => row?.isDelivered ? "Delivered" : "Processing",
  },
];
