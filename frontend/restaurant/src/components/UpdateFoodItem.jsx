import { 
    Box, Button, Flex, FormControl, FormLabel, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, 
    ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { LuUploadCloud } from "react-icons/lu";
import { SmallCloseIcon } from "@chakra-ui/icons";  
  
import useShowToast from "../hooks/useShowToast";
import usePriviewImg from "../hooks/usePriviewImg";
import { categoryList } from "../helpers/categorysList";
import FetchMenuItems from "../hooks/FetchMenuItems";
  

  const UpdateFoodItem = ({isOpen, onClose, item}) => {
    const fileRef = useRef();
    const {handleImageChange, imgUrl, setImgUrl} = usePriviewImg();
    const showToast = useShowToast();
    const fetchMenuItemsData = FetchMenuItems();
    // For Condition
    const [isLoading, setIsLoading] = useState(false);
    // For Input value
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [isVeg, setIsVeg] = useState('1');
    const [availability, setAvailability] = useState('1');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (item) {
            setItemName(item.itemName);
            setImgUrl(item.image);
            setCategory(item.category);
            setPrice(item.price);
            setIsVeg(item.isVeg == true ? '1' : '2');
            setAvailability(item.availability == true ? '1' : '2');
            setDescription(item.description);
        }
    }, [item]);


    // Handle Submit Item
    const handleSubmit = async() => {
      if(!itemName || !category || !price || !isVeg || !availability || !description || !imgUrl) {
        showToast("Error", "All fields is reqired!", "error");
        return;
      }
      // Loading true
      setIsLoading(true);

      try {
        const response = await fetch(`/api/menu-items/update-item/${item._id}`, {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({itemName, category, price, isVeg, availability, description, image: imgUrl})
        });
        const data = await response.json();
        if(data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        showToast("Success", "Item updated", "success");
        fetchMenuItemsData();
        onClose();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

    }

    

    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'6xl'} motionPreset='slideInBottom'>
        <ModalOverlay />
  
        <ModalContent>
          <ModalHeader>Update Item Details</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={5}>
  
              <Box px={5}>
                <FormControl mb={5}>
                  <FormLabel fontSize={'14px'} color={'#888'} fontWeight={'400'}>MenuItem Name</FormLabel>
                  <Input type="text" borderRadius={'md'} value={itemName} onChange={e => setItemName(e.target.value)}/>
                </FormControl>

                <HStack gap={4} mb={5}>
                  <FormControl>
                    <FormLabel fontSize={'14px'} color={'#888'} fontWeight={'400'}>Category</FormLabel>
                    <Select placeholder='Select category' value={category} onChange={e => setCategory(e.target.value)}>
                      {categoryList.map((category, i) => (
                        <option key={i} value={category.value}>{category.title}</option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                  <FormLabel fontSize={'14px'} color={'#888'} fontWeight={'400'}>Price (ex. ₹100)</FormLabel>
                    <NumberInput borderRadius={'md'} value={price} onChange={(_, valueAsNumber) => setPrice(valueAsNumber || 0)}> 
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>   
                </HStack>

                <HStack gap={4}>
                  <FormControl>
                    <FormLabel fontSize={'14px'} color={'#888'} fontWeight={'400'}>Is Veg ?</FormLabel>
                    <RadioGroup defaultValue='2' value={isVeg} onChange={setIsVeg}>
                      <Stack spacing={5} direction='row'>
                        <Radio colorScheme='green' value={'1'}>
                          Veg
                        </Radio>
                        <Radio colorScheme='red' value={'2'}>
                          Non-Veg
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize={'14px'} color={'#888'} fontWeight={'400'}>Availability</FormLabel>
                    <RadioGroup defaultValue='1' value={availability} onChange={setAvailability}>
                      <Stack spacing={5} direction='row'>
                        <Radio colorScheme='blue' value={'1'}>
                          True
                        </Radio>
                        <Radio colorScheme='blue' value={'2'}>
                          Flase
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </HStack>

                <Text fontSize={'14px'} color={'#888'} fontWeight={'400'} mb={2} mt={5}>Upload Item Image</Text>

                <Flex align={'center'} gap={5}>
                    {imgUrl && ( 
                        <Box width={'100px'} height={'100px'} borderRadius={'md'} position={'relative'}>
                            <SmallCloseIcon position={'absolute'} top={-2} right={-2} bg={'green.500'} color={'white'} p={1} rounded={'full'} fontSize={'27px'} border={'3px solid #fff'} cursor={'pointer'} onClick={() => setImgUrl(null)}/>
                            <Image src={imgUrl} w={'full'} h={'full'} objectFit={'cover'} borderRadius={'md'}/>
                        </Box>
                    )}
                    
                    {!imgUrl && <Button width={'full'} height={'120px'} border={'1px solid'} bg={'transparent'} borderColor={'gray.200'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={'md'} cursor={'pointer'} _hover={{bgColor: 'gray.50'}} onClick={() => fileRef.current.click()}>
                        <LuUploadCloud fontSize={'30px'} color="gray" opacity={.7}/>
                        <Input type="file" ref={fileRef} hidden onChange={handleImageChange}/>
                    </Button>}
                </Flex>
              </Box>

              <Box>
                <Text fontSize={'14px'} color={'#888'} fontWeight={'400'} mb={2}>Description</Text>
                <Textarea borderRadius={'md'} height={'371px'} value={description} onChange={e => setDescription(e.target.value)}/>
              </Box>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="green" mr={3} isLoading={isLoading} onClick={handleSubmit}>Update Item</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
          
        </ModalContent>
      </Modal>
    );
  };
  
  export default UpdateFoodItem
  