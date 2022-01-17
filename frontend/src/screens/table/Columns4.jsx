export const COLUMNS = [
  {
    Header: "id",
    accessor: (row) => row._id,
  },
  {
    Header: "name",
    accessor: (row) => row?.name,
  },
  {
    Header: "email",
    accessor: (row) => row?.email,
  },
  {
    Header: "admin",
    accessor: (row) =>
      row?.isAdmin ? (
        <span style={{ color: "#5CB85C" }}>
          <i className="fas fa-check"></i>
        </span>
      ) : (
        <span style={{ color: "#C4000E" }}>
          <i className="fas fa-times"></i>
        </span>
      ),
  },
];
