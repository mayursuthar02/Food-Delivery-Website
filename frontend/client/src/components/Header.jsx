import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {Box, Button, Divider, Flex, IconButton, Link, Menu, MenuButton, MenuList, Text} from '@chakra-ui/react';

import Logo from '../components/Logo';

import { HiOutlineSearch } from "react-icons/hi";
import { PiHeartStraight } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { GiBeachBag } from "react-icons/gi";

const Header = () => {
  return (
    <header>  
      <Flex alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #eee'} px={'40px'} py={'15px'}>
        <Link as={RouterLink}>
          <Logo/>
        </Link>

        <Flex align={'center'} gap={5} fontSize={'17px'} fontWeight={'500'}>
          <Link as={RouterLink} to={`/`} _hover={{ color: 'green.500' }}>Home</Link>
          <Link as={RouterLink} to={`/`} _hover={{ color: 'green.500' }}>Recipes</Link>
          <Link as={RouterLink} to={`/`} _hover={{ color: 'green.500' }}>Contact</Link>
          <Link as={RouterLink} to={`/`} _hover={{ color: 'green.500' }}>About Us</Link>
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
                  {/* {user && <Flex align={'center'} gap={2}>
                    <Avatar src={user?.profilePic}/>
                    <Text>{user?.fullName ? user?.fullName : user?.businessName}</Text>
                  </Flex>} */}

                  {/* {user && <Divider mt={2}/>} */}

                  <Link as={RouterLink} to={'/login'}>
                    <Button w={'full'} colorScheme='green'>Login</Button>
                  </Link>

                  {/* {user && <Divider mb={2}/>} */}

                  {/* {user && <Button w={'full'} colorScheme='gray' onClick={handleLogout}>Logout</Button>} */}
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