import React, { Component } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import LineItemList from "./LineItemList";
import { Typography } from "@mui/material";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "./InvoiceForm.css";
import ActionAlerts from "./ActionAlerts";

const lineItemsData = [
  {
    debit: "Debit 1",
    glDesc: "GL Description 1",
    glCode: "001",
    text: "Some text 1",
  },
  {
    debit: "Debit 2",
    glDesc: "GL Description 2",
    glCode: "002",
    text: "Some text 2",
  },
  {
    debit: "Debit 3",
    glDesc: "GL Description 3",
    glCode: "003",
    text: "Some text 3",
  },
  {
    debit: "Debit 4",
    glDesc: "GL Description 4",
    glCode: "004",
    text: "Some text 4",
  },
  {
    debit: "Debit 5",
    glDesc: "GL Description 5",
    glCode: "005",
    text: "Some text 5",
  },
  {
    debit: "Debit 6",
    glDesc: "GL Description 6",
    glCode: "005",
    text: "Some text 6",
  },
  {
    debit: "Debit 7",
    glDesc: "GL Description 7",
    glCode: "007",
    text: "Some text 7",
  },
  {
    debit: "Debit 8",
    glDesc: "GL Description 8",
    glCode: "008",
    text: "Some text 8",
  },
  {
    debit: "Debit 9",
    glDesc: "GL Description 9",
    glCode: "009",
    text: "Some text 9",
  },
  // Add more line items as needed
];
class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "",
      basicAmount: "",
      taxAmount: "",
      totalAmount: "",
      advancePaid: "",
      tcsAmount: "",
      netPayable: "",
      payeeDetails: {
        alternatePayee1: "",
        alternatePayee2: "",
        city: "",
        country: "",
        bankDetails: {
          ifscCode: "",
          accountNo: "",
        },
        reference: "",
      },
      selectedDatabase: "mongo",
      database: [
        { type: "mongo", url: "http://localhost:4200/api/invoices" },
        {
          type: "postgres",
          url: "http://localhost:4200/postgres/api/invoices",
        },
      ],
      alert: false,
    };
  }

  // Handle input change for form fields, including nested state updates
  handleChange = (e) => {
    const { name, value } = e.target;

    // Handle payeeDetails separately since it's a nested structure
    if (name.includes("payeeDetails.")) {
      const keyPath = name.split(".");
      if (keyPath[1] === "bankDetails") {
        // Handle nested 'bankDetails'
        this.setState((prevState) => ({
          payeeDetails: {
            ...prevState.payeeDetails,
            bankDetails: {
              ...prevState.payeeDetails.bankDetails,
              [keyPath[2]]: value,
            },
          },
        }));
      } else {
        // Handle other payeeDetails fields
        this.setState((prevState) => ({
          payeeDetails: {
            ...prevState.payeeDetails,
            [keyPath[1]]: value,
          },
        }));
      }
    } else {
      // Handle non-nested fields
      this.setState({ [name]: value });
    }
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();

    const { selectedDatabase, database } = this.state;

    console.log(this.state);
    const selectedDbUrl = database.find(
      (db) => db.type === selectedDatabase
    )?.url;

    const newInvoice = {
      currency: this.state.currency,
      basicAmount: this.state.basicAmount,
      taxAmount: this.state.taxAmount,
      totalAmount: this.state.totalAmount,
      advancePaid: this.state.advancePaid,
      tcsAmount: this.state.tcsAmount,
      netPayable: this.state.netPayable,
      payeeDetails: {
        alternatePayee1: this.state.payeeDetails.alternatePayee1,
        alternatePayee2: this.state.payeeDetails.alternatePayee2,
        city: this.state.payeeDetails.city,
        country: this.state.payeeDetails.country,
        bankDetails: {
          ifscCode: this.state.payeeDetails.bankDetails.ifscCode,
          accountNo: this.state.payeeDetails.bankDetails.accountNo,
        },
        reference: this.state.payeeDetails.reference,
      },
    };

    try {
      const response = await fetch(selectedDbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      });

      const data = await response.json();
      this.props.refreshInvoices(); // Refresh the invoice list
      this.setState({alert:  true});


      console.log("Invoice created:", data);

      setTimeout(() => {    
        this.setState({
          currency: "",
          basicAmount: "",
          taxAmount: "",
          totalAmount: "",
          advancePaid: "",
          tcsAmount: "",
          netPayable: "",
          payeeDetails: {
            alternatePayee1: "",
            alternatePayee2: "",
            city: "",
            country: "",
            bankDetails: {
              ifscCode: "",
              accountNo: "",
            },
            reference: "",
          },
          selectedDatabase: "mongo",
          database: [
            { type: "mongo", url: "http://localhost:4200/api/invoices" },
            {
              type: "postgres",
              url: "http://localhost:4200/postgres/api/invoices",
            },
          ],
          alert: false,
        })
      }, 4000);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  // Handle radio button change to select the database
  handleDatabaseChange = (e) => {
    this.setState({ selectedDatabase: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="invoice-form">
        <h2>Create Invoice</h2>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownCircleOutlined />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={600}>Invoice Amount Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="invoice-amount-details accordion accordion-1">
              <div>
                <label>
                  Currency<span className="marker">*</span>:{" "}
                </label>
                <input
                  type="text"
                  name="currency"
                  value={this.state.currency}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>
                  Basic Amount <span className="marker">*</span>:{" "}
                </label>
                <input
                  type="number"
                  name="basicAmount"
                  value={this.state.basicAmount}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>
                  Tax Amount<span className="marker">*</span>:{" "}
                </label>
                <input
                  type="number"
                  name="taxAmount"
                  value={this.state.taxAmount}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>
                  Total Amount<span className="marker">*</span>:{" "}
                </label>
                <input
                  type="number"
                  name="totalAmount"
                  value={this.state.totalAmount}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>
                  Advance Paid<span className="marker">*</span>:{" "}
                </label>
                <input
                  type="number"
                  name="advancePaid"
                  value={this.state.advancePaid}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>
                  TCS Amount<span className="marker">*</span>:{" "}
                </label>
                <input
                  type="number"
                  name="tcsAmount"
                  value={this.state.tcsAmount}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>
                  Net Payable<span className="marker">*</span>:{" "}
                </label>
                <input
                  type="number"
                  name="netPayable"
                  value={this.state.netPayable}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownCircleOutlined />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography fontWeight={600}>Alternate Payee Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="alternate-payee-details accordion accordion-2">
              <div>
                <label>Alternate Payee 1: </label>
                <input
                  type="text"
                  name="payeeDetails.alternatePayee1"
                  value={this.state.payeeDetails.alternatePayee1}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Alternate Payee 2: </label>
                <input
                  type="text"
                  name="payeeDetails.alternatePayee2"
                  value={this.state.payeeDetails.alternatePayee2}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>City: </label>
                <input
                  type="text"
                  name="payeeDetails.city"
                  value={this.state.payeeDetails.city}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Country: </label>
                <input
                  type="text"
                  name="payeeDetails.country"
                  value={this.state.payeeDetails.country}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Bank Key / IFSC Code: </label>
                <input
                  type="text"
                  name="payeeDetails.bankDetails.ifscCode"
                  value={this.state.payeeDetails.bankDetails.ifscCode}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label> Bank Account No: </label>
                <input
                  type="number"
                  name="payeeDetails.bankDetails.accountNo"
                  value={this.state.payeeDetails.bankDetails.accountNo}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label> Reference: </label>
                <input
                  type="text"
                  name="payeeDetails.reference"
                  value={this.state.payeeDetails.reference}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownCircleOutlined />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography fontWeight={600}>Line Item Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LineItemList lineItems={lineItemsData} />
          </AccordionDetails>
        </Accordion>

        <div className="button-container">
          <div className="db-container">
            <label>
              DB?<span className="marker">*</span>:{" "}
            </label>
            <div>
              <input
                type="radio"
                name="selectedDatabase"
                value="mongo"
                checked={this.state.selectedDatabase === "mongo"}
                onChange={this.handleDatabaseChange}
              />
              MongoDB
              <input
                type="radio"
                name="selectedDatabase"
                value="postgres"
                checked={this.state.selectedDatabase === "postgres"}
                onChange={this.handleDatabaseChange}
              />
              PostgreSQL
            </div>
          </div>

          <Button type="button" variant="contained">
            Calculate
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </div>
        {this.state.alert && <ActionAlerts  successMessage="Added data successfully" />}
      </form>
    );
  }
}

export default InvoiceForm;
