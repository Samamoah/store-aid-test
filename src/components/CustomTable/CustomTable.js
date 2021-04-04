import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import RowComponent from './Row';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function EnhancedTableHead(props) {
  const { headCells } = props;
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { tableTitle } = props;

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableTitle}
      </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tBody: {
    '& tr:last-child': {
      '& td': { borderBottom: 0 },
    },
  },
  center: {
    textAlign: 'center',
  },
  button: {
    fontWeight: 'normal',
    fontSize: 12,
    backgroundColor: '#22B8CF',
    borderRadius: 2,
    color: 'white !important',
    textTransform: 'uppercase',
    padding: '6px 15px',
    marginRight: '5px',
    '&:hover': {
      backgroundColor: '#22B8CF',
    },
  },
}));

export default function Index({ offset, setOffset, ...props }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.limit);

  const handleChangePage = (event, newPage) => {
    setOffset(newPage * props.limit);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar tableTitle={props.tableTitle} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} headCells={props.headCells} />
            <TableBody>
              {props.data.length > 0 ? (
                props.data.map((row, index) => {
                  return (
                    <RowComponent
                      key={index}
                      row={row}
                      classes={classes}
                      rowComponent={props.rowComponent}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    scope="row"
                    colSpan="100"
                  >{`No ${props.tableTitle}`}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[props.limit]}
          component="div"
          count={props.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
