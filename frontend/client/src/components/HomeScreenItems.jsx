import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast';
import ItemCard from './ItemCard';

const HomeScreenItems = ({title, category}) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const showToast = useShowToast();

    useEffect(() => {
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

        fetchItemsByCategory();
    }, [category])
    
    
  return (
    <Box px={20} mt={10}>
        <Flex align={'center'} justifyContent={'space-between'}>
            <Text fontSize={'30px'} fontWeight={'500'}>{title}</Text>
            <Button as={RouterLink} to={`/recipe/${category}`}>See more</Button>
      </Flex>

      <Grid templateColumns={'repeat(5,1fr)'} gap={5}>
        {items.slice(0,5).map((item, i) => (
            <ItemCard key={i} item={item}/>
        ))}
      </Grid>
    </Box>
  )
}

export default HomeScreenItems