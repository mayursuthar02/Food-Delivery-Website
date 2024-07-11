import { 
    Box, Button, Flex, FormControl, FormLabel, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, 
    ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea } from "@chakra-ui/react";
  import { useRef, useState } from "react";
  
  import { LuUploadCloud } from "react-icons/lu";
  import { IoIosCloseCircle } from "react-icons/io";
  import { SmallCloseIcon } from "@chakra-ui/icons";
  
//   import userAtom from '../atoms/userAtom';
//   import {useRecoilValue } from 'recoil';
  
  import useShowToast from "../hooks/useShowToast";
import usePriviewImg from "../hooks/usePriviewImg";
//   import useUploadImage from "../hooks/useUploadImage";
//   import FetchVenderProductsData from "../helpers/FetchVenderProductsData";
  
  const UploadFoodItem = ({isOpen,onClose}) => {
    const fileRef = useRef();
    const {handleImageChange, imgUrl} = usePriviewImg();

    const [isLoading, setIsLoading] = useState(false);


    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'6xl'} motionPreset='slideInBottom'>
        <ModalOverlay />
  
        <ModalContent>
          <ModalHeader>Item Details</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={5}>
  
              <Box px={5}>
                <FormControl mb={5}>
                  <FormLabel fontSize={'14px'} color={'#888'} fontWeight={'400'}>Product Name</FormLabel>
                  <Input type="text" borderRadius={'md'}/>
                </FormControl>
  
              </Box>

              <Box>
                <Text fontSize={'14px'} color={'#888'} fontWeight={'400'} mb={2} mt={5}>Upload Item Image</Text>

                    <Flex align={'center'} gap={5}>
                        {imgUrl && ( 
                            <Box width={'100px'} height={'100px'} overflow={'hidden'} borderRadius={'md'}>
                                <Image src={imgUrl} w={'full'} h={'full'} objectFit={'cover'}/>
                            </Box>
                        )}
                        
                        {!imgUrl && <Button width={'full'} height={'120px'} border={'1px solid'} bg={'transparent'} borderColor={'gray.200'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={'md'} cursor={'pointer'} _hover={{bgColor: 'gray.50'}} onClick={() => fileRef.current.click()}>
                            <LuUploadCloud fontSize={'30px'} color="gray" opacity={.7}/>
                            <Input type="file" ref={fileRef} hidden onChange={handleImageChange}/>
                        </Button>}
                    </Flex>

                    <Text fontSize={'14px'} color={'#888'} fontWeight={'400'} mb={2} mt={5}>Description</Text>
                    <Textarea borderRadius={'md'} height={'300px'}/>
              </Box>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="green" mr={3} isLoading={isLoading}>Upload Item</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
          
        </ModalContent>
      </Modal>
    );
  };
  
  export default UploadFoodItem
  