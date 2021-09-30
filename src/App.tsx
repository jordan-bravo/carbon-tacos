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
    if (query === "") return array;
    else
      return array.filter(
        (element: any) =>
          element.ingredient.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
  };

  return (
    <div>
      <Header aria-label="IBM Carbon Tacos">
        <HeaderName href="#">Carbon Tacos</HeaderName>
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
            <div className="bx--col toast-notification">
              {showToastNotification && (
                <InlineNotification
                  title="Taco Added"
                  subtitle="Thank you for your order"
                  kind="success"
                  style={{ marginBottom: ".5rem" }}
                />
              )}
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
              <Button onClick={() => addTacoHandler()}>Add taco</Button>
            </div>
          </div>
          <div className="bx--row demo--row-table">
            <div className="bx--col demo--col-bleed"></div>
          </div>
        </div>
        <div className="">
          <Search
            size="lg"
            placeholder="search"
            labelText="Search"
            // {...props()}
            id="search-1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {!showTable && <DataTableSkeletonComponent />}
        {showTable && (
          <DataTableComponent
            updateTotals={updateTotals}
            headerData={ingredientsHeaderData}
            rowData={filterItems(ingredientsRowData, searchTerm)}
          />
        )}
      </Content>
    </div>
  );
};

export default App;
