import React from 'react';
import {
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
} from '@chakra-ui/react';
import logo from '../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import '../../styles/blob.scss';
import { useWindowWidth } from '../../hooks';

export default function Landing() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isSmall, isMobile } = useWindowWidth();
    const small = isSmall || isMobile;

    return (
        <Box w='100%' mx='auto' bgColor='secondary.300'>
            <Flex
                h='50pt'
                bgColor='white.300'
                alignItems='center'
                position='sticky'
                top='0'
                zIndex={100}
            >
                <Flex
                    h='100%'
                    alignItems='center'
                    w={small ? '95%' : '70%'}
                    mx='auto'
                    justifyContent='space-between'
                >
                    <Flex h='100%' alignItems='center'>
                        <Image src={logo} h={small ? '50%' : '70%'} />
                        <Text fontSize={small ? '2xl' : '3xl'} as='b' mx='2'>
                            {t('appName')}
                        </Text>
                    </Flex>
                    <Flex gap={5} mx={5}>
                        <Button
                            colorScheme='primary'
                            onClick={() => navigate(ROUTES.SIGN_IN)}
                            size={small ? 'sm' : 'md'}
                        >
                            {t('signIn')}
                        </Button>

                        {small ? (
                            <></>
                        ) : (
                            <Button
                                colorScheme='primary'
                                variant='outline'
                                onClick={() => navigate(ROUTES.SIGN_UP)}
                                _active={{ bgColor: 'white.300' }}
                            >
                                {t('signUp')}
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </Flex>
            <Box w='70%' mx='auto'>
                <Stack
                    align={'center'}
                    py={{ base: 10, md: 20 }}
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent='center'
                    textAlign='center'
                >
                    <Flex
                        className='shape'
                        alignItems='center'
                        h={small ? '20pc' : '30pc'}
                    >
                        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{
                                    base: '3xl',
                                    sm: '4xl',
                                    lg: '6xl',
                                }}
                            >
                                <Text as={'span'}>
                                    Manage your home tasks with
                                </Text>
                                <br />
                                <Text as='i' color={'primary.400'}>
                                    {t('appName')}
                                </Text>
                            </Heading>
                            <Text color={'gray.500'}>
                                Assign tasks efficiently and organise your
                                chores so work is spread equally amongst family
                                members.
                            </Text>
                            <Button
                                size={small ? 'md' : 'lg'}
                                fontWeight={'normal'}
                                px={6}
                                colorScheme={'primary'}
                                onClick={() => navigate(ROUTES.SIGN_UP)}
                                alignSelf='center'
                            >
                                Get started
                            </Button>
                        </Stack>
                    </Flex>
                </Stack>
            </Box>
        </Box>
    );
}
