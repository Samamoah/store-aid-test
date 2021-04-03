import React from 'react';
import CustomTable from '../../../components/CustomTable';
import Sale from './components/Sale';
import sales from '../sales.json';

export default function Index() {
  const data = sales.sales.map((sale) => {
    return {
      id: sale.id,
      date: new Date(sale.salesDate),
      customer: `${sale.customer.firstName}`,
      payment: sale.paymentType,
      branchId: sale.branchId,
    };
  });

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

  return (
    <CustomTable
      tableTitle="Sales"
      headCells={headCells}
      data={data}
      enablePagination={true}
      rowComponent={Sale}
    />
  );
}
