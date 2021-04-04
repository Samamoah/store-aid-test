import React, { useState, useEffect } from 'react';
import CustomTable from '../../../components/CustomTable';
import Entry from './components/Entry';
import { CircularProgress, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import axios from 'axios';

export default function Index(props) {
  var [loading, setLoading] = useState(true);
  var [offset, setOffset] = useState(0);
  var [pageCount, setPageCount] = useState(0);
  var [totalCount, setTotalCount] = useState(0);
  var [amount, setAmount] = useState(0);
  var [entries, setEntries] = useState([]);
  var [limit] = useState(20);

  var { sale_id, branch_id } = props.match.params;
  useEffect(() => {
    (async function () {
      var { data } = await axios.get(
        `client/react/branches/${branch_id}/sales/${sale_id}/sale_entries/?offset=${offset}&limit=${limit}`
      );
      const entriesres = data.sale_entries.map((entry) => {
        return {
          id: entry.id,
          date: new Date(entry.entryDate),
          product: entry.product.name,
          costPrice: entry.costPrice,
          sellingPrice: entry.sellingPrice,
          qty: entry.quantity,
          discount: entry.discount,
        };
      });
      var totalAmount = data.sale_entries
        .map((entry) => {
          return {
            price: entry.sellingPrice + entry.discount,
            qty: entry.quantity,
          };
        })
        .map((data) => data.price * data.qty)
        .reduce((a, b) => a + b);
      setAmount(totalAmount);
      setOffset(data.offset);
      setPageCount(data.count);
      setTotalCount(data.totalCount);
      setEntries(entriesres);
      setLoading(false);
    })();
  }, [offset, branch_id, sale_id, limit]);

  const headCells = [
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Entry Date ',
    },
    {
      id: 'product',
      numeric: false,
      disablePadding: false,
      label: 'Product Name',
    },
    {
      id: 'costPrice',
      numeric: false,
      disablePadding: false,
      label: 'Cost price',
    },
    {
      id: 'sellingPrice',
      numeric: false,
      disablePadding: false,
      label: 'Selling Price',
    },
    {
      id: 'discount',
      numeric: false,
      disablePadding: false,
      label: 'Discount',
    },

    {
      id: 'qty',
      numeric: false,
      disablePadding: false,
      label: 'Quantity',
    },
    {
      id: 'amount',
      numeric: false,
      disablePadding: false,
      label: 'Amount',
    },
  ];

  if (loading)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <>
      <Helmet>
        <title>Sale( #{sale_id.substring(0, 5)} )</title>
      </Helmet>
      <h2 style={{ textAlign: 'right', marginBottom: 20 }}>
        Total Amount : {amount}
      </h2>
      <CustomTable
        tableTitle={`Sale( #${sale_id.substring(0, 5)} ) entries`}
        headCells={headCells}
        data={entries}
        pageCount={pageCount}
        totalCount={totalCount}
        offset={offset}
        limit={limit}
        setOffset={(value) => setOffset(value)}
        rowComponent={Entry}
      />
    </>
  );
}
