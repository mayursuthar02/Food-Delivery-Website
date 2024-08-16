import React from 'react'
import {categoryList} from '../helpers/categorysList';
import { Box, Divider, Flex, Grid, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const FoodCategories = () => {
    

  return (
      <Box>
        <Flex align={'center'} mb={5}>
            <Divider borderColor={'gray.200'}/>
            <Text w={'500px'} textAlign={'center'} textTransform={'uppercase'} fontSize={'15px'} fontWeight={'500'} color={'gray.500'}>What's on your mind?</Text>
            <Divider borderColor={'gray.200'}/>
        </Flex>
        <Box overflow={'scroll'} className='hide-scroll'>        
            <Grid templateColumns={`repeat(${categoryList.length /2},1fr)`} gap={1}>
                {categoryList.map((item,i) => (
                    <Link key={i} to={`/recipe/${item.value}`} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={2} as={RouterLink} border={'1px solid'} minW={'130px'} minH={'130px'} borderColor={'white'} _hover={{borderColor: 'gray.50', bgColor: 'gray.50'}} borderRadius={'md'}>
                        <Box w={'100px'} h={'100px'} overflow={'visible'}>
                            <Image src={item.img} w={'full'} h={'full'} objectFit={'contain'}/>
                        </Box>
                        <Text textAlign={'center'} fontSize={'15px'} fontWeight={'500'} color={'gray.500'}>{item.title}</Text>
                    </Link>    
                ))}
            </Grid>
        </Box>
    </Box>
  )
}

export default FoodCategories