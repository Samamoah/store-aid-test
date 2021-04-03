import React from 'react';
import CustomTable from '../../../components/CustomTable';
import Entry from './components/Entry';
import entries from '../entries.json';

export default function Index() {
  const totalAmount = entries.sale_entries
    .map((entry) => {
      return {
        price: entry.sellingPrice + entry.discount,
        qty: entry.quantity,
      };
    })
    .map((data) => data.price * data.qty)
    .reduce((a, b) => a + b);

  const data = entries.sale_entries.map((entry) => {
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

  return (
    <>
      <h2 style={{ textAlign: 'right', marginBottom: 20 }}>
        Total Amount : {totalAmount}
      </h2>
      <CustomTable
        tableTitle="Sale entries"
        headCells={headCells}
        data={data}
        enablePagination={false}
        rowComponent={Entry}
      />
    </>
  );
}
