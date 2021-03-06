import React from 'react';
import PropTypes from 'prop-types';
import Article from './article';
import { randomId } from '../../utils/common';

const ArticlesBottom = ({ data }) => {
  const MAX_QUANTITY = 8;
  return (
    <div className="articles__bottom">
      {data.slice(0, MAX_QUANTITY).map((el) => (
        <Article data={el} key={randomId()} />
      ))}
    </div>
  );
};

ArticlesBottom.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArticlesBottom;
