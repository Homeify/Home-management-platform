import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Image,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import {useState} from 'react';
import ROUTES from '../../utils/routes.js';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useNavigate} from 'react-router-dom';
// import {ReactComponent as UserCircle} from '../../assets/icons/user-circle.svg';
import {signUp as signUpAction} from '../../state/actions/auth.js';
import {signIn as signInAction} from '../../state/actions/auth.js';
import {connect} from 'react-redux';

function Signup({signUp, signIn}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckedPassword, setShowCheckedPassword] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    checkedPassword: '',
    username: ''
  });

  const passwordMatch = newUser.password === newUser.checkedPassword;
  const submitHandler = async (e) => {
    e.preventDefault();
    const {checkedPassword, ..._user} = newUser;
    await signUp(_user);
    await signIn({username: _user.username, password: _user.password});
    setTimeout(navigate(ROUTES.HOME), 0);
  };

  return (
    <Flex
      minH={'100vh'}
      direction="row"
      justifyContent="flex-end"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box
        w='50w'>
        <Image objectFit='cover' h='100%' src='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80' alt='Dan Abramov' />
      </Box>
      <Flex
        w='50vw'
        px="28"
        justifyContent='center'
        direction='column'
        gap="12"
        bg={useColorModeValue('white', 'gray.700')}>
        <Stack>
          <Heading fontSize={'xl'}>
            Getting Started
          </Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            Create an account to enjoy all of our cool features
          </Text>
        </Stack>
        <Box
          w='450px'
        >
          <Stack gap="4">
            <HStack gap="4">
              <Box flexGrow="1">
                <FormControl id="first_name" isRequired>
                  <FormLabel fontSize={'md'} color="gray.600">First Name</FormLabel>
                  <Input
                    size="md"
                    borderRadius="xl"
                    type="text"
                    value={newUser.first_name}
                    onChange={(e) =>
                      setNewUser({...newUser, first_name: e.target.value})
                    }
                  />
                </FormControl>
              </Box>
              <Box flexGrow="1">
                <FormControl id="last_name">
                  {/* <InputGroup> */}
                  <FormLabel fontSize={'md'} color="gray.600">Last Name</FormLabel>
                  {/* <InputLeftElement
                      pointerEvents='none'
                    >
                      <UserCircle color='gray.100' />
                    </InputLeftElement> */}

                  <Input
                    // placeholder='Last Name'
                    size="md"
                    borderRadius="xl"
                    type="text"
                    value={newUser.last_name}
                    onChange={(e) =>
                      setNewUser({...newUser, last_name: e.target.value})
                    }
                  />
                  {/* </InputGroup> */}
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Username</FormLabel>
              <Input
                size="md"
                borderRadius="xl"
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({...newUser, username: e.target.value})
                }
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Email address</FormLabel>
              <Input
                size="md"
                borderRadius="xl"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({...newUser, email: e.target.value})
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Password</FormLabel>
              <InputGroup>
                <Input
                  size="md"
                  borderRadius="xl"
                  type={showPassword ? 'text' : 'password'}
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({...newUser, password: e.target.value})
                  }
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="checkedPassword" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  size="md"
                  borderRadius="xl"
                  type={showCheckedPassword ? 'text' : 'password'}
                  value={newUser.checkedPassword}
                  onChange={(e) =>
                    setNewUser({...newUser, checkedPassword: e.target.value})
                  }
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowCheckedPassword((showCheckedPassword) => !showCheckedPassword)
                    }
                  >
                    {showCheckedPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing="2">
              <Text fontSize={'md'} mb="2" color={'gray.400'}>
              By joining, I agree to terms and conditions
              </Text>
              <Button
                loadingText="Submitting"
                size="lg"
                borderRadius="xl"
                bg={'primary.300'}
                color={'white'}
                _hover={{
                  bg: 'primary.500',
                }}
                onClick={submitHandler}
                isDisabled={!passwordMatch}
              >
                Sign up
              </Button>
            </Stack>
            <Stack>
              <Text fontSize={'md'} m="0" color={'gray.600'}>
                {/* Already have an account? <Link color={'primary.300'} href={ROUTES.SIGN_IN}>Sign In</Link> */}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    signUp: (user) => dispatch(signUpAction(user)),
    signIn: (user) => dispatch(signInAction(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
