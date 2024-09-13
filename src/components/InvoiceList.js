import React, { Component } from 'react';

class InvoiceList extends Component {
  render() {
    const { invoices } = this.props;

    return (
      <div>
        <h2>Invoice List</h2>
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice._id}>
              {invoice.currency} - {invoice.basicAmount} - {invoice.totalAmount}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default InvoiceList;
