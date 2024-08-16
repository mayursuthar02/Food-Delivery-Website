import React, { useEffect, useRef } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {Avatar, Badge, Box, Button, Divider, Flex, IconButton, Link, Menu, MenuButton, MenuList, Text, useDisclosure} from '@chakra-ui/react';

import Logo from '../components/Logo';

import { HiOutlineSearch } from "react-icons/hi";
import { PiHeartStraight } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { GiBeachBag } from "react-icons/gi";

import {useRecoilState, useRecoilValue} from 'recoil';
import userAtom from '../atoms/userAtom';
import BucketDrawer from './BucketDrawer';
import bucketAtom from '../atoms/bucketAtom';
import useShowToast from '../hooks/useShowToast';
import SearchModel from './SearchModel';

// Navbar Links
const navLinks = [
  {label: "Home", path: '/'},
  {label: "Recipes", path: '/recipes'},
  {label: "Contact", path: '/'},
  {label: "About Us", path: '/'},
]


const Header = () => {
  const [user,setUser] = useRecoilState(userAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart } = useDisclosure();
  const headerRef = useRef(null);
  const showToast = useShowToast();
  const bucketItems = useRecoilValue(bucketAtom);
  const navigate = useNavigate();

    // Sticky Header
    const stickyHeaderFunc = () => {
      window.addEventListener("scroll", () => {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current?.classList.add("sticky__header");
        } else {
          headerRef.current?.classList.remove("sticky__header");
        }
      });
    };
    useEffect(() => {
      stickyHeaderFunc();
      return window.removeEventListener("scroll", stickyHeaderFunc);
    });
  
    // Handle Logout
  const handleLogout = async() => {
    try {
      const res = await fetch('/api/users/logout', {
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
      localStorage.removeItem('user-details');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header ref={headerRef}>  
      <Flex bgColor={'white'} alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid #eee'} px={'40px'} py={'15px'}>
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
            <Link onClick={onOpen}>
              <IconButton icon={<HiOutlineSearch size={'1.3rem'}/>} bgColor={"white"} _hover={{bgColor: "green.50"}} borderRadius={'full'}/>
            </Link>
            <Link>
              <Box position={'relative'} onClick={onOpenCart}>
                <Badge variant='solid' bgColor={'green.500'} position={'absolute'} top={0} right={0} fontSize={'10px'} zIndex={1}>{bucketItems.length}</Badge>
                <IconButton  icon={<GiBeachBag size={'1.3rem'}/>} bgColor={"white"} _hover={{bgColor: "green.50"}} borderRadius={'full'}/>
              </Box>
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

                  {user && <Button w={'full'} colorScheme='gray' onClick={handleLogout}>Logout</Button>}
                </Flex>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* Cart Drawer    */}
        <BucketDrawer isOpenCart={isOpenCart} onCloseCart={onCloseCart}/>

        {/* Search Model */}
        <SearchModel isOpen={isOpen} onClose={onClose}/>
      </Flex>
    </header>
  )
}

export default Header