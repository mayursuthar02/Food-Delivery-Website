import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react"
import React from 'react'
import { LuUser2 } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";

import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { NavLink, Outlet } from "react-router-dom";

const UserSettingPage = () => {
    const user = useRecoilValue(userAtom);
    const dashBoardLink = [
        { title: "Profile", link: "profile", icon: <LuUser2/>},
        { title: "My Order", link: "my-order", icon: <LuShoppingCart/>},
    ]
    
    
  return (
    <Flex minH={'100vh'} display={'grid'} gridTemplateColumns={'.26fr 1fr'} gap={5} p={2}>
    <Box py={5} px={5} border={'1px solid'} borderColor={'gray.200'} borderRadius={'lg'}>
        <Flex alignItems={'center'} h={'fit-content'} px={5} gap={5}>
            <Avatar src={user?.profilePic ? user?.profilePic : ""} size={'lg'}/>
            <Text fontSize={'20px'} fontWeight={'500'} >{user?.businessName ? user?.businessName : user?.fullName}</Text>
        </Flex>

        <Divider borderColor={'#e5e5e5'} mt={5} mb={5}/>
        
        <Flex flexDir={'column'} gap={2}>
            {dashBoardLink.map((el,i) =>(
                <NavLink 
                key={i} 
                to={el.link}   
                _hover={{bgColor: 'blue.50', color:"blue.500"}} 
                px={4} 
                py={2} 
                borderRadius={'md'}>
                    {({ isActive }) => (
                        <Box
                            px={4}
                            py={2}
                            borderRadius={'md'}
                            bg={isActive ? 'green.50' : 'transparent'}
                            color={isActive ? 'green.500' : 'inherit'}
                            _hover={{ bg: 'green.50', color: 'green.500' }}
                        >
                            <Flex alignItems={'center'} gap={2}>
                                {el.icon}
                                {el.title}
                            </Flex>
                        </Box>
                    )}
                </NavLink>
            ))}
        </Flex>
    </Box>

    <Box py={5} px={5} border={'1px solid'} borderColor={'gray.200'} borderRadius={'lg'}>
        <Outlet/>
    </Box>
</Flex>
  )
}

export default UserSettingPage