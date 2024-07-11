import React, { useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Center,
  Button,
  Text,
  Divider,
  Image,
} from "@chakra-ui/react";

import { FiEdit } from "react-icons/fi";

import {useRecoilState} from 'recoil';
import userAtom from '../atoms/userAtom'

import usePriviewImg from '../hooks/usePriviewImg';
import useShowToast from "../hooks/useShowToast";

const RestaurantProfile = () => {
  const [user,setUser] = useRecoilState(userAtom);

  const [restaurantName, setRestaurantName] = useState(user?.restaurantName);
  const [bio, setBio] = useState(user?.bio)
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();
  const {handleImageChange, imgUrl} = usePriviewImg();

  const showToast = useShowToast();

  // Handle update
  const handleUpdate = async() => {
    
    try {
      setLoading(true);
      const res = await fetch('/api/restaurant/update-restaurant-profile', {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({restaurantName, bio, email, phone, address, profilePic: imgUrl})
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, "error");
        return;
      }
      showToast('Success', "Profile updated", "success");
      localStorage.setItem('restaurant-user-details', JSON.stringify(data));
      setUser(data);

    } catch (error) {
      showToast('Error', error.message, "error");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  
  return (
    <Box width={"100%"} px={10}>
    <Box>
      <Text my={5} fontSize={'30px'} fontWeight={'500'} color={'green.500'}>Restaurant Details</Text>
      <Divider mb={10}/>
      
      <FormControl id="userName" w={"300px"}>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Box w={'330px'} h={'150px'} bgColor={'gray.100'} borderRadius={'md'} overflow={'hidden'}>
              <Image src={imgUrl || user?.profilePic} w={'full'} h={'full'} objectFit={'cover'}/>
            </Box>
          </Center>
          <Center w="full">
            <Button w="full" onClick={() => fileRef.current.click()}>Change Profile Cover</Button>
            <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
          </Center>
        </Stack>
      </FormControl>

      <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap={10} mt={'40px'} >
        <Box>
          <FormControl id="restaurantName">
            <FormLabel>Restaurant Name</FormLabel>
            <Input type="text" value={restaurantName} onChange={e => setRestaurantName(e.target.value)}/>
          </FormControl>
        </Box>
        <Box>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
          </FormControl>
        </Box>
        <Box>
          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ex. +91 9328077809"/>
          </FormControl>
        </Box>
        <Box gridColumn={'1/3'}>
          <FormControl id="email">
            <FormLabel>Bio</FormLabel>
            <Input type="text" value={bio} onChange={e => setBio(e.target.value)}/>
          </FormControl>
        </Box>
      </Box>

      <Text mb={5} mt={20} fontSize={'30px'} fontWeight={'500'} color={'green.500'}>Address</Text>
      <Divider mb={10}/>
      
      <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap={5}>
        <Box gridColumn={'1/3'}>
          <FormControl id="street">
            <FormLabel>Street</FormLabel>
            <Input type="text" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})}/>
          </FormControl>
        </Box>
        <Box gridColumn={'1/2'}>
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input type="text" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})}/>
          </FormControl>
        </Box>
        <Box gridColumn={'2/3'}>
          <FormControl id="state">
            <FormLabel>State</FormLabel>
            <Input type="text" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
          </FormControl>
        </Box>
        <Box gridColumn={'1/2'}>
          <FormControl id="zipCode">
            <FormLabel>Zip Code</FormLabel>
            <Input type="text" value={address.zipCode} onChange={(e) => setAddress({...address, zipCode: e.target.value})}/>
          </FormControl>
        </Box>
        <Box gridColumn={'2/3'}>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input type="text" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})}/>
          </FormControl>
        </Box>
      </Box>

      <Button colorScheme="green" fontWeight={'500'} display={'flex'} alignItems={'center'} gap={2} mt={20} mb={5} isLoading={loading} loadingText="Updating" onClick={handleUpdate}>
        <FiEdit size={'18px'}/>
        Update Profile
      </Button>
    </Box>
  </Box>
  )
}

export default RestaurantProfile