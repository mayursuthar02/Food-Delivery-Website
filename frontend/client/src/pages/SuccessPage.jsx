import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { MdOutlineCheck } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const deleteUserBucketItems = async() => {
      try {
        const res = await fetch('/api/buckets/delete-user-bucket-items', {
          method: 'DELETE',
          headers: {"Content-Type" : "application/json"},
        });
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    deleteUserBucketItems();


    setTimeout(() => {
      navigate("/");
    }, 5000);
  },[])
  
  return (
    <Flex minH={'100vh'} flexDir={'column'} align={'center'} justify={'center'}>
    <Box bgColor={'green.100'} borderRadius={'full'} p={10}>
      <Flex align={'center'} justify={'center'} bgColor={'green.400'} w={'100px'} h={'100px'} borderRadius={'full'}>
        <MdOutlineCheck color='white' fontSize={'40px'}/>
      </Flex>
    </Box>
    <Text mt={7} fontSize={'25px'} fontWeight={'500'}>Payment Success!</Text>
  </Flex>
  )
}

export default SuccessPage