export const createInvoice = async (invoiceData) => {
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoiceData)
    });
    return response.json();
  };
  
  export const fetchInvoices = async () => {
    const response = await fetch('/api/invoices');
    return response.json();
  };
  