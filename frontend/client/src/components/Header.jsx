import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {Text} from '@chakra-ui/react';

import Logo from '../components/Logo';

import { HiOutlineSearch } from "react-icons/hi";
import { PiHeartStraight } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Header = () => {
  return (
    <header>
      <Logo/>
      <Text/>
    </header>
  )
}

export default Header