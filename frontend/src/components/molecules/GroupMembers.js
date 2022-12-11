import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import MemberListItem from './MembersListItem';

const GroupMembers = ({ groupId, members, open, onClose, isCurrentUserOwner, isSelecting=false, selectMember=()=>{} }) => {
  const { t } = useTranslation();
  return (
    <Modal size="md" isOpen={open} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent borderRadius="16" boxShadow="xl" pb="2">
        <ModalHeader>{t('group-members-title')}</ModalHeader>
        <ModalCloseButton borderRadius="full" size="md"/>
        <ModalBody>
          {
            members?.map((member, index) => (
              <MemberListItem
                key={`group-member-${groupId}-${index}`}
                member={member}
                canRemove={isCurrentUserOwner}
                isSelecting={isSelecting}
                selectMember={selectMember}/>
            ))
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


export default GroupMembers;

