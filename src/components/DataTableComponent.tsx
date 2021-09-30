import React, { ReactElement } from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableSelectRow,
  TableCell,
} from "carbon-components-react";

const DataTableComponent = ({
  updateTotals,
  headerData,
  rowData,
}: {
  updateTotals: Function;
  headerData: any;
  rowData: any;
}): ReactElement => {
  return (
    <DataTable rows={rowData} headers={headerData} isSortable>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getTableProps,
        getTableContainerProps,
        selectedRows,
      }: {
        rows: any;
        headers: any;
        getHeaderProps: any;
        getRowProps: any;
        getSelectionProps: any;
        getTableProps: any;
        getTableContainerProps: any;
        selectedRows: any;
      }): ReactElement => {
        updateTotals(selectedRows);
        return (
          <TableContainer {...getTableContainerProps()}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header: any, i: any) => (
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    <TableSelectRow
                      {...getSelectionProps({
                        row,
                      })}
                    />
                    {row.cells.map((cell: any) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }}
    </DataTable>
  );
};

export default DataTableComponent;
