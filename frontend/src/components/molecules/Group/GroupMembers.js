import React from 'react';
import { Flex, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MembersListItem } from './';

const GroupMembers = ({ groupId, members, open, onClose, isCurrentUserOwner, isSelecting=false, selectMember=()=>{} }) => {
  const { t } = useTranslation();
  return (
    <Modal size="md" isOpen={open} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent borderRadius="16" boxShadow="xl" pb="2">
        <ModalHeader>{t('group-members-title')}</ModalHeader>
        <ModalCloseButton borderRadius="full" size="md"/>
        <ModalBody>
          <Flex direction="column" gap="3">
            {
              members?.map((member, index) => (
                <MembersListItem
                  key={`group-member-${groupId}-${index}`}
                  groupId={groupId}
                  member={member}
                  canRemove={isCurrentUserOwner}
                  isSelecting={isSelecting}
                  selectMember={selectMember}/>
              ))
            }
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


export default GroupMembers;

