import React from 'react'
import {categoryList} from '../helpers/categorysList';
import { Box, Flex, Grid, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const FoodCategories = () => {
  return (
    <Box overflow={'scroll'} className='hide-scroll'>
        <Grid templateColumns={'repeat(70,1fr)'} gap={1}>
            {categoryList.map((item,i) => (
                <Link display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={2} as={RouterLink} border={'1px solid'} minW={'130px'} minH={'130px'} borderColor={'white'} _hover={{borderColor: 'gray.50', bgColor: 'gray.50'}} borderRadius={'md'}>
                    <Box w={'100px'} h={'100px'} overflow={'visible'}>
                        <Image src={item.img} w={'full'} h={'full'} objectFit={'cover'}/>
                    </Box>
                    <Text textAlign={'center'} fontSize={'15px'} fontWeight={'500'} color={'gray.500'}>{item.title}</Text>
                </Link>    
            ))}
        </Grid>
    </Box>
  )
}

export default FoodCategories