import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { TextInput } from 'react-native'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const Page = () => {
    const [countryCode, setCountryCode] = useState('+91')
    const [phoneNumber, setPhoneNumber] = useState('')

    const onSignup = async () => {

    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Let's get started!</Text>
                <Text style={defaultStyles.descriptionText} >Enter your phone number, we will send you a confirmation code.</Text>
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
                <Link href={'/login'} replace asChild >
                    <TouchableOpacity>
                        <Text style={defaultStyles.textLink}>Already have an account? Login </Text>
                    </TouchableOpacity>
                </Link>

                

                <TouchableOpacity
                    style={[defaultStyles.pillButton,
                    phoneNumber !== '' ? styles.enabled : styles.disabled,
                    { marginTop: 50 },]}
                    onPress={onSignup}
                >
                    <Text style={defaultStyles.buttonText}>Signup</Text>
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