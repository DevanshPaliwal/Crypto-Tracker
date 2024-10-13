// if we use [] brackets in filename then we can 
// pass values from other files to this file
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';

import {
    CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;


const Page = () => {
    // extracting the value sent by other files and 
    // storing it in 'phone' variable 
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
    const [code, setCode] = useState('')
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp();

    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    })

    useEffect(() => {
        if (code.length === 6) {
            // verify the code
            if (signin === 'true') {
                verifySignIn(); // when we want to sign in
            }
            else {
                verifyCode(); // when we want to sign up
            }
        }
    }, [code])

    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({
                code,
            });
            await setActive!({ session: signUp!.createdSessionId })
            console.log(code)
        }
        catch (error) {
            console.error('error : ', JSON.stringify(error, null, 2));
            if (isClerkAPIResponseError(error)) {
                Alert.alert('Error: ', error.errors[0].message);
            }
        }
    }

    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy:'phone_code',
                code,
            });
            await setActive!({ session: signIn!.createdSessionId })
        }
        catch (error) {
            console.error('error : ', JSON.stringify(error, null, 2));
            if (isClerkAPIResponseError(error)) {
                Alert.alert('Error: ', error.errors[0].message);
            }
        }
    }





    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>6-digit code</Text>
            <Text style={defaultStyles.descriptionText}>Code sent to {phone} unless you already have an account</Text>

            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />


            <Link href={'/login'} replace asChild >
                <TouchableOpacity>
                    <Text style={defaultStyles.textLink}>Already have an account? Login </Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
})

export default Page