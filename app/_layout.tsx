// app/_layout.tsx

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)/index" options={{ title: 'Onboarding' }} />
      <Stack.Screen name="(tabs)" options={{ title: 'Main Tabs' }} />
    </Stack>
  );
}
