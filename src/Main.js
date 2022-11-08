import { style } from "@mui/system";
import React from "react";
import { useRef, useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";

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
];

function Main() {
  const [data, setData] =
    useState([]); /* Godkjenn knappen kobles opp mot denne */
  const columns = useMemo(() => COLUMNS, []);
  const fetchData = async ()=>{
    const res=await fetch("http://localhost:4000/bruker")
    const json=await res.json()
    setData(json.users)
  }
  useEffect(()=>{
    fetchData()
  }, []);
  //const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
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
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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