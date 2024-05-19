"use client"

import NavBar from '@/components/NavBar';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div >
      <AppShell
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"

      >


        <AppShell.Navbar p="md">
          <NavBar />
        </AppShell.Navbar>

        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    </div>
  );
}
