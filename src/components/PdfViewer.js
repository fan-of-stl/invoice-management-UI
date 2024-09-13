import React, { Component } from 'react';
import PDFViewer from 'pdf-viewer-reactjs';
import './PdfViewer.css';

class PdfViewer extends Component {
  render() {
    return (
      <div className="pdf-viewer">
        <PDFViewer
          document={{
            url: '/30-days.pdf', // Path to PDF in the public folder
          }}
          scale={1.2} // Optional: Adjust the scale as needed
          hideRotation={true} // Hide rotation controls
          hideZoom={false} // Show zoom controls
          hidePagination={false} // Show pagination controls
        />
      </div>
    );
  }
}

export default PdfViewer;
