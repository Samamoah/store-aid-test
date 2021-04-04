import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

export default function Branch({ row, classes }) {
  return (
    <TableRow tabIndex={-1}>
      <TableCell scope="row">{moment(row.date).format('DD/MM/YYYY')}</TableCell>
      <TableCell>{row.customer}</TableCell>
      <TableCell>{row.payment}</TableCell>
      <TableCell>
        <Button
          classes={{
            root: classes.button,
          }}
          component={RouterLink}
          to={{
            pathname: `/sale/${row.branchId}/${row.id}`,
            state: {},
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
