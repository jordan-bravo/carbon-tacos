import React, { ReactElement, useState } from "react";
import {
  Button,
  Content,
  DataTable,
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
  // const [calories, setCalories] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  const handleSelection = (selectedRows: any) => {
    // let totalCalories = 0;
    // let fatCalories = 0;
    // let proteinCalories = 0;
    // let carbCalories = 0;

    for (var row of selectedRows) {
      // totalCalories += row.cells[1].value;
      setTotalFat(totalFat + row.cells[2].value);
      setTotalProtein(totalProtein + row.cells[3].value);
      setTotalCarbs(totalCarbs + row.cells[4].value);
    }

    // const totalMacros = fatCalories + proteinCalories + carbCalories;

    // setCalories(totalCalories);
  };

  return (
    <div>
      <Header>
        <HeaderName href="#">Tacos</HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
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
          <div className="bx--row">
            <div className="bx--col demo--col-bleed">
              <Tile>
                <h3 className="demo--label">Calories</h3>
                <p className="demo--value">0</p>
              </Tile>
            </div>
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
                <p className="demo--value">{totalCarbs}g</p>
              </Tile>
            </div>
          </div>
          <div className="bx--row demo--row-cta">
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

        <DataTable rows={ingredientsRowData} headers={ingredientsHeaderData}>
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
          }): ReactElement => (
            <TableContainer {...getTableContainerProps()}>
              <Table
                onClick={() => handleSelection(selectedRows)}
                {...getTableProps()}
              >
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
          )}
        </DataTable>
      </Content>
    </div>
  );
};

export default App;
