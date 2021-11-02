import { ChangeEventHandler, ReactElement } from "react";
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
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
} from "carbon-components-react";

import { Rows, Headers, Cells, RowData } from "../models/dataTableModels";

type DataTableComponentProps = {
  updateTotals: Function;
  headerData: Array<Headers>;
  rowData: Array<RowData>;
  addTacoHandler: Function;
};

const DataTableComponent = ({
  updateTotals,
  headerData,
  rowData,
  addTacoHandler,
}: DataTableComponentProps): ReactElement => {
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
        onInputChange,
      }: {
        rows: Array<Rows>;
        headers: Array<Headers>;
        getHeaderProps: Function;
        getRowProps: Function;
        getSelectionProps: Function;
        getTableProps: Function;
        getTableContainerProps: Function;
        selectedRows: Array<Rows>;
        onInputChange: ChangeEventHandler<HTMLInputElement>;
      }): ReactElement => {
        updateTotals(selectedRows);
        return (
          <TableContainer
            title="Choose your ingredients"
            {...getTableContainerProps()}
          >
            <TableToolbar>
              <TableToolbarContent>
                {/* pass in `onInputChange` change here to make filtering work */}
                <TableToolbarSearch
                  persistent={true}
                  onChange={onInputChange}
                  placeholder="Search ingredients"
                />
                <Button onClick={() => addTacoHandler()}>Add Taco</Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header: Headers, i: number) => (
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: Rows) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    <TableSelectRow
                      {...getSelectionProps({
                        row,
                      })}
                    />
                    {row.cells.map((cell: Cells) => (
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
