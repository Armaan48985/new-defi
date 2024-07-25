import {
    ConnectKitProvider,
    ConnectKitButton,
    getDefaultConfig,
  } from "connectkit";


  export const ConnectButton = () => { 
    return (
        <ConnectKitProvider>
            <ConnectKitButton />
        </ConnectKitProvider>
    )
  }