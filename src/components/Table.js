const alignClass = align =>
  align === 'right' ? 'text-right' : align === 'left' ? 'text-left' : 'center';

const Table = ({ columns = [], rows = [] }) => (
  <div className="overflow-x-scroll sm:overflow-x-auto">
    <table className="w-full">
      <thead className="border-t">
        <tr>
          {columns
            ?.filter(column => !column.hidden)
            ?.map((column, index) => (
              <th
                key={column.id}
                className={`bg-gray-50 px-2 sm:px-3 py-3 text-sm sm:text-base whitespace-nowrap font-semibold capitalize ${alignClass(
                  column.align
                )}`}
              >
                {column.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="border-b">
        {rows.map(row => (
          <tr key={row.id} className="group">
            {columns
              ?.filter(column => !column.hidden)
              ?.map(column => (
                <td
                  key={column.id}
                  className={`bg-gray-50 group-hover:bg-gray-100 border-t px-2 sm:px-3 py-3 ${alignClass(
                    column.align
                  )}`}
                >
                  {column?.renderCell(row)}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
