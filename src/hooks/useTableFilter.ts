/**
 * @author: Adam Lisichin
 * @file: Exports custom hooks:
 * - useTableFilter - returns memoized rows filtered by column query
 **/
import {useMemo} from "react";


/**
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
        try {
          // if value is null, do not convert it to string
          if (row[column] === null) return false;
          // check if value is a substring of a given query string
          // because it might be an object, JSON.stringify is used to ensure that it is turned to string
          return JSON.stringify(row[column]).toLowerCase().indexOf(query.toLowerCase()) > -1;
        } catch {
          // in case an error is thrown, search condition is not met
          return false;
        }
      });
    });
  }, [rows, columns, query]);
};

export default useTableFilter;
