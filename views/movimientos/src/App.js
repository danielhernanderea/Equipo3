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
// logo


class OperationsListView extends React.Component {
    state = {
        loggedUser: 'prueba@bbva.com',
        records: []
    }

    handleMovements = (user) => {
        getOperations(user, (response) => {
            this.setState({ records: response.movimiento })
        })
    }

  render() {
      let columnNames = ["Operación", "Tipo", "Fecha de Operación", "Costo", "Precio de compra", "Descripción"]
      // let records = getOperations(this.state.loggedUser)
     this.handleMovements(this.state.loggedUser) 
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
                <TableCell align="left">{r.tipooperacion}</TableCell>
                  <TableCell align="left">{r.idcripto}</TableCell>
                  <TableCell align="left">{r.fecha}</TableCell>
                  <TableCell align="left">{r.montogastado}</TableCell>
                  <TableCell align="left">{r.preciocompra}</TableCell>
                  <TableCell align="left">{r.descripcion}</TableCell>
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
