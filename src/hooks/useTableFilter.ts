import {useMemo} from "react";

/*
* Returns rows filtered by chosen columns. Columns mean (sub)array of row's values.
* T - type/interface of a row object - row
* K - array which consists of keys of T - columns
*/
const useTableFilter = <T extends { [x: string]: any }, K extends (keyof T)[]>
(rows: T[], columns: K, query: string) => {
  // memoize result - do not recreate function unless rows/columns/query has changed
  return useMemo(() => {
    // return filtered rows
    return rows.filter((row) => {
      // filter by any of the columns
      return columns.some((column) => {
        // check if value is a substring of a given query string
        return row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    });
  }, [rows, columns, query]);
};

export default useTableFilter;
