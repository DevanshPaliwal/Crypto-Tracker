import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity,Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
const CLERK_PUBLISHABLE_KEY=process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store';

const tokenCache={
  async getToken(key:string){
    try{
      return SecureStore.getItemAsync(key); // retrieve the token value for this key
    }
    catch(err){
      return null; // if not able to retrieve the token then return null
    }
  },
  async saveToken(key:string,value:string){
    try{
      return SecureStore.setItemAsync(key,value); // save the token value for this key
    }
    catch(err){
      return;
    }
  },
}


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const router = useRouter()

  const {isLoaded,isSignedIn}=useAuth();
  const segments=useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(()=>{
    console.log('isSignedIn: ',isSignedIn)
    if(!isLoaded) return;

    const inAuthGroup = segments[0] === '(authenticated)';

    if(isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home');
    }
    else if(!isSignedIn){
      router.replace('/');
    }

  },[isSignedIn])

  if (!loaded || !isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (

    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='signup' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="chevron-back-outline" size={30} color={Colors.dark} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name='login' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="chevron-back-outline" size={30} color={Colors.dark} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Link href={'/help'} asChild >
            <TouchableOpacity>
              <Ionicons name="help-circle-outline" size={30} color={Colors.dark} />
            </TouchableOpacity>
          </Link>
        )
      }} />
      <Stack.Screen name='help' options={{
        title: 'Help',
        presentation: 'modal',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#e6e9fa',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="chevron-back-outline" size={30} color={Colors.dark} />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name='verify/[phone]' options={{
        title: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="chevron-back-outline" size={30} color={Colors.dark} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name='(authenticated)/(tabs)' 
      options={{
        // title: 'Help',
        // presentation: 'modal',
        // headerTitleAlign: 'center',
        // headerStyle: {
        //   backgroundColor: '#e6e9fa',
        // },
        headerShown:false
        // headerLeft: () => (
        //   <TouchableOpacity onPress={router.back}>
        //     <Ionicons name="chevron-back-outline" size={30} color={Colors.dark} />
        //   </TouchableOpacity>
        // ),
      }} />
    </Stack>

  );
}

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='light' />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

export default RootLayoutNav;
