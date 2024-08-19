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

import useShowToast from '../hooks/useShowToast';

const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();
  
  // Handle Logout
  const handleLogout = async() => {
    try {
      const res = await fetch('/api/restaurant/logout', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
      });

      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, "error");
        return;
      }
      console.log(data);
      showToast('Success', "Logged out", "success");
      localStorage.removeItem('restaurant-user-details');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>  
      <Flex alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #eee'} px={'40px'} py={'15px'}>
        <Link as={RouterLink}>
          <Logo/>
        </Link>

          <Flex align={'center'} gap={2}>            
            <Text>Contact : mealsprint@gmail.com</Text>

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
                      <Link as={RouterLink} to={'/dashboard/profile'} mx={-2} px={5} py={2} borderRadius={'md'} _hover={{bgColor: "green.50", color: "green.400"}}>Profile</Link>
                      <Link as={RouterLink} to={'/dashboard/my-order'} mx={-2} px={5} py={2} borderRadius={'md'} _hover={{bgColor: "green.50", color: "green.400"}}>My Order</Link>
                    </Flex>
                  )}

                  {!user && <Link as={RouterLink} to={'/login'}>
                    <Button w={'full'} colorScheme='green'>Login</Button>
                  </Link>}

                  {user && <Divider mb={2}/>}

                  {user && <Button w={'full'} colorScheme='gray' onClick={handleLogout}>Logout</Button>}
                </Flex>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
    </header>
  )
}

export default Header