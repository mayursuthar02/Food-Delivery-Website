import { Badge, Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

const ItemCard = ({item}) => {
  return (
    <Link as={RouterLink} to={`/${item.itemName}/${item._id}`} border={'1px solid'} borderColor={'white'} _hover={{borderColor: "gray.200"}} transition={'.1s ease'} borderRadius={'2xl'} padding={3}>

        <Box position={'relative'}>
            <Box w={'full'} h={'200px'} bgColor={'gray.100'} borderRadius={'xl'} overflow={'hidden'}>
                <Image src={item.image} w={'full'} h={'full'} objectFit={'cover'} loading='lazy'/>
            </Box>

            <Flex align={'start'} justifyContent={'space-between'} px={2} mt={2}>
                <Text fontSize={'20px'} fontWeight={'600'}>{item.itemName}</Text>
                <Badge colorScheme='green' mt={1}>
                    <Flex align={'center'} gap={1}>
                        <FaStar/>
                        <Text>4.5</Text>
                    </Flex>
                </Badge>
            </Flex>

            <Flex align={'center'} justifyContent={'space-between'} px={2}>
                <Text fontSize={'15px'} fontWeight={'600'} color={'gray.500'}>{item.category}</Text>
                <Text fontSize={'20px'} fontWeight={'700'} color={'gray.800'}>₹{item.price}</Text>
            </Flex>


            <Flex align={'center'} gap={3} px={2} mt={2}>
                <Badge colorScheme={item.availability == true ? "green" : "red"}>{item.availability == true ? "Available" : "Not available"}</Badge>
                <Badge colorScheme={item.isVeg == true ? "green" : "red"}>{item.isVeg == true ? "VEG" : "NON-VEG"}</Badge>
            </Flex>
        </Box>
    </Link>
  )
}

export default ItemCard