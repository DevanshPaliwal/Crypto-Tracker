import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset'
import { Image } from 'expo-image'
import { Link } from 'expo-router'

const Page = () => {
    // const [assets]=useAssets([require('@/assets/videos/intro.mp4')])

    return (
        <View style={styles.container}>
            {/* change this later */}
            <View style={styles.imageContainer}>
                <Image source={require('@/assets/videos/landing2.png')} style={styles.image} />
            </View>
            <Text style={styles.welcomeText}>ready to change the way you money?</Text>
            <View style={styles.buttonContainer}>
                <Link href={'/login'} asChild>
                    <TouchableOpacity >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>
                </Link>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}>|</Text>
                <Link href={'/signup'} asChild>
                    <TouchableOpacity >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Signup</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    welcomeText: {
        position: 'absolute',   // Position text on top of the image
        fontSize: 36,           // Adjust text size
        fontWeight: '900',     // Make text bold
        color: 'white',          // White text (adjust based on image contrast)
        
        textTransform: 'uppercase',
        top: '10%',
        padding: 6,
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '9%',          // Adjust this value to control vertical placement near the bottom
        width: '75%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 10,    // Padding inside the button
        paddingHorizontal: 30,  // Padding inside the button
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',  // Center the button in the middle of the screen (horizontal)
        gap: 30,
        borderColor: 'white',
        borderWidth: 2,
    }
})


export default Page