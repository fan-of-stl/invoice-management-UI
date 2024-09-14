import React, { Component } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

class ActionAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successAlertVisible: true,  // Initially visible
    };
  }

  // Method to handle the closing of the alert
  handleClose = () => {
    this.setState({ successAlertVisible: false });
  };

  render() {
    const { successMessage } = this.props;
    const { successAlertVisible } = this.state;

    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        {/* Success Alert */}
        {successAlertVisible && (
          <Alert
            severity="success"
            onClose={this.handleClose}
          >
            {successMessage || 'Successful action'}
          </Alert>
        )}
      </Stack>
    );
  }
}

export default ActionAlerts;
