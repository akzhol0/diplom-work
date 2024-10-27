import ProfileComp from '@/components/profile/ProfileComp';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Профиль',
};

function Profile() {
  return <ProfileComp />;
}

export default Profile;
