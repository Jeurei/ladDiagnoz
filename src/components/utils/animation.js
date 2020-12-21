/* eslint-disable import/prefer-default-export */
import { keyframes } from '@emotion/react';

export const showing = keyframes`
0% {
  opacity:0;
  transform: translateY(-100px);
}
100% {
  opacity:1;
  transform: translateY(0);
}
`;
