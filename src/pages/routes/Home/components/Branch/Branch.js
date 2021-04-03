import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function Branch({
  row,
  isItemSelected,
  labelId,
  handleClick,
  classes,
}) {
  return (
    <TableRow hover tabIndex={-1} key={row.name}>
      <TableCell id={labelId} scope="row">
        {row.name}
      </TableCell>
      <TableCell>{row.phone}</TableCell>
      <TableCell>{row.location}</TableCell>
      <TableCell>
        <Button
          classes={{
            root: classes.button,
          }}
          color="primary"
          component={RouterLink}
          to={{
            pathname: `/branch/${row.id}`,
            state: {},
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
