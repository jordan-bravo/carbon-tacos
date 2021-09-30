import React, { ReactElement } from "react";
import { DataTableSkeleton } from "carbon-components-react";

const DataTableSkeletonComponent = (): ReactElement => {
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

export default DataTableSkeletonComponent;
