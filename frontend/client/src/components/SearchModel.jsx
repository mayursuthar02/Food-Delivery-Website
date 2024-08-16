import { SearchIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Flex, FormControl, IconButton, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Text } from "@chakra-ui/react"
import { useState } from "react";
import {Link as RouterLink} from 'react-router-dom';

const SearchModel = ({isOpen, onClose}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const handleSearch = async(e) => {
    const value = e.target.value;
    setSearchValue(value);
    setLoading(true);
    if (value) {
      try {
        const res = await fetch(`/api/menu-items/v1/search/${value}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          console.log(data.error);
          return;
        }
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }else {
      setSearchResults([]);
    }
  }
 
 
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'500'}>Search your favourite foods</ModalHeader>

          <ModalCloseButton _hover={{bgColor: "blue.50"}}/>
          
          <ModalBody pb={6}>
            <FormControl>
                <Box position={'relative'}>
                  <Input type="text" height={'45px'} placeholder="search..." value={searchValue} onChange={handleSearch} pr={10}/>
                  <IconButton position={'absolute'} top={'7%'} bg={'transparent'} _hover={{bg: 'transparent'}} right={1} aria-label='Search database' icon={<SearchIcon />} />
                </Box>
            </FormControl>
          </ModalBody>

          {searchResults.length > 0 && (
          <Box px={6} pb={6} maxH={'420px'} overflowY={'scroll'} className="scroll-hide">
                 
            {loading && [1,2,3,4].map((_,i) => (
              <Link key={i} display={'flex'} justifyContent={'start'} alignItems={'center'} borderRadius={'md'} p={3} gap={5}>
                <Skeleton w={'80px'} h={'80px'} borderRadius={'md'} />
                <Box>
                  <Skeleton h={6} w={'400px'} borderRadius={'md'}/>
                  <Flex align={'center'} gap={2} mt={2}>
                    <Skeleton h={5} w={'100px'} borderRadius={'md'}/>
                    <Skeleton h={5} w={'100px'} borderRadius={'md'}/>
                  </Flex>
                </Box>
              </Link>
            ))}

            {!loading && searchResults.slice(0,5).map(item => (
              <Link 
              key={item._id} 
              as={RouterLink} 
              to={`/${item.itemName}/${item._id}`} 
              display={'flex'} 
              justifyContent={'start'} 
              alignItems={'center'} 
              _hover={{ bgColor: "gray.50" }} 
              borderRadius={'md'} 
              p={3} 
              gap={5} 
              onClick={onClose}>
                <Box w={'80px'} h={'80px'} borderRadius={'md'} overflow={'hidden'} bgColor={'gray.200'}>
                  <Image src={item.image} w={'full'} h={'full'} objectFit={'cover'} />
                </Box>
                <Box>
                  <Text fontSize={'15px'} fontWeight={'500'}>{item.itemName}</Text>
                  <Flex align={'center'} gap={2} mt={2}>
                    <Text fontSize={'15px'} fontWeight={'500'}>Rs. {item.price.toFixed(2)}</Text>
                    <Badge colorScheme={item.isVeg == true ? "green" : "red"}>{item.isVeg == true ? "VEG" : "NON-VEG"}</Badge>
                  </Flex>
                </Box>
              </Link>
            ))}

            {searchResults.length > 5 && (
              <Text px={3} fontSize={'15px'} color={'gray.500'} mt={3}>{searchResults.length - 8} More result!</Text>
            )}
          </Box>
        )}
          

          {searchResults.length > 0 && <ModalFooter>
            <Button as={RouterLink} to={`/search?q=${searchValue}`} w={'full'} py={6} color={'white'} bgColor={'green.500'} _hover={{bgColor: "green.600"}} onClick={onClose}>VIEW ALL RESULTS</Button>
          </ModalFooter>}
        </ModalContent>
      </Modal>
  )
}

export default SearchModel