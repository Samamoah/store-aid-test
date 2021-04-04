import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomTable from '../../../components/CustomTable';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import Branch from './components/Branch';

export default function Index(props) {
  var [branches, setBranches] = useState([]);
  var [loading, setLoading] = useState(true);
  var [offset, setOffset] = useState(0);
  var [pageCount, setPageCount] = useState(0);
  var [totalCount, setTotalCount] = useState(0);
  var [search, setSearch] = useState('');
  var [limit] = useState(20);

  useEffect(() => {
    (async function () {
      var { data } = await axios.get(
        `client/react/branches?offset=${offset}&search=${search}`
      );
      const branchesres = data.branches.map((branch) => {
        return {
          id: branch.id,
          name: branch.name,
          location: branch.location,
          city: branch.city,
          country: branch.country,
          phone: branch.phone,
        };
      });
      setOffset(data.offset);
      setPageCount(data.count);
      setTotalCount(data.totalCount);
      setBranches(branchesres);
      setLoading(false);
    })();
  }, [offset, search]);

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name ',
    },
    {
      id: 'number',
      numeric: false,
      disablePadding: false,
      label: 'Phone Number',
    },
    {
      id: 'location',
      numeric: false,
      disablePadding: false,
      label: 'Location',
    },
    {
      id: 'city',
      numeric: false,
      disablePadding: false,
      label: 'City',
    },
    {
      id: 'country',
      numeric: false,
      disablePadding: false,
      label: 'Country',
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
      <Grid container justify="flex-end" style={{ marginBottom: 30 }}>
        <TextField
          label="Search..."
          variant="outlined"
          margin="dense"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Grid>
      <CustomTable
        tableTitle="Branches"
        headCells={headCells}
        pageCount={pageCount}
        totalCount={totalCount}
        offset={offset}
        limit={limit}
        setOffset={(value) => setOffset(value)}
        data={branches}
        enablePagination={true}
        rowComponent={Branch}
      />
    </>
  );
}
