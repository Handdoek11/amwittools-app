// app/components/common/AmwittoolsLogo.js
import React from 'react';
import Svg, { Path, Text, G } from 'react-native-svg';

const AmwittoolsLogo = ({ width = 240, height = 60, color = '#FFFFFF' }) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 240 60"
      fill="none"
    >
      <G>
        {/* Abstracte representatie van gereedschappen/een 'A' */}
        <Path 
          d="M30 30 L60 10 L90 30 L60 50 Z" 
          fill={color}
          opacity="0.8"
        />
        <Path 
          d="M120 20 L150 40 L180 20" 
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />
        <Text
          x="200"
          y="45"
          fontSize="24"
          fontWeight="bold"
          fill={color}
        >
          Amwittools
        </Text>
      </G>
    </Svg>
  );
};

export default AmwittoolsLogo;