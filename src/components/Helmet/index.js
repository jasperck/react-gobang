import React from 'react';
import ReactHelmet from 'react-helmet';
import { TITLE, DESCRIPTION } from './constants';

const Helmet = ({
  title = TITLE,
  meta = [
    { name: 'description', content: DESCRIPTION },
  ],
  ...props
}) => {
  return (
    <ReactHelmet
      {...props}
      title={title}
      meta={meta}
    />
  );
};

export default Helmet;
