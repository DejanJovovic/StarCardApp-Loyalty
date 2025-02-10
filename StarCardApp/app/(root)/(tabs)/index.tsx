import {View, Text} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

const Index = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <Text className="font-bold text-2xl my-10">Welcome to StarCard</Text>
            <Link href="/sign-in">Sign in</Link>
            <Link href="/sign-up">Sign up</Link>
            <Link href="/verify-account">Verify account</Link>
            <Link href="/new-password">New password</Link>
        </View>
    )
}
export default Index
