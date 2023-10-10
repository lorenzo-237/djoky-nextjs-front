'use client';

import { Box, Link, Flex, useColorModeValue, BoxProps, CloseButton } from '@chakra-ui/react';
import { LinkItems } from '../constants';
import { NavItem } from '.';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Link href='/' fontSize='2xl' fontFamily='monospace' fontWeight='bold' style={{ textDecoration: 'none' }}>
          Djoky
        </Link>
        {/* for mobile */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url} onClick={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
