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

// Navbar Links
const navLinks = [
  {label: "Home", path: '/'},
  {label: "Recipes", path: '/recipes'},
  {label: "Contact", path: '/'},
  {label: "About Us", path: '/'},
]


const Header = () => {
  const [user,setUser] = useRecoilState(userAtom);
  
  
  return (
    <header>  
      <Flex alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #eee'} px={'40px'} py={'15px'}>
        <Link to={'/'} as={RouterLink}>
          <Logo/>
        </Link>

        <Flex align={'center'} gap={5} fontSize={'15px'} >
          {navLinks.map(link => (
            <Link key={link.label} as={RouterLink} to={link.path} _hover={{ color: 'green.400' }} color={'gray.700'}>{link.label}</Link>
          ))}
        </Flex>

        <Flex align={'center'} gap={2}>
          <Flex align={'center'} gap={2}>
            <Link>
              <IconButton icon={<HiOutlineSearch size={'1.3rem'}/>} bgColor={"white"} _hover={{bgColor: "green.50"}} borderRadius={'full'}/>
            </Link>
            <Link>
              <IconButton icon={<PiHeartStraight size={'1.3rem'}/>} bgColor={"white"} _hover={{bgColor: "green.50"}} borderRadius={'full'}/>
            </Link>
            <Link>
              <IconButton  icon={<GiBeachBag size={'1.3rem'}/>} bgColor={"white"} _hover={{bgColor: "green.50"}} borderRadius={'full'}/>
            </Link>

            
            <Menu>
              <MenuButton bgColor={'white'} _hover={{bgColor: 'green.50'}} borderRadius={'full'}>
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
                      <Link as={RouterLink} to={'/user/profile'} mx={-2} px={5} py={2} borderRadius={'md'} _hover={{bgColor: "green.50", color: "green.400"}}>Profile</Link>
                      <Link as={RouterLink} to={'/user/my-order'} mx={-2} px={5} py={2} borderRadius={'md'} _hover={{bgColor: "green.50", color: "green.400"}}>My Order</Link>
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
      </Flex>
    </header>
  )
}

export default Header