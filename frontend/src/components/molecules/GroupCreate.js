import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Textarea,
  Stack
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import { addGroup } from '../../state/actions/group';

const GroupCreate = ({isOpen, close, addGroup}) => {
  const { t } = useTranslation();
  const [group, setGroup] = useState({
    name: '',
    description: ''
  });
  const isDataValid = group.name.length >= 3 && group.description.length >= 3;
  const handleGroupCreate = async () => {
    await addGroup(group);
    close();
  };
  return (
    <>
      <Modal size="lg" isOpen={isOpen} onClose={close} isCentered={true}>
        <ModalOverlay />
        <ModalContent borderRadius="16" boxShadow="xl">
          <ModalHeader mt="2" pb="0">{t('group-create-title')}</ModalHeader>
          <ModalCloseButton borderRadius="full" size="md"/>
          <ModalBody>
            <Text fontSize="sm">{t('group-create-subtitle')}</Text>
            <Stack gap="6" mt="8">
              <FormControl id="name" isRequired>
                <FormLabel fontSize={'md'} color="gray.600">{t('create-group-name-label')}</FormLabel>
                <Input
                  size="md"
                  borderRadius="xl"
                  value={group.name}
                  onChange={(e) =>
                    setGroup({...group, name: e.target.value})
                  }
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel fontSize={'md'} color="gray.600">{t('create-group-description-label')}</FormLabel>
                <Textarea
                  value={group.description}
                  borderRadius="xl"
                  onChange={(e) =>
                    setGroup({...group, description: e.target.value})
                  }
                  size="md"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={close}>{t('dismiss')}</Button>
            <Button
              isDisabled={!isDataValid}
              colorScheme="primary"
              borderRadius="lg"
              onClick={handleGroupCreate}>
              {t('create')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addGroup: (group) => dispatch(addGroup(group))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreate);
