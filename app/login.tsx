import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { TextInput } from 'react-native'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'

const Page = () => {
    const [countryCode, setCountryCode] = useState('+91')
    const [phoneNumber, setPhoneNumber] = useState('')

    const router = useRouter();
    const { signIn } = useSignIn();


    const onSignInPhone = async () => {
        try {
            const fullPhoneNumber = `${countryCode}${phoneNumber}`;
            const { supportedFirstFactors }=await signIn!.create({ // '!' defines that the object will never be null or undefined
                identifier:fullPhoneNumber,
            });
            const firstPhoneFactor:any=supportedFirstFactors?.find((factor:any)=>{
                return factor.strategy==='phone_code';
            });

            const {phoneNumberId}=firstPhoneFactor;

            await signIn!.prepareFirstFactor({
                strategy:'phone_code',
                phoneNumberId,
            });

            router.push({
                pathname:'/verify/[phone]',
                params:{phone:fullPhoneNumber,signin:'true'},
            })
        }
        catch(error){
            console.log("error :", JSON.stringify(error,null,2));
            if(isClerkAPIResponseError(error)){
                if(error.errors[0].code==='form_identifier_noy_found'){
                    Alert.alert('Error ',error.errors[0].message);
                }
            }
        }
        
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Welcome back!</Text>
                <Text style={defaultStyles.descriptionText} >Enter the phone number associated with your account</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={countryCode}
                    />
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder='Mobile Number'
                        placeholderTextColor={Colors.gray}
                        keyboardType='numeric'
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                {/* <Link href={'/login'} replace asChild >
                    <TouchableOpacity>
                        <Text style={defaultStyles.textLink}>Already have an account? Login </Text>
                    </TouchableOpacity>
                </Link> */}



                <TouchableOpacity
                    style={[defaultStyles.pillButton,
                    phoneNumber !== '' ? styles.enabled : styles.disabled,
                    { marginTop: 10 },]}
                    onPress={onSignInPhone}
                >
                    <Text style={defaultStyles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray, marginTop: 12 }}
                    />
                    <Text style={{ color: Colors.gray, fontSize: 20, marginTop: 8 }}>OR</Text>
                    <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray, marginTop: 12 }}
                    />
                </View>

                <TouchableOpacity style={[defaultStyles.pillButton, { backgroundColor: 'white', flexDirection: 'row', gap: 20, marginTop: 20 }]}>
                    <Ionicons name='mail-outline' size={24} color='black' />
                    <Text style={[defaultStyles.buttonText, { color: 'black' }]}>Continue with Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[defaultStyles.pillButton, { backgroundColor: '#f8e4e4', flexDirection: 'row', gap: 20, marginTop: 15 }]}>
                    <Ionicons name='logo-google' size={24} color='#dc0202' />
                    <Text style={[defaultStyles.buttonText, { color: '#dc0202' }]}>Continue with Google</Text>
                </TouchableOpacity>


            </View>
        </KeyboardAvoidingView>
    )
}
// with replace we directly go to home 

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 40,
        flexDirection: 'row'
    },
    input: {
        backgroundColor: Colors.lightGray,
        padding: 18,
        borderRadius: 16,
        fontSize: 20,
        marginRight: 10
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.primaryMuted
    }
})

export default Page

// next class continue from changing the header 