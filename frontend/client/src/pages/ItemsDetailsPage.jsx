import React, { useEffect, useState } from 'react'
import {Avatar, Badge, Box, Button, Divider, Flex, Grid, Image, Link, Spinner, Text, useDisclosure} from '@chakra-ui/react';
import {Link as RouterLink, useParams} from 'react-router-dom';

import { FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { LuClock8 } from "react-icons/lu";
import { TbMessage2 } from "react-icons/tb";

import foodImg from '../assets/img/burger.jpg';

import {sweetDishes} from '../helpers/sweetsSuggestion';
import { formatDistanceToNow } from 'date-fns';
import useShowToast from '../hooks/useShowToast';
import FetchBucketItems from '../helpers/FetchBucketItems';
import WriteReview from '../components/WriteReview';



const ItemsDetailsPage = () => {
    const [itemData, setItemData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [seeReviews, setSeeReviews] = useState(2);
    const [loading, setLoading] = useState(false);
    const [addToBucketLoading, setAddToBucketLoading] = useState(false);
    const [callBackFunction, setCallBackFunction] = useState(false);
    const {id} = useParams();
    const showToast = useShowToast();
    const fetchBucketItemsFunc = FetchBucketItems();
    const { isOpen, onOpen, onClose } = useDisclosure();

  // Scroll top
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts or updates
  }, []);

    useEffect(()=>{
        const fetchItemData = async() => {
            setLoading(true);
            try {
                const res = await fetch(`/api/menu-items/get-item/${id}`);
                const data = await res.json();
        
                if (data.error) {
                  showToast("Error", data.error, "error");
                  return;
                }
        
                setItemData(data);
        
            } catch (error) {
                console.log(error);        
            } finally {
                setLoading(false);
            }
        }

        fetchItemData();
    },[id]);
    
// Fetch all reviews data
  useEffect(() => {
    const getAllProductReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/by-item/${id}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    getAllProductReviews();
  }, [id, callBackFunction]);

      // Add to Bucket
    const addToBucketFunc = async() => {
      if (!id) {
        showToast("Error", "Something wrong", "error");
        return;
      }

      setAddToBucketLoading(true);    
      try {
        const res = await fetch('/api/buckets/add-to-bucket', {
          method: 'POST',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({itemId: id})
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        showToast("Success", "Item add in Bucket", "success");
      } catch (error) {
        console.log(error);
      } finally {
        setAddToBucketLoading(false);
        fetchBucketItemsFunc();
      }
    }
    
    const addExtraSweetFunc = async(id) => {
        showToast("Success", id, "success")
        const sweetData = sweetDishes.filter((sweet) => sweet._id == id);
        console.log(sweetData);
    }
    
    if(!itemData) {
        return (
            <Flex minH={'100vh'} align={'center'} justifyContent={'center'}>
                <Spinner size={'xl'} color='gray.600'/>
            </Flex>
        )
    }

    if(loading) {
        return (
            <Flex minH={'100vh'} align={'center'} justifyContent={'center'}>
                <Spinner size={'xl'} color='gray.600'/>
            </Flex>
        )
    }

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
            
            <Text fontSize={'40px'} fontWeight={'600'}>{itemData.itemName}</Text>

            <Flex align={'center'} justifyContent={'space-between'}>
                <Text fontSize={'16px'} color={'gray.500'}>{itemData.category}</Text>
                <Text fontSize={'30px'} fontWeight={'600'}>₹{itemData.price}</Text>
            </Flex>
            
            <Divider borderColor={'gray.200'} my={5}/>

            <Text fontSize={'15px'} color={'gray.500'}>{itemData.description}</Text>

            <Divider borderColor={'gray.200'} my={5}/>

            <Flex mt={5} align={'center'} justifyContent={'space-between'}>
                <Badge colorScheme={itemData.availability == true ? "green" : "red"} fontSize={'20px'}>{itemData.availability == true ? "Available" : "Not available"}</Badge>

                <Flex align={'center'} gap={1} fontSize={'20px'} color={itemData.isVeg == true ? "green.400" : "red.400"} fontWeight={'600'}>
                    <MdOutlineRadioButtonChecked size={'25px'}/>
                    <Text>{itemData.isVeg == true ? "VEG" : "NON-VEG"}</Text>
                </Flex>
            </Flex>

            <Flex align={'center'} gap={2} mt={5}>
                <Text fontSize={'15px'} fontWeight={'500'} color={'gray.500'}>Delivery time :</Text>
                <Flex align={'center'} gap={1} fontSize={'15px'} fontWeight={'500'} color={'green.500'}>
                    <LuClock8/>
                    <Text>{itemData.deliveryTime}</Text>
                </Flex>
            </Flex>

            <Divider borderColor={'gray.200'} my={5}/>
            
            <Text fontSize={'15px'} color={'gray.500'}>Restaurant :</Text>
            <Link as={RouterLink} to={`/restaurant/${itemData.restaurantId.restaurantName}/${itemData.restaurantId._id}`} fontSize={'25px'} fontWeight={'500'}>{itemData.restaurantId.restaurantName}</Link>
            <Text fontSize={'15px'} color={'gray.500'}>{itemData.restaurantId.address.city}, {itemData.restaurantId.address.state}</Text>
        </Box>

        <Box w={'500px'} mt={10}>
            <Text fontSize={'20px'} fontWeight={'500'}>Reviews</Text>

            <Divider borderColor={'gray.200'} my={5}/>

            <Box>
            <Text fontSize={'15px'} fontWeight={'600'}>REVIEWS</Text>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text fontSize={'15px'} color={'gray.500'}>{reviews.length} Reviews</Text>
              <Button color={'gray.500'} display={'flex'} alignItems={'center'} gap={2} fontWeight={'500'} fontSize={'15px'} onClick={onOpen}>
                <TbMessage2/>
                Write a review
              </Button>
            </Flex>

            {reviews.length > 0 && (
              reviews.slice(0,seeReviews).map((review) => (
                <Box key={review.id} p={4} mb={4}>
                  <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Flex align={'center'} gap={2}>
                      <Avatar src={review.userId.profilePic} size={'sm'}/>
                      <Text fontSize={'15px'} fontWeight={'600'}>{review.userId.fullName}</Text>
                    </Flex>

                    <Flex alignItems={'center'} gap={4}>
                      <Text fontSize={'12px'} color={'gray.500'}>{formatDistanceToNow(new Date(review.createdAt))} ago</Text>
                      <Flex fontSize={'12px'} gap={1}>
                      {[1, 2, 3, 4, 5].map((starValue) => (
                          <FaStar
                            key={starValue}
                            color={starValue <= review.rating ? "orange" : "#748298"}
                          />
                      ))}
                      </Flex>
                    </Flex>
                  </Flex>

                  <Text color={'gray.500'} fontSize={'15px'} mt={2}>{review.text}</Text>
                </Box>
              ))
            )}

            {reviews.length == 0 && (
                <Text marginTop={10} fontSize={'15px'} color={'gray.500'}>Write your reviews...</Text>
            )}

            {reviews.length > seeReviews && <Link color={'gray.500'} fontSize={'15px'} _hover={{color: "green.500", textDecoration: 'underline'}} onClick={() => setSeeReviews(10)}>see reviews</Link>}
            {reviews.length < seeReviews && reviews.length > 2 && <Link color={'gray.500'} fontSize={'15px'} _hover={{color: "green.500", textDecoration: 'underline'}} onClick={() => setSeeReviews(2)}>see less</Link>}
          </Box>
        </Box>

        </Box>
        
        

        {/* Right Side */}
        <Box>
            <Box width={'600px'} height={'400px'} borderRadius={'md'} bgColor={'gray.100'} mx={'auto'} overflow={'hidden'}>
                <Image src={itemData.image} w={'full'} h={'full'} objectFit={'cover'}/>
            </Box>

            <Flex align={'center'} gap={5}>
                <Button px={10} py={6} mt={10} colorScheme='green' isDisabled={itemData.availability == false ? true : false} onClick={addToBucketFunc} isLoading={addToBucketLoading}>Add to Bucket</Button>
                <Flex align={'center'} gap={2} px={10} py={3} mt={10} bgColor={'green.500'} borderRadius={'md'} color={'white'} fontWeight={'600'} fontSize={'17px'} _hover={{bgColor: 'green.600'}} cursor={'pointer'}>
                    <FaRegHeart fontSize={'20px'}/>
                    Favourite
                </Flex>
            </Flex>

            <Divider my={10} borderColor={'gray.200'}/>

            <Flex flexDir={'column'} justifyContent={'center'} gap={4} border={'1px solid'} borderColor={'gray.100'} borderRadius={'md'}  p={5} >
                <Text fontSize={'20px'} fontWeight={'500'} mb={5}>would you like something in the sweet? 😋</Text>
                
                {sweetDishes.map((sweet) => (
                    <Grid key={sweet._id} h={'100px'} templateColumns={'.4fr 1fr .4fr'} gap={5} 
                    border={'1px solid'} borderColor={'gray.100'} borderRadius={'md'} cursor={'pointer'} 
                    _hover={{bgColor: 'gray.50'}} onClick={() => addExtraSweetFunc(sweet._id)}
                    >
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

        <WriteReview isOpen={isOpen} onClose={onClose} itemData={itemData} setCallBackFunction={setCallBackFunction}/>
    </Grid>
  )
}

export default ItemsDetailsPage