import React from 'react';
import Link from 'next/link';
import { DM_Serif_Text } from 'next/font/google';
import Image from 'next/image';

const dmSerif = DM_Serif_Text({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

function Brand() {
  return (
    <Link href={'/'}>
      <div className="flex items-center gap-2">
        <div className="w-[60px] h-[60px] overflow-hidden">
          <Image src="/images/brand-logo.png" width={60} height={60} alt="logo" />
        </div>
        <div className={dmSerif.className}>
          <span className="font-bold text-[38px] text-[#0a0a0a]">Brooklyn</span>
        </div>
      </div>
    </Link>
  );
}

export default Brand;
