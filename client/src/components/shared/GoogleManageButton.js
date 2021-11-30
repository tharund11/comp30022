import React from 'react';
import Button from 'react-bootstrap/Button'
export default function GoogleManageButton({isSignedIn, signIn, signOut}){
    function chooseFunction(isSignedIn){
        if(isSignedIn){
            return signOut;
        }
        else{
            return signIn
        }
    }

    function getButtonText(isSignedIn){
        if(isSignedIn){
            return "Sign Out";
        }
        else{
            return "Sign In";
        }
    }
    return (
            <Button
                onClick = {chooseFunction(isSignedIn)}
            >
            {getButtonText(isSignedIn)}
            </Button>
    )
}