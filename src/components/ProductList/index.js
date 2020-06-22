import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import api from '../../services/api'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(2),
  },
}));

export default function ProductList(props) {

  const [productList, setProductList] = useState([])

  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {

    async function loadData() {
    await api.get('products/').then(res => {
      console.log(res.data.content)
      setProductList( res.data.content )
    }).catch(err => {
      console.log('erro: ' + err)
    })
  }
  loadData();
  }, []);

  const classes = useStyles();
  
  return (
    <>
      <TableContainer component={Paper}>
        {console.log(productList)}
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="right">Estoque</TableCell>
              <TableCell align="right">Venda(R$)</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell align="right">{row.sale}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {productList.length === 0 ? <LinearProgress /> : ''}
      <Link to="/products/create"> 
        <Fab color="primary" className={classes.fab} aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
}
