import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

class LineItemList extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    expandedRowIndex: null,
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleRefresh = () => {
    // Add your refresh logic here
    console.log("Refresh clicked!");
  };

  handleExpand = (index) => {
    this.setState((prevState) => ({
      expandedRowIndex: prevState.expandedRowIndex === index ? null : index,
    }));
  };

  render() {
    const { lineItems } = this.props;
    const { page, rowsPerPage, expandedRowIndex } = this.state;
    const paginatedItems = lineItems.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return (
      <Paper>
        <div style={{ display: "flex", justifyContent: "flex-start", padding: "10px" }}>
          
          <IconButton onClick={this.handleRefresh}>
            <OpenInFullIcon />
          </IconButton>

          <IconButton onClick={this.handleRefresh}>
            <RefreshIcon />
          </IconButton>

        </div>
        <TableContainer>
          <Table aria-label="Line Item Details">
            <TableHead>
              <TableRow>
                <TableCell><strong>Debit</strong></TableCell>
                <TableCell><strong>GL Description</strong></TableCell>
                <TableCell><strong>GL Code</strong></TableCell>
                <TableCell><strong>Text</strong></TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{item.debit}</TableCell>
                    <TableCell>{item.glDesc}</TableCell>
                    <TableCell>{item.glCode}</TableCell>
                    <TableCell>{item.text}</TableCell>
                    
                  </TableRow>
                  {expandedRowIndex === index && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Accordion expanded={true}>
                          <AccordionSummary>
                            Additional Details for GL Code {item.glCode}
                          </AccordionSummary>
                          <AccordionDetails>
                            {/* Add any additional details or form fields here */}
                            More details about this item can be shown here.
                          </AccordionDetails>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={lineItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default LineItemList;
