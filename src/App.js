import React, { useState } from "react";
import Papa from "papaparse";
import DataTable from 'react-data-table-component';


const NZXData = () => {

  const [data, setData] = useState([])

  React.useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRrsdyK9F6pTjV8PXx4yiUX1PSiNj7xFhwWAkPgb8vjxYPDFKKZB5ZxU32kBb8c7SMVNOEtMW4n3Dq5/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data)
        },
      }
    )
  }, [])

  // const stocks = Array.from(data);
  // return (
  //   <ul>
  //     {stocks.map((data) => (
  //       <li key={data.nzx_ticker}>
  //         NZX Ticker: {data.nzx_ticker} - Current Share Price: ${data.price}
  //       </li>
  //     ))}
  //   </ul>
  // );

  const columns = [
    {
      name: 'NZX Ticker',
      selector: row => row.nzx_ticker,
      sortable: true,
      width: '20',
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Share Price',
      selector: row => parseFloat(row.price),
      format: row => parseFloat(row.price).toLocaleString('en-NZ', {
        style: 'currency',
        currency: 'NZD',
      }),
      sortable: true,
      right: true, 
    },
    {
      name: '52-week high',
      selector: row => parseFloat(row.high52),
      format: row => parseFloat(row.high52).toLocaleString('en-NZ', {
        style: 'currency',
        currency: 'NZD',
      }),
      sortable: true,
      right: true, 
    },
    {
      name: '52-week low',
      selector: row => parseFloat(row.low52),
      format: row => parseFloat(row.low52).toLocaleString('en-NZ', {
        style: 'currency',
        currency: 'NZD',
      }),
      sortable: true,
      right: true, 
    },
    {
      name: 'Market Capitalisation',
      selector: row => parseInt(row.marketcap,10),
      format: row => parseInt(row.marketcap,10).toLocaleString('en-NZ', {
        style: 'currency',
        currency: 'NZD',
      }),
      sortable: true,
      right: true, 
    },
  ]

  return (
    <DataTable
      title="NZX Companies with > $1b market capitalisation"
      columns={columns}
      data={data}
      keyField="nzx_ticker"
    />
  )

}

export default NZXData