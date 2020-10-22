import React from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import {getOperations} from "./client.js";
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// logo

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

let user = 'prueba'


class OperationsListView extends React.Component {
    state = {
        loggedUser: user + '@bbva.com',
        records: []
    }
    

    handleMovements = (user) => {
        getOperations(user, (response) => {
            this.setState({ records: response.movimiento })
        })
    }

  componentDidMount() {
      let localhost = 'http://127.0.0.1:3000'
      fetch(localhost + '/Movimientos/' + this.state.loggedUser)
          .then(response => response.json())
          .then(data => this.setState({ records: data.movimiento }))
  }

  render() {
      let columnNames = ["Operación", "Tipo", "Fecha de Operación", "Costo", "Precio de compra", "Descripción"]
    console.log(this.state.records)
    return (
      <TableContainer component={Paper}>
      <Table size="small" width={1}>
        <TableHead>
          <TableRow>
            {columnNames.map((c, idx) => (
              <TableCell key={idx} align="left">{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
          {this.state.records.map((r, idx) => (
              <TableRow key={idx}>
                <StyledTableCell align="left">{r.tipooperacion}</StyledTableCell>
                  <StyledTableCell align="left">{r.idcripto}</StyledTableCell>
                  <StyledTableCell align="left">{r.fecha}</StyledTableCell>
                  <StyledTableCell align="left">{r.montogastado}</StyledTableCell>
                  <StyledTableCell align="left">{r.preciocompra}</StyledTableCell>
                  <StyledTableCell align="left">{r.descripcion}</StyledTableCell>
              </TableRow>
          ))}
        <TableBody>
        </TableBody>
      </Table>
    </TableContainer>
    );  
  }
}

export default OperationsListView;
