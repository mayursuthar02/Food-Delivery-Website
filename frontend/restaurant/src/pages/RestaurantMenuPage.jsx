import { Search2Icon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, IconButton, Input, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import UploadFoodItem from '../components/UploadFoodItem'

const RestaurantMenuPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    
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


    <UploadFoodItem isOpen={isOpen} onClose={onClose}/>
    
    </>
  )
}

export default RestaurantMenuPage