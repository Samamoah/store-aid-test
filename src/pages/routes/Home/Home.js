import React from 'react';
import CustomTable from '../../../components/CustomTable';
import Branch from './components/Branch';
import branches from '../branches.json';

export default function Index() {
  const data = branches.branches.map((branch) => {
    return {
      id: branch.id,
      name: branch.name,
      location: branch.location,
      phone: branch.phone,
    };
  });

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
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];

  return (
    <CustomTable
      tableTitle="Branches"
      headCells={headCells}
      data={data}
      enablePagination={false}
      rowComponent={Branch}
    />
  );
}
