import React from 'react';
import {
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useWindowWidth } from '../../hooks';
import { ANIMATION_DATA } from '../atoms/Animations';
import { Animation } from '../atoms/Animations';
import '../../styles/blob.scss';
import ROUTES from '../../utils/routes';
import logo from '../../assets/logo.png';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import {
    GroupsIcon,
    ArrowRightIcon,
    DiamondIcon,
    LanguageIcon,
    TaskIcon,
    HeartbeatIcon,
    CalendarTimeIcon,
    PriorityIcon,
    CommentsIcon,
} from '../../assets/icons';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

export default function Landing() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { isSmall, isMobile } = useWindowWidth();
    const small = isSmall || isMobile;

    const GettingStartedButton = (
        <Button
            size={small ? 'md' : 'lg'}
            as='b'
            px={6}
            colorScheme={'primary'}
            onClick={() => navigate(ROUTES.SIGN_UP)}
            alignSelf='center'
            rightIcon={<ArrowRightIcon />}
        >
            {t('getStarted')}
        </Button>
    );

    const presentationItems = [
        {
            title: t('presItemTitle1'),
            descr: t('presItemDesc1'),
            animationData: ANIMATION_DATA.TASK_LIST,
        },
        {
            title: t('presItemTitle2'),
            descr: t('presItemDesc2'),
            animationData: ANIMATION_DATA.TASK_DEADLINE,
        },
        {
            title: t('presItemTitle3'),
            descr: t('presItemDesc3'),
            animationData: ANIMATION_DATA.GROUP,
        },
        {
            title: t('presItemTitle4'),
            descr: t('presItemDesc4'),
            animationData: ANIMATION_DATA.INVITE_FRIENDS,
        },
    ];

    const mainFeatures = [
        {
            title: t('taskManagement'),
            icon: TaskIcon,
        },
        {
            title: t('motivatingRewards'),
            icon: DiamondIcon,
        },
        {
            title: t('progressTracking'),
            icon: HeartbeatIcon,
        },
        {
            title: t('groups'),
            icon: GroupsIcon,
        },
    ];

    const sideFeatures = [
        {
            title: t('setDueDate'),
            desc: t('setDueDateDesc'),
            icon: CalendarTimeIcon,
        },
        {
            title: t('discussTasks'),
            desc: t('discussTaskDesc'),
            icon: CommentsIcon,
        },
        {
            title: t('prioritize'),
            desc: t('prioritizeDesc'),
            icon: PriorityIcon,
        },
    ];

    const changeLang = (lang) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, lang);
        i18n.changeLanguage(lang);
    };

    const getLang = () => {
        const savedLang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);
        let lang = '';
        if (savedLang === 'en') lang = 'English';
        else if (savedLang === 'ro') lang = 'Romana';
        return lang;
    };

    return (
        <Box w='100%' bgColor='white.300' minH='100vh' h='100%' m='0'>
            {/* Header */}
            <Flex
                h='50pt'
                bgColor='white.300'
                alignItems='center'
                position='sticky'
                top='0'
                zIndex={100}
                w='100%'
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

            <Flex flexDir='column'>
                <Box h='100%' flexGrow='1'>
                    <Box mx='auto' w='70%'>
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
                                            {t('landingPageTitle')}
                                        </Text>
                                        <br />
                                        <Text as='i' color={'primary.400'}>
                                            {t('appName')}
                                        </Text>
                                    </Heading>
                                    <Text color={'gray.500'}>
                                        {t('landingPageDesc')}
                                    </Text>
                                    {GettingStartedButton}
                                </Stack>
                            </Flex>
                        </Stack>
                    </Box>

                    <Flex
                        gap={small ? 5 : 20}
                        mx='auto'
                        w='70%'
                        justifyContent='center'
                        flexWrap='wrap'
                        mb='20'
                    >
                        {mainFeatures.map((item, i) => {
                            return (
                                <Flex
                                    key={i}
                                    flexDir='column'
                                    alignItems='center'
                                    textAlign='center'
                                    w='50pt'
                                    px='20'
                                    py='10'
                                    bgColor='secondary.300'
                                    borderRadius='20'
                                    gap='3'
                                >
                                    <Flex flexGrow='1' alignItems='center'>
                                        <Zoom>
                                            <Text as='b' color='primary.900'>
                                                {item.title}
                                            </Text>
                                        </Zoom>
                                    </Flex>
                                    <Zoom>
                                        <Box color='primary.500'>
                                            {<item.icon />}
                                        </Box>
                                    </Zoom>
                                </Flex>
                            );
                        })}
                    </Flex>

                    <Flex
                        flexDir='column'
                        w='100%'
                        bgColor='secondary.300'
                        gap={20}
                        pb='10'
                    >
                        {presentationItems.map((item, i) => {
                            const isLeft = i % 2 !== 0;
                            const animation = (
                                <Animation
                                    style={{ width: '40%' }}
                                    animationData={item.animationData}
                                />
                            );
                            return (
                                <Box
                                    key={i}
                                    w={small ? '100%' : '70%'}
                                    mx='auto'
                                    mt='10'
                                >
                                    <Fade left={isLeft} right={!isLeft}>
                                        <Flex
                                            justifyContent='space-between'
                                            textAlign={
                                                small ? 'center' : 'left'
                                            }
                                            alignItems='center'
                                            flexDir={small ? 'column' : 'row'}
                                        >
                                            {(small || isLeft) && animation}
                                            <Box w='55%'>
                                                <Text
                                                    fontSize='3xl'
                                                    as='b'
                                                    color='primary.900'
                                                >
                                                    {item.title}
                                                </Text>
                                                <Text
                                                    fontSize='lg'
                                                    color='grey.900'
                                                    my='8'
                                                >
                                                    {item.descr}
                                                </Text>
                                                {GettingStartedButton}
                                            </Box>
                                            {!small && !isLeft && animation}
                                        </Flex>
                                    </Fade>
                                </Box>
                            );
                        })}
                    </Flex>

                    <Flex
                        w={small ? '100%' : '70%'}
                        mx='auto'
                        justifyContent='space-between'
                        alignItems='center'
                        flexDir={small ? 'column' : 'row'}
                        py='20'
                    >
                        {sideFeatures.map((item, i) => {
                            return (
                                <Flex
                                    key={i}
                                    my={small ? 5 : 0}
                                    flexDir='column'
                                    alignItems={small ? 'center' : 'flex-start'}
                                    textAlign={small ? 'center' : 'left'}
                                    maxW='25%'
                                >
                                    <Zoom>
                                        <Box color='primary.300'>
                                            {<item.icon size='50pt' />}
                                        </Box>
                                        <Text
                                            as='b'
                                            color='primary.300'
                                            fontSize='2xl'
                                            my='2'
                                        >
                                            {item.title}
                                        </Text>
                                        <Text color='grey.500'>
                                            {item.desc}
                                        </Text>
                                    </Zoom>
                                </Flex>
                            );
                        })}
                    </Flex>

                    <Flex
                        flexDir='column'
                        w='100%'
                        bgGradient='linear(90deg, primary.300, primary.900);'
                        color='white.300'
                        py='100'
                        textAlign='center'
                        minH='200pt'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Flex
                            flexDir='column'
                            w='70%'
                            mx='auto'
                            alignItems='center'
                            justifyContent='center'
                            gap={5}
                        >
                            <Text fontSize='5xl' as='b'>
                                {t('readyToStart')}
                            </Text>
                            <Text color='secondary.100' fontSize='xl'>
                                {t('bringEfficiency')}
                            </Text>
                            {GettingStartedButton}
                        </Flex>
                    </Flex>
                </Box>

                {/* Footer  */}
                <Flex h='50pt' bgColor='white.300' w='100%'>
                    <Flex
                        h='100%'
                        alignItems='center'
                        w={small ? '95%' : '70%'}
                        mx='auto'
                        justifyContent='space-between'
                    >
                        <Flex h='100%' alignItems='center'>
                            <Image src={logo} h={small ? '40%' : '60%'} />
                            <Flex gap='1' ml='2'>
                                <Text>Copyright © 2022</Text>
                                <Text>{t('appName')}</Text>
                            </Flex>
                        </Flex>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<LanguageIcon size='14pt' />}
                                variant='ghost'
                            >
                                {getLang()}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => changeLang('en')}>
                                    English
                                </MenuItem>
                                <MenuItem onClick={() => changeLang('ro')}>
                                    Romana
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}
