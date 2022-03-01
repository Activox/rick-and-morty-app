import React from 'react'
import Image from 'next/image'
import Logo from "../public/RickAndMortyLogo.png";

export default function mainLogo() {
  return (
    <div className="flex items-center justify-center p-10">
      <Image src={Logo} alt="Black Friday" width="500" height="150" />
    </div>
  )
}
