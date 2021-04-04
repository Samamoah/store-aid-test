import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function Branch({ row, classes }) {
  return (
    <TableRow tabIndex={-1}>
      <TableCell scope="row">{row.name}</TableCell>
      <TableCell>{row.phone ? row.phone : 'N/A'}</TableCell>
      <TableCell>{row.location ? row.location : 'N/A'}</TableCell>
      <TableCell>{row.city ? row.city : 'N/A'}</TableCell>
      <TableCell>{row.country ? row.country : 'N/A'}</TableCell>
      <TableCell>
        <Button
          classes={{
            root: classes.button,
          }}
          component={RouterLink}
          to={{
            pathname: `/branch/${row.id}`,
            state: { branch: row.name },
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
