import React, { useEffect } from 'react';
import {
    useClipboard,
    Text,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    Button,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    Input,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const ShareCode = ({ code, open, onClose }) => {
    const { t } = useTranslation();
    const { onCopy, value, setValue, hasCopied } = useClipboard('');
    useEffect(() => {
        setValue(code);
    }, []);
    return (
        <Modal size='md' isOpen={open} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent borderRadius='16' boxShadow='xl'>
                <ModalHeader mt='2' pb='0'>
                    {t('group-invite-title')}
                </ModalHeader>
                <ModalCloseButton borderRadius='full' size='md' />
                <ModalBody>
                    <Text fontSize='sm'>{t('group-invite-description')}</Text>
                    <Flex my={4}>
                        <Input isReadOnly value={value} mr={2} />
                        <Button colorScheme='primary' onClick={onCopy}>
                            {hasCopied ? 'Copied!' : 'Copy'}
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ShareCode;
