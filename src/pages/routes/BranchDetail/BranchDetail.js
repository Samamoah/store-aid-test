import React, { useState, useEffect } from 'react';
import CustomTable from '../../../components/CustomTable';
import axios from 'axios';
import Sale from './components/Sale';
import { CircularProgress, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';

export default function Index(props) {
  var [loading, setLoading] = useState(true);
  var [offset, setOffset] = useState(0);
  var [pageCount, setPageCount] = useState(0);
  var [totalCount, setTotalCount] = useState(0);
  var [sales, setSales] = useState([]);
  var [limit] = useState(5);

  var { id } = props.match.params;
  var { branch } = props.location.state;
  useEffect(() => {
    (async function () {
      var { data } = await axios.get(
        `client/react/branches/${id}/sales/?offset=${offset}&limit=${limit}`
      );
      const salesres = data.sales.map((sale) => {
        return {
          id: sale.id,
          date: new Date(sale.salesDate),
          customer: `${sale.customer.firstName}`,
          payment: sale.paymentType,
          branchId: sale.branchId,
        };
      });
      setOffset(data.offset);
      setPageCount(data.count);
      setTotalCount(data.totalCount);
      setSales(salesres);
      setLoading(false);
    })();
  }, [offset, id, limit]);

  const headCells = [
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Sale Date ',
    },
    {
      id: 'customer',
      numeric: false,
      disablePadding: false,
      label: 'Customer Name',
    },
    {
      id: 'payment',
      numeric: false,
      disablePadding: false,
      label: 'Payment Type',
    },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
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
        <title>{branch}</title>
      </Helmet>
      <CustomTable
        tableTitle={`${branch} sales`}
        headCells={headCells}
        data={sales}
        pageCount={pageCount}
        totalCount={totalCount}
        offset={offset}
        limit={limit}
        setOffset={(value) => setOffset(value)}
        enablePagination={true}
        rowComponent={Sale}
      />
    </>
  );
}
