import React from 'react'
import {Avatar, Badge, Box, Button, Divider, Flex, Grid, Image, Link, Text} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';

import { FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { LuClock8 } from "react-icons/lu";

import foodImg from '../assets/img/burger.jpg';

import {sweetDishes} from '../helpers/sweetsSuggestion';
import { formatDistanceToNow } from 'date-fns';



const ItemsDetailsPage = () => {
  return (
    <Grid templateColumns={'1fr .6fr'} padding={10} gap={'40px'}>

        {/* Left Side */}
        <Box>
        <Box border={'1px solid'} borderColor={'gray.100'} py={6} px={10}>
            <Badge colorScheme='green'>
                <Flex align={'center'} gap={1}>
                    <IoStar/>
                    <Text>4.5</Text>
                </Flex>
            </Badge>
            
            <Text fontSize={'40px'} fontWeight={'600'}>Burger King</Text>

            <Flex align={'center'} justifyContent={'space-between'}>
                <Text fontSize={'16px'} color={'gray.500'}>Burger</Text>
                <Text fontSize={'30px'} fontWeight={'600'}>₹160</Text>
            </Flex>
            
            <Divider borderColor={'gray.200'} my={5}/>

            <Text fontSize={'15px'} color={'gray.500'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aspernatur dolores natus aliquam reiciendis error magni modi. Laboriosam, sint? Eaque natus consequuntur aspernatur laboriosam minima illo eius velit blanditiis, hic assumenda sequi quasi adipisci perspiciatis quo pariatur ipsum, ullam temporibus!</Text>

            <Divider borderColor={'gray.200'} my={5}/>

            <Flex mt={5} align={'center'} justifyContent={'space-between'}>
                <Badge colorScheme='green' fontSize={'20px'}>available</Badge>

                <Flex align={'center'} gap={1} fontSize={'20px'} color={`green.400`} fontWeight={'600'}>
                    <MdOutlineRadioButtonChecked size={'25px'}/>
                    <Text>VEG</Text>
                </Flex>
            </Flex>

            <Flex align={'center'} gap={2} mt={5}>
                <Text fontSize={'15px'} fontWeight={'500'} color={'gray.500'}>Delivery time :</Text>
                <Flex align={'center'} gap={1} fontSize={'15px'} fontWeight={'500'} color={'green.500'}>
                    <LuClock8/>
                    <Text>20min</Text>
                </Flex>
            </Flex>

            <Divider borderColor={'gray.200'} my={5}/>
            
            <Text fontSize={'15px'} color={'gray.500'}>Restaurant :</Text>
            <Link as={RouterLink} fontSize={'25px'} fontWeight={'500'}>Sizzling Salsa Belliza</Link>
            <Text fontSize={'15px'} color={'gray.500'}>Street City state</Text>
        </Box>

        <Box w={'500px'} mt={10}>
            <Text fontSize={'20px'} fontWeight={'500'}>Reviews</Text>

            <Divider borderColor={'gray.200'} my={5}/>

            <Box p={4} mb={4}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Flex align={'center'} gap={2}>
                      <Avatar src={''} size={'sm'}/>
                      <Text fontSize={'15px'} fontWeight={'600'}>Mayur</Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={4}>
                      <Text fontSize={'12px'} color={'gray.500'}>ago</Text>
                      <Flex fontSize={'12px'} gap={1}>
                      {[1, 2, 3, 4, 5].map((starValue) => (
                          <FaStar
                            key={starValue}
                            color={starValue <= 3 ? "orange" : "#748298"}
                          />
                      ))}
                      </Flex>
                    </Flex>
                </Flex>
                <Text color={'gray.500'} fontSize={'15px'} mt={2}>nice</Text>
            </Box>
        </Box>

        </Box>
        
        

        {/* Right Side */}
        <Box>
            <Box width={'600px'} height={'400px'} borderRadius={'md'} bgColor={'gray.100'} mx={'auto'} overflow={'hidden'}>
                <Image src={foodImg} w={'full'} h={'full'} objectFit={'cover'}/>
            </Box>

            <Flex align={'center'} gap={5}>
                <Button px={10} py={6} mt={10} colorScheme='green'>Add to Bucket</Button>
                <Flex align={'center'} gap={2} px={10} py={3} mt={10} bgColor={'green.500'} borderRadius={'md'} color={'white'} fontWeight={'600'} fontSize={'17px'} _hover={{bgColor: 'green.600'}} cursor={'pointer'}>
                    <FaRegHeart fontSize={'20px'}/>
                    Favourite
                </Flex>
            </Flex>

            <Divider my={10} borderColor={'gray.200'}/>

            <Flex flexDir={'column'} justifyContent={'center'} gap={4} border={'1px solid'} borderColor={'gray.100'} borderRadius={'md'}  p={5} >
                <Text fontSize={'20px'} fontWeight={'500'} mb={5}>would you like something in the sweet? 😋</Text>
                
                {sweetDishes.map((sweet) => (
                    <Grid key={sweet._id} h={'100px'} templateColumns={'.4fr 1fr .4fr'} gap={5} border={'1px solid'} borderColor={'gray.100'} borderRadius={'md'} cursor={'pointer'} _hover={{bgColor: 'gray.50'}}>
                        <Box borderRadius={'md'} overflow={'hidden'} bgColor={'gray.100'}>
                            <Image src={sweet.image} w={'full'} h={'full'} objectFit={'cover'}/>
                        </Box>
                        <Box>
                            <Text mt={5} fontSize={'20px'} fontWeight={'600'}>{sweet.name}</Text>
                            <Text color={'gray.500'}>{sweet.category}</Text>
                        </Box>
                        <Flex borderLeft={'1px solid'} borderColor={'gray.100'} align={'center'} justify={'center'} borderRadius={'md'}>
                            <Text fontSize={'20px'} fontWeight={'600'}>₹{sweet.price}</Text>
                        </Flex>
                    </Grid>
                ))}
            </Flex>
        </Box>
    </Grid>
  )
}

export default ItemsDetailsPage