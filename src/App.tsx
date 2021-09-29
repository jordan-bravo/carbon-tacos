import React, { ReactElement, useEffect, useState } from "react";
import {
  Button,
  Content,
  DataTable,
  DataTableSkeleton,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
  Tile,
} from "carbon-components-react";
import { ingredientsHeaderData, ingredientsRowData } from "./ingredientsData";

const App: React.FC = (): ReactElement => {
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const updateTotals: Function = (selectedRows: any): void => {
    let totalFatValue = 0;
    let totalProteinValue = 0;
    let totalCarbValue = 0;
    if (selectedRows.length !== 0) {
      for (let row of selectedRows) {
        totalFatValue += row.cells[2].value;
        totalProteinValue += row.cells[3].value;
        totalCarbValue += row.cells[4].value;
      }
    }
    setTotalFat(totalFatValue);
    setTotalProtein(totalProteinValue);
    setTotalCarb(totalCarbValue);
  };

  const returnDataTableSkeleton = (): ReactElement => {
    return (
      <DataTableSkeleton
        columnCount={5}
        rowCount={4}
        compact={false}
        zebra={false}
        showHeader={false}
        showToolbar={false}
      />
    );
  };

  const returnDataTable = (): ReactElement => {
    return (
      <DataTable
        rows={ingredientsRowData}
        headers={ingredientsHeaderData}
        isSortable
      >
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
                      <TableSelectRow {...getSelectionProps({ row })} />
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

  useEffect(() => {
    setTimeout(async () => {
      setShowTable(true);
    }, 1500);
  }, []);

  return (
    <div>
      <Header>
        <HeaderName href="#">Tacos</HeaderName>
        <HeaderNavigation aria-label="IBM Carbon Tacos">
          <HeaderMenuItem href="#">Menu</HeaderMenuItem>
          <HeaderMenuItem href="#">Ingredients</HeaderMenuItem>
          <HeaderMenuItem href="#">Locations</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
      <Content id="main-content">
        <div className="bs--grid">
          <div className="bx--row">
            <div className="bx--col">
              <h1 className="demo--heading">Build your own taco</h1>
              <h2 className="demo--subheading">Nutritional totals</h2>
            </div>
          </div>
          <div className="bx--row margin-horizontal-zero">
            <div className="bx--col demo--col-bleed">
              <Tile>
                <h3 className="demo--label">Total Fat</h3>
                <p className="demo--value">{totalFat}g</p>
              </Tile>
            </div>
            <div className="bx--col demo--col-bleed">
              <Tile>
                <h3 className="demo--label">Total Protein</h3>
                <p className="demo--value">{totalProtein}g</p>
              </Tile>
            </div>
            <div className="bx--col demo--col-bleed">
              <Tile>
                <h3 className="demo--label">Total Carbs</h3>
                <p className="demo--value">{totalCarb}g</p>
              </Tile>
            </div>
          </div>
          <div className="bx--row demo--row-cta margin-horizontal-zero">
            <div className="bx--col">
              <h2 className="demo--subheading">Choose your ingredients</h2>
            </div>
            <div className="bx--col demo--col-cta">
              <Button>Add taco</Button>
            </div>
          </div>
          <div className="bx--row demo--row-table">
            <div className="bx--col demo--col-bleed"></div>
          </div>
        </div>
        {!showTable && returnDataTableSkeleton()}
        {showTable && returnDataTable()}
      </Content>
    </div>
  );
};

export default App;
