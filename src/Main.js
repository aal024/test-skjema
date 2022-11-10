import { style } from "@mui/system";
import React from "react";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import EditCase from "./EditCase";

/** Her kommer hovedinnholdet:
 * Navn på deg selv osv hvis dette ikke er i headeren
 * Liste over personer man skal gi tilgang til --> med checkbox.
 * En knapp for godkjenn --> som evnt trigger en popup?
 * En knapp for last opp vedlegg - med en infoknapp om at dette kun er nødvendig hvis det er noe som kun finnes i papir-arkiv?
 * Skal vi ha en seksjon når alt er sendt inn sånn "Du har nå godkjent info av xxxxxx. Du kan nå logge ut, også med en utloggings-knapp?
 * Bør det være en timer aktivert - automatisk utlogging om du ikke har gjort noe på x antall minutter? Kobles opp mot backend? */

const COLUMNS = [
  {
    Header: "Saksnummer",
    accessor: "saksnummer",
  },
  {
    Header: "Navn",
    accessor: "name",
  },
  {
    Header: "Personnummer",
    accessor: "personnummer",
  },
  {
    Header: "Dato",
    accessor: "dato",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
  {
    Header: "Rediger",
    accessor: "rediger",
  },
];

function Main() {
  //props inni her
  const [data, setData] = useState(
    []
  ); /* Godkjenn knappen kobles opp mot denne */
  const columns = useMemo(() => COLUMNS, []);
  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/bruker");
    const json = await res.json();
    setData(json.users);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const updateState = async (message) => {
    var svar = await fetch("http://localhost:4000/approve", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await svar.json();
    const sak = data.find((s) => {
      return s.saksnummer === message;
    });
    sak.status = json.status;
    setData([...data]);
    console.log("test" + new Date(), json);
  };

  const editCase = (snummer) => {
    return <EditCase snummer={snummer} />;
  };

  return (
    <div>
      <h1 style={styling_h1}> Forespørsler </h1>

      <div className="container">
        <table style={styling_Table} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    style={{
                      padding: "1rem",
                      borderBottom: "solid 1px black",
                      fontWeight: "bold",
                    }}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    ///
                    if (cell.column.Header === "Action") {
                      return (
                        <td
                          style={{
                            padding: "1rem",
                            borderRight: "1px solid black",
                          }}
                          {...cell.getCellProps()}
                        >
                          <button
                            onClick={() =>
                              updateState(cell.row.original.saksnummer)
                            }
                          >
                            {" "}
                            {cell.render("Cell")}{" "}
                          </button>
                        </td>
                      );
                    } else if (cell.column.Header === "Rediger") {
                      return (
                        <td
                          style={{
                            padding: "1rem",
                            borderRight: "1px solid black",
                          }}
                          {...cell.getCellProps()}
                        >
                          <button
                            onClick={() =>
                              editCase(cell.row.original.saksnummer)
                            }
                          >
                            {" "}
                            {cell.render("Cell")}{" "}
                          </button>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          style={{
                            padding: "1rem",
                            borderRight: "1px solid black",
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination" style={{ marginTop: "1rem" }}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{""}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*<div style={styling_p}>
        {myPersons.map((person) => (
          <p>
            {person.name} {person.saksnummer}
          </p>
        ))}
      </div>
      */}
    </div>
  );
}

export default Main;

const styling_h1 = {
  color: "#000",
  paddingTop: "5rem",
};

const styling_Table = {
  background: "lightgrey",
  borderSpacing: "0",
  border: "1px solid black",
};
