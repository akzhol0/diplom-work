import React from 'react';
import Logo from '@/components/UI/icons/my-logo/Logo';
import Link from 'next/link';

function Brand() {
  return (
    <Link href={'/'}>
      <div className="flex items-center gap-2">
        <div className="w-[50px] h-[50px]">
          <Logo />
        </div>
        <p className="font-bold text-[38px] text-[#0a0a0a]">Brooklyn</p>
      </div>
    </Link>
  );
}

export default Brand;
