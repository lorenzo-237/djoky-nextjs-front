'use client';

import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';

export interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<any>;
  finalRef: React.RefObject<any>;
  children: React.ReactNode;
  data: {
    title: string;
    footer: React.ReactNode;
  };
}

export default function DefaultModal({ isOpen, onClose, initialRef, finalRef, children, data }: DefaultModalProps) {
  return (
    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>{data.footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
