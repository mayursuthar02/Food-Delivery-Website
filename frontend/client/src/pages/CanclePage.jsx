import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const CanclePage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
      navigate("/");
    }, 5000);
  },[])


  return (
    <Flex minH={'100vh'} flexDir={'column'} align={'center'} justify={'center'}>
    <Box bgColor={'red.100'} borderRadius={'full'} p={10}>
        <IoIosCloseCircle color='red' fontSize={'100px'}/>
    </Box>
    <Text mt={7} fontSize={'25px'} fontWeight={'500'}>Order Canclled!</Text>
  </Flex>
  )
}

export default CanclePage