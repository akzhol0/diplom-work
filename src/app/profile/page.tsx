'use client'

// import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

// export const metadata: Metadata = {
//   title: 'Профиль',
// };

const ClientOnlyProfileComp = dynamic(() => import('@/components/profile/ProfileComp'), {
  ssr: false,
});

function Profile() {
  return <ClientOnlyProfileComp />;
}

export default Profile;
