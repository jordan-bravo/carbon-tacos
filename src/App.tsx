import React, { ReactElement, useEffect, useState } from "react";
import {
  Button,
  Content,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  Search,
  Tile,
  InlineNotification,
  Grid,
  Row,
  Column,
} from "carbon-components-react";
import {
  ingredientsHeaderData,
  ingredientsRowData,
} from "./data/ingredientsData";
import DataTableSkeletonComponent from "./components/DataTableSkeletonComponent";
import DataTableComponent from "./components/DataTableComponent";

const App = (): ReactElement => {
  // State
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [showToastNotification, setShowToastNotification] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate a delayed response
  useEffect(() => {
    setTimeout(async () => {
      setShowTable(true);
    }, 1500);
  }, []);

  // Methods
  const addTacoHandler = () => {
    setShowToastNotification(true);
    setTimeout(() => setShowToastNotification(false), 5000);
  };

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

  const filterItems: Function = (array: any, query: string) => {
    if (!query) return array;
    else
      return array.filter(
        (element: any) =>
          element.ingredient.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
  };

  return (
    <>
      <Header className="header" aria-label="IBM Carbon Tacos">
        <HeaderName href="#">Carbon Tacos</HeaderName>
        <HeaderNavigation aria-label="IBM Carbon Tacos">
          <HeaderMenuItem className="header__menu-item" href="#">
            Menu
          </HeaderMenuItem>
          <HeaderMenuItem href="#">Ingredients</HeaderMenuItem>
          <HeaderMenuItem href="#">Locations</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
      <Content className="tacos__main-content">
        <Grid>
          <Row>
            <Column>
              <h1 className="tacos--heading">Build your own taco</h1>
              <h2 className="tacos--subheading">Nutritional totals</h2>
            </Column>
            <Column>
              {showToastNotification && (
                <InlineNotification
                  title="Taco Added"
                  subtitle="Thank you for your order"
                  kind="success"
                />
              )}
            </Column>
          </Row>
          <Row className="totals-row">
            <Column className="tacos--col-bleed">
              <Tile>
                <h3 className="tacos--label">Total Fat</h3>
                <p className="tacos--value">{totalFat}g</p>
              </Tile>
            </Column>
            <Column className="tacos--col-bleed">
              <Tile>
                <h3 className="tacos--label">Total Protein</h3>
                <p className="tacos--value">{totalProtein}g</p>
              </Tile>
            </Column>
            <Column className="tacos--col-bleed">
              <Tile>
                <h3 className="tacos--label">Total Carbs</h3>
                <p className="tacos--value">{totalCarb}g</p>
              </Tile>
            </Column>
          </Row>
          <Row className="tacos--row-cta button-row">
            <Column>
              <h2 className="tacos--subheading">Choose your ingredients</h2>
            </Column>
            <Column className="tacos--col-cta">
              <Button onClick={() => addTacoHandler()}>Add taco</Button>
            </Column>
          </Row>
          <Search
            size="lg"
            placeholder="Search"
            labelText="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {!showTable && <DataTableSkeletonComponent />}
          {showTable && (
            <DataTableComponent
              updateTotals={updateTotals}
              headerData={ingredientsHeaderData}
              rowData={filterItems(ingredientsRowData, searchTerm)}
            />
          )}
        </Grid>
      </Content>
    </>
  );
};

export default App;
