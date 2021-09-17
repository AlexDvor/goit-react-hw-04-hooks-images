import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(4 4 4 / 59%);
  z-index: 10;

  opacity: 1;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1),
    visibility 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ContentModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 1200px;
  max-height: 100vh;
  width: 100%;
  /* padding: 40px; */
  background-color: #ffffff;
  /* overflow-y: auto; */

  transform: translate(-50%, -50%) scale(1);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;
