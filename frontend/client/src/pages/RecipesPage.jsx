import { Box, Divider, Flex, Skeleton, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import FoodCategories from '../components/FoodCategories'

import useShowToast from '../hooks/useShowToast';
import ItemCard from '../components/ItemCard';
import { useParams } from 'react-router-dom';



const RecipesPage = () => {
  const {category} = useParams();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const arrayList = new Array(15).fill(null);
  
  const showToast = useShowToast();
  
  // Fetch All Items
  useEffect(() => {
    const fetchAllItems = async() => {
      setLoading(true);
      try {
        const res = await fetch('/api/menu-items/get-all-items');
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setItems(data);

      } catch (error) {
        console.log(error);        
      } finally {
        setLoading(false);
      }
    }

    const fetchItemsByCategory = async() => {
      setLoading(true);
      try {
        const res = await fetch(`/api/menu-items/get-item-by-category/${category}`);
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        
        setItems(data);

      } catch (error) {
        console.log(error);        
      } finally {
        setLoading(false);
      }
    }

    if (!category) {
      fetchAllItems();
    } else {
      fetchItemsByCategory();
    }
  }, [])
  
  
  return (
    <Box p={10}>
      {!category && <FoodCategories/>}

      <Text fontSize={'18px'} fontWeight={'600'} color={'gray.800'} mt={10} ml={5} textTransform={'uppercase'}>{category ? category+":" : 'FOODS:'} </Text>

      {/* Show Loading Animation */}
      {loading && <Box display={'grid'} gridTemplateColumns={'repeat(5, 1fr)'} gap={5} my={5}>
        {arrayList.map((_,i)=>(
          <Box key={i}>
            <Skeleton w={'full'} h={'200px'} borderRadius={'xl'}/>
            <Flex align={'center'} justifyContent={'space-between'} px={2}>
              <Skeleton w={'150px'} h={5} borderRadius={'md'} mt={2}/>
              <Skeleton w={'50px'} h={5} borderRadius={'md'} mt={2}/>
            </Flex>
            <Box px={2}>
              <Skeleton w={'250px'} h={5} borderRadius={'md'} mt={2}/>
              <Skeleton w={'150px'} h={5} borderRadius={'md'} mt={2}/>
            </Box>
          </Box>
        ))}
      </Box>}

      {/* Show menu items */}
      {!loading && <Box display={'grid'} gridTemplateColumns={'repeat(5, 1fr)'} gap={5} my={5}>
        {items.map((item)=>(
          <ItemCard key={item._id} item={item}/>
        ))}
      </Box>}

      {items.length == 0 && (
        <Text textAlign={'center'} py={'140px'} color={'gray.500'} fontSize={'30px'}>Items Not Found</Text>
      )}
      
    </Box>
  )
}

export default RecipesPage