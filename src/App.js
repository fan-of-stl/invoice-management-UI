import React, { Component } from "react";
import PdfViewer from './components/PdfViewer';
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [], // State to store list of invoices
    };
  }

  // Lifecycle method for fetching data from backend API
  componentDidMount() {
    this.fetchInvoices();
  }

  // Function to fetch invoices from backend
  fetchInvoices = async () => {
    try {
      const response = await fetch("http://localhost:4200/api/invoices");
      const data = await response.json();
      this.setState({ invoices: data });
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  render() {
    // const pdfUrl = '/path/to/your/sample.pdf'; // Replace with the actual path to the PDF file

    return (
      <div className="app">
        <div className="left-pane">
          <PdfViewer />
        </div>
        <div className="right-pane">
          {/* Other components like InvoiceForm or InvoiceList can go here */}
          <h1>Invoice Management System</h1>
          <InvoiceForm refreshInvoices={this.fetchInvoices} />
          <InvoiceList invoices={this.state.invoices} />
        </div>
      </div>
    );
  }
}

export default App;
