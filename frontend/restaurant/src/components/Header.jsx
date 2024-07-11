import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {Avatar, Box, Button, Divider, Flex, IconButton, Link, Menu, MenuButton, MenuList, Text} from '@chakra-ui/react';

import Logo from '../components/Logo';

import { HiOutlineSearch } from "react-icons/hi";
import { PiHeartStraight } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { GiBeachBag } from "react-icons/gi";

import {useRecoilState} from 'recoil';
import userAtom from '../atoms/userAtom';

const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);
  
  return (
    <header>  
      <Flex alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #eee'} px={'40px'} py={'15px'}>
        <Link as={RouterLink}>
          <Logo/>
        </Link>

          <Flex align={'center'} gap={2}>            
            <Text>Contact : @mealsprint@gmail.com</Text>

            <Menu>
              <MenuButton bgColor={'white'} _hover={{bgColor: 'green.100'}} borderRadius={'full'}>
                {<IconButton aria-label='User' icon={<LuUser2 size={'1.3rem'}/>} bgColor={'transparent'}/>}
              </MenuButton>

              <MenuList zIndex={10}>

                <Flex flexDirection={'column'} px={5} py={3} gap={3}>
                  {user && <Flex align={'center'} gap={2}>
                    <Avatar src={user?.profilePic}/>
                    <Text>{user?.fullName}</Text>
                  </Flex>}

                  {user && <Divider mt={2}/>}

                  {user && (
                    <Flex flexDir={'column'} justifyContent={'center'}>
                      <Link as={RouterLink} mx={-2} px={5} py={2} borderRadius={'md'} _hover={{bgColor: "green.50", color: "green.400"}}>Profile</Link>
                      <Link as={RouterLink} mx={-2} px={5} py={2} borderRadius={'md'} _hover={{bgColor: "green.50", color: "green.400"}}>My Order</Link>
                    </Flex>
                  )}

                  {!user && <Link as={RouterLink} to={'/login'}>
                    <Button w={'full'} colorScheme='green'>Login</Button>
                  </Link>}

                  {user && <Divider mb={2}/>}

                  {user && <Button w={'full'} colorScheme='gray'>Logout</Button>}
                </Flex>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
    </header>
  )
}

export default Header