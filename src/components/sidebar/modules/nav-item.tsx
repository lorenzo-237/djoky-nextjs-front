import { Link, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import NextLink from 'next/link';

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  children: string | number;
}
export default function NavItem({ url, icon, children, ...rest }: NavItemProps) {
  const isLogoutLink = url === '/logout';

  return (
    <Link href={url} as={NextLink} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: isLogoutLink ? 'red.500' : 'purple.500',
          color: 'white',
        }}
        color={isLogoutLink ? 'red.500' : ''}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}
