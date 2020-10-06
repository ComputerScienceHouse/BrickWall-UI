import React from 'react';
import InfoSpinner from '../../components/InfoSpinner';

export const Authenticating: React.FunctionComponent = () => {
  return <InfoSpinner isCentered>Redirecting to CSH SSO</InfoSpinner>;
};

export default Authenticating;
