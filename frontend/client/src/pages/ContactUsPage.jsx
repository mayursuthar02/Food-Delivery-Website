import { Box, Button, Flex, Grid, Heading, Image, Input, Stack, Text, Textarea } from '@chakra-ui/react'
import ContactImg from '../assets/img/contactUs.jpg'

const ContactUsPage = () => {
  return (
    <Grid minH={'80vh'} position={'relative'} gridTemplateColumns={'1fr 1fr'} mt={'10px'}>
        <Flex align={'center'} >
            <Image src={ContactImg} w={'full'} h={'full'} objectFit={'cover'}/>
        </Flex>
        <Flex align={'center'} >
        <Stack
        //   bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          width={'600px'}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Contact Us
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Tues - Thurs: 9AM - 5PM<br/>
              Fri: 9AM - 7PM / Sat: 8AM - 4PM<br/>
              Sun - Mon: Closed<br/>
            </Text>
          </Stack>
          <Box as={'form'} mt={2}>
            <Stack spacing={4}>
              <Input
                placeholder="Full Name"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="example@gmail.com"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="+91 ___-___-____"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Textarea border={0} bg={'gray.100'} color={'gray.500'} placeholder="Your description" resize={'none'} height={'200px'}/>
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              py={6}
              w={'full'}
              color={'white'}
              colorScheme='green'
              >
              Submit
            </Button>
          </Box>
          form
        </Stack>
        </Flex>
    </Grid>
  )
}

export default ContactUsPage