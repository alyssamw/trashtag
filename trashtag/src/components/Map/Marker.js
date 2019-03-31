import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const img = require('../../icon.png');
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  transform: translate(-50%, -50%);
  user-select: none;
  
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = props => (
  <Wrapper
    alt={props.text}
    {...props.onClick ? { onClick: props.onClick } : {}}
  ><img src={img} style={{height:"100%", width:"100%", objectFit:"contain"}}></img>
  </Wrapper>
 
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;