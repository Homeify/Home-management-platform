import React from 'react';
import {connect} from 'react-redux';
import {
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import {CiLogin} from 'react-icons/ci';
import {useNavigate} from 'react-router-dom';
import {signOut} from '../../state/actions/auth';
import ROUTES from '../../utils/routes';

const SignOut = ({signOut}) => {
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await signOut();
    setTimeout(navigate(ROUTES.LANDING), 100);
  };
  return (
    <Flex
      onClick={submitHandler}
      h="20"
      p="2"
      mt="2"
      role="group"
      flexDir="column"
      alignItems="center"
      fontSize="18"
      cursor="pointer"
      _hover={{
        bg: 'primary.300',
        color: 'white.300',
      }}>
      <Icon
        my="auto"
        fontSize="18"
        _groupHover={{
          color: 'white.300',
        }}
        as={CiLogin}
      />
      <Text fontSize="sm">
        Sign Out
      </Text>
    </Flex>
  );
};


const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
