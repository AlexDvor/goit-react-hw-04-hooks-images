import Loader from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

function Spinner() {
  return (
    <Wrapper>
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </Wrapper>
  );
}

export default Spinner;
