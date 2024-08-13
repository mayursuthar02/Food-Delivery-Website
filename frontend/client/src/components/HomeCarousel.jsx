import React from 'react'
import { Box, Badge, Heading, Text, Flex, Image, Button, Avatar, Stack, Grid } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import img2 from '../assets/img/burger-banner.jpeg';
import img1 from '../assets/img/pizzas.jpg';
import img3 from '../assets/img/ice.jpg';

const HomeCarousel = () => {
  return (
    <Box borderRadius="30px" mt={10} overflow={'hidden'} w={'90%'} mx={'auto'}>
        <Splide
          options={{
            type: 'loop',
            perPage: 1,
            perMove: 1,
            autoplay: true,
            interval: 2000,
            pauseOnHover: true,
            pagination: false,
            arrows: false,
            omitEnd: false
          }}
        >
          <SplideSlide>
            <Grid h={'550px'} templateColumns={'1fr'} borderRadius="30px" overflow="hidden">
              <Box display="flex" alignItems="center" px={20} bg="gray.50" position={'relative'} zIndex={1} overflow={'hidden'}>
                <Image position={'absolute'} top={0} left={0} zIndex={-1} src={img2} w={'full'} h={'full'} objectFit={'cover'}/>
                <Box w={'full'} h={'550px'} position={'absolute'} top={0} left={0} style={{background: 'linear-gradient(to top,rgba(0, 0, 0, 0.85) 40px,transparent)'}}></Box>

                <Box zIndex={1} w={'600px'}>
                  <Flex align={'center'} gap={3}>
                    <Text fontSize={'15px'} fontWeight={'500'} color={'white'}>Exclusive Offer</Text>
                    <Text color={'white'} bgColor={'green.600'} borderRadius={'md'} px={3} py={1} fontSize={'13px'} fontWeight={'600'}>15% off</Text>
                  </Flex>

                  <Text textTransform={'capitalize'} fontSize={'70px'} lineHeight={'80px'} mt={3} color={'white'}>Best online deals, Free stuff</Text>

                  <Text textTransform={'capitalize'} my={5} fontSize={'18px'} color={'white'}>Only on this week... Don't miss</Text>

                  <Button colorScheme='green' borderRadius={'full'}>Get Best Deal</Button>
                </Box>
              </Box>
            </Grid>
          </SplideSlide>
          
          <SplideSlide>
            <Grid h={'550px'} templateColumns={'1fr'} borderRadius="30px" overflow="hidden">
              <Box display="flex" alignItems="center" px={20} bg="gray.50" position={'relative'} zIndex={1} overflow={'hidden'}>
                <Image position={'absolute'} top={0} left={0} zIndex={-1} src={img1} w={'full'} h={'full'} objectFit={'cover'}/>
                <Box w={'full'} h={'550px'} position={'absolute'} top={0} left={0} style={{background: 'linear-gradient(to top,rgba(0, 0, 0, 0.85) 40px,transparent)'}}></Box>

                <Box zIndex={1} w={'600px'}>
                  <Flex align={'center'} gap={3}>
                    <Text fontSize={'15px'} fontWeight={'500'} color={'white'}>Exclusive Offer</Text>
                    <Text color={'white'} bgColor={'green.600'} borderRadius={'md'} px={3} py={1} fontSize={'13px'} fontWeight={'600'}>15% off</Text>
                  </Flex>

                  <Text textTransform={'capitalize'} fontSize={'70px'} lineHeight={'80px'} mt={3} color={'white'}>Best online deals, Free stuff</Text>

                  <Text textTransform={'capitalize'} my={5} fontSize={'18px'} color={'white'}>Only on this week... Don't miss</Text>

                  <Button colorScheme='green' borderRadius={'full'}>Get Best Deal</Button>
                </Box>
              </Box>
            </Grid>
          </SplideSlide>

          <SplideSlide>
            <Grid h={'550px'} templateColumns={'1fr'} borderRadius="30px" overflow="hidden">
              <Box display="flex" alignItems="center" px={20} bg="gray.50" position={'relative'} zIndex={1} overflow={'hidden'}>
                <Image position={'absolute'} top={0} left={0} zIndex={-1} src={img3} w={'full'} h={'full'} objectFit={'cover'}/>
                <Box w={'full'} h={'550px'} position={'absolute'} top={0} left={0} style={{background: 'linear-gradient(to top,rgba(0, 0, 0, 0.85) 40px,transparent)'}}></Box>

                <Box zIndex={1} w={'600px'}>
                  <Flex align={'center'} gap={3}>
                    <Text fontSize={'15px'} fontWeight={'500'} color={'white'}>Exclusive Offer</Text>
                    <Text color={'white'} bgColor={'green.600'} borderRadius={'md'} px={3} py={1} fontSize={'13px'} fontWeight={'600'}>15% off</Text>
                  </Flex>

                  <Text textTransform={'capitalize'} fontSize={'70px'} lineHeight={'80px'} mt={3} color={'white'}>Best online deals, Free stuff</Text>

                  <Text textTransform={'capitalize'} my={5} fontSize={'18px'} color={'white'}>Only on this week... Don't miss</Text>

                  <Button colorScheme='green' borderRadius={'full'}>Get Best Deal</Button>
                </Box>
              </Box>
            </Grid>
          </SplideSlide>
        </Splide>
    </Box>
  )
}

export default HomeCarousel