import { Box, Button, Divider, Flex, IconButton, Input, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { FiPlusSquare } from 'react-icons/fi'

import UploadFoodItem from '../components/UploadFoodItem'
import useShowToast from '../hooks/useShowToast'
import FetchMenuItems from '../hooks/FetchMenuItems'

import menuItemsAtom from '../atoms/menuItemsAtom'
import { useRecoilState } from 'recoil'

import MenuItemCard from '../components/MenuItemCard'


const RestaurantMenuPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useRecoilState(menuItemsAtom);

  const fetchMenuItemsData = FetchMenuItems();
  const showToast = useShowToast();
    
  // Fetch Menu Items
  useEffect(()=>{
    setLoading(true);
    try {
      fetchMenuItemsData();
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  },[showToast]);
  
  
  return (
    <>
    <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Box position={'relative'} w={'350px'}>
          <Input placeholder='search products' pr={10}/>
          <IconButton aria-label='Search' icon={<Search2Icon size={'1.5rem'}/>} color={'gray.500'} bgColor={'transparent'} _hover={{bgColor: "transparent"}} position={'absolute'} right={0} translateY='-50%'/>
        </Box>
        <Button display={'flex'} alignItems={'center'} gap={2} colorScheme='green' borderRadius={'md'} onClick={onOpen}>
          <FiPlusSquare size={'17px'}/>
          Add Food Item
        </Button>
    </Flex>

    <Divider borderColor={'gray.200'} my={5}/>

    {/* Show menu items */}
    <Box display={'grid'} gridTemplateColumns={'repeat(4, 1fr)'} gap={5} my={5}>
      {menuItems.map((item)=>(
        <MenuItemCard item={item}/>
      ))}
    </Box>


    {/* Upload item model Dialog Box */}
    <UploadFoodItem isOpen={isOpen} onClose={onClose}/>
    
    </>
  )
}

export default RestaurantMenuPage