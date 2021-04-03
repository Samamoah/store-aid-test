import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

export default function Branch({ row, classes, labelId }) {
  const price = row.sellingPrice + row.discount;
  const amount = price * row.qty;
  return (
    <TableRow hover tabIndex={-1} key={row.name}>
      <TableCell id={labelId} scope="row">
        {moment(row.date).format('DD/MM/YYYY')}
      </TableCell>
      <TableCell>{row.product}</TableCell>
      <TableCell className={classes.center}>{row.costPrice}</TableCell>
      <TableCell className={classes.center}>{row.sellingPrice}</TableCell>
      <TableCell className={classes.center}>{row.discount}</TableCell>
      <TableCell className={classes.center}>{row.qty}</TableCell>
      <TableCell className={classes.center}>{amount}</TableCell>
    </TableRow>
  );
}
